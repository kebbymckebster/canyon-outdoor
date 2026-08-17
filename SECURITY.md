# Canyon Outdoor Security Notes

## Deployment posture

The application is deployed through a managed HTTPS-capable platform. The server trusts only the first configured reverse proxy hop, redirects production requests forwarded as non-HTTPS to HTTPS, and sends HSTS, frame-denial, MIME-sniffing prevention, referrer, permissions, and content-security headers. The application disables Express identification headers and limits JSON and form bodies to 100 KB.

The browser has no database client, database connection string, service key, or private API credential. `DATABASE_URL`, `JWT_SECRET`, and platform integration credentials are read only in server modules. Environment files are excluded from version control. The inquiry database is accessed only by the server-side tRPC procedure; no direct database endpoint is exposed to the public browser. Managed deployment network controls should continue to allow database access only from the application service.

## User input inventory

| Entry point | Accepted data | Controls |
| --- | --- | --- |
| Contact modal | Service interests, property type, location, project details, optional public reference link, name, email, optional phone and contact time | Client limits and server-side strict Zod schema, field length limits, typed enums, email and phone checks, whitespace normalization, angle-bracket removal, rejected unknown fields, parameterized Drizzle persistence |
| OAuth callback | Provider-issued `code` and `state` | One-time nonce cookie validation, state matching, secure session cookie handling, structured outcome logging |
| Public API | tRPC requests under `/api/trpc` | 120 requests per minute per HMAC fingerprint, API error logging, JSON body limit |

Direct file uploads are deliberately not enabled. The inspiration step accepts only an optional public URL. This avoids handling arbitrary file bytes, executable formats, and untrusted file metadata.

## Abuse controls and observability

The site applies a broad request throttle, an API-specific throttle, and a stricter inquiry limit of five attempts per 15 minutes per HMAC-based request fingerprint. The server logs API status and duration, rate-limit and unusual-traffic events, OAuth outcomes, and normalized API errors. Logs exclude inquiry text, raw addresses, session tokens, passwords, and secret values.

`robots.txt` requests that cooperative crawlers avoid `/api/`; server-side throttles are the enforceable control for bots and scripts.

## Review cadence

Re-run the repository credential scan before each production release, review deployment logs for rate-limit or authentication anomalies, and have qualified legal and security professionals review changes that affect data collection or vendor integrations.
