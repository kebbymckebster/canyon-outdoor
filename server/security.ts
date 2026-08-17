/** Security primitives for Canyon Outdoor. Logs contain only normalized route data and irreversible request fingerprints, never PII, tokens, or inquiry content. */
import { createHmac } from "node:crypto";
import type { Request, Response, NextFunction } from "express";
import { ENV } from "./_core/env";

type Bucket = { count: number; resetAt: number; warned: boolean };
const buckets = new Map<string, Bucket>();

function log(event: string, data: Record<string, unknown> = {}) {
  console.info(JSON.stringify({ event, at: new Date().toISOString(), ...data }));
}

function rawClientAddress(req: Request) {
  return req.ip || req.socket.remoteAddress || "unknown";
}

export function requestFingerprint(req: Request) {
  return createHmac("sha256", ENV.cookieSecret || "local-development-only").update(rawClientAddress(req)).digest("hex");
}

export function consumeRateLimit(scope: string, fingerprint: string, maxRequests: number, windowMs: number) {
  const now = Date.now(); const key = `${scope}:${fingerprint}`; const current = buckets.get(key);
  const bucket = !current || current.resetAt <= now ? { count: 0, resetAt: now + windowMs, warned: false } : current;
  bucket.count += 1; buckets.set(key, bucket);
  if (!bucket.warned && bucket.count >= Math.ceil(maxRequests * 0.7)) { bucket.warned = true; log("security.unusual_traffic", { scope, fingerprint, count: bucket.count }); }
  return { allowed: bucket.count <= maxRequests, retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)) };
}

export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  res.setHeader("X-Content-Type-Options", "nosniff"); res.setHeader("X-Frame-Options", "DENY"); res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin"); res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()");
  if (ENV.isProduction) { res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload"); res.setHeader("Content-Security-Policy", "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' https: data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; script-src 'self' 'unsafe-inline' https:; connect-src 'self' https:"); }
  next();
}

export function enforceHttps(req: Request, res: Response, next: NextFunction) {
  const forwarded = req.get("x-forwarded-proto");
  if (ENV.isProduction && forwarded && forwarded !== "https") { const host = req.get("host"); if (host) { res.redirect(308, `https://${host}${req.originalUrl}`); return; } }
  next();
}

export function requestAudit(req: Request, res: Response, next: NextFunction) {
  const started = Date.now(); const fingerprint = requestFingerprint(req);
  res.on("finish", () => { if (req.path.startsWith("/api/")) log("api.request", { method: req.method, path: req.path, status: res.statusCode, durationMs: Date.now() - started, fingerprint }); });
  next();
}

export function apiRateLimit(req: Request, res: Response, next: NextFunction) {
  const result = consumeRateLimit("api", requestFingerprint(req), 120, 60_000);
  if (!result.allowed) { res.setHeader("Retry-After", String(result.retryAfterSeconds)); log("security.rate_limited", { scope: "api", fingerprint: requestFingerprint(req) }); res.status(429).json({ error: "Too many requests. Please try again shortly." }); return; }
  next();
}

export function siteRateLimit(req: Request, res: Response, next: NextFunction) {
	  // Static assets are already cacheable and do not expose records or mutations. Counting every image, font, and bundle against the HTML quota caused normal visual page loads to look abusive.
	  if (/^\/(assets|manus-storage|__manus__)\//.test(req.path) || /\.(?:avif|css|gif|ico|jpe?g|js|map|png|svg|webp|woff2?)$/i.test(req.path)) return next();
  const result = consumeRateLimit("site", requestFingerprint(req), 360, 5 * 60_000);
  if (!result.allowed) { res.setHeader("Retry-After", String(result.retryAfterSeconds)); log("security.rate_limited", { scope: "site", fingerprint: requestFingerprint(req) }); res.status(429).send("Too many requests. Please try again later."); return; }
  next();
}

export function logSecurityEvent(event: string, data: Record<string, unknown> = {}) { log(event, data); }
