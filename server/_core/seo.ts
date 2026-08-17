import superjson from "superjson";
import type { SiteHead } from "../../client/src/ssr/siteMeta";
import { siteInfo } from "../../client/src/ssr/siteMeta";

const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const text = (value: string, limit: number) => value.replace(/\s+/g, " ").trim().slice(0, limit);
const canonicalOrigin = () => process.env.CANONICAL_ORIGIN?.replace(/\/$/, "") || "";

export function composeHtml(template: string, appHtml: string, head: SiteHead, dehydratedState: unknown) {
  const origin = canonicalOrigin();
  const title = escapeHtml(text(head.title, 70));
  const description = escapeHtml(text(head.description, 200));
  const url = origin ? `${origin}${head.canonicalPath}` : "";
  const image = head.ogImage && origin ? `${origin}${head.ogImage}` : "";
  const structuredData = { "@context": "https://schema.org", "@type": "ProfessionalService", name: siteInfo.name, description: siteInfo.description, areaServed: "Southern California", serviceType: ["Landscape design", "Outdoor living concepts", "Hardscape concepts", "Property visualization"], url: origin || undefined };
  const tags = [`<title>${title}</title>`, `<meta name="description" content="${description}" />`, `<meta property="og:type" content="website" />`, `<meta property="og:title" content="${title}" />`, `<meta property="og:description" content="${description}" />`, `<meta property="og:site_name" content="Canyon Outdoor" />`, `<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}" />`, `<meta name="twitter:title" content="${title}" />`, `<meta name="twitter:description" content="${description}" />`, `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, "\\u003c")}</script>`];
  if (url) tags.push(`<link rel="canonical" href="${escapeHtml(url)}" />`, `<meta property="og:url" content="${escapeHtml(url)}" />`);
  if (image) tags.push(`<meta property="og:image" content="${escapeHtml(image)}" />`, `<meta property="og:image:alt" content="${escapeHtml(head.ogImageAlt || siteInfo.name)}" />`, `<meta name="twitter:image" content="${escapeHtml(image)}" />`);
  if (head.notFound) tags.push(`<meta name="robots" content="noindex, follow" />`);
  const state = `<script>window.__RQ_STATE__ = ${JSON.stringify(superjson.serialize(dehydratedState)).replace(/</g, "\\u003c")}</script>`;
  return template.replace("</body>", () => `${state}</body>`).replace("<!--app-head-->", () => tags.join("\n")).replace("<!--app-html-->", () => appHtml);
}
