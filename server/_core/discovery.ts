import type { Express, Request, Response } from "express";
import { publicPaths, siteInfo } from "../../client/src/ssr/siteMeta";

const origin = () => process.env.CANONICAL_ORIGIN?.replace(/\/$/, "") || "";
const renderUrls = () => publicPaths.map(path => `<url><loc>${origin()}${path === "/" ? "/" : path}</loc><changefreq>monthly</changefreq><priority>${path === "/" ? "1.0" : "0.8"}</priority></url>`).join("");

export function registerDiscoveryRoutes(app: Express) {
  app.get("/sitemap.xml", (_req: Request, res: Response) => {
    if (!origin()) return res.status(503).type("text/plain").send("Sitemap will be available after CANONICAL_ORIGIN is configured.");
    res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${renderUrls()}</urlset>`);
  });
  app.get("/robots.txt", (_req: Request, res: Response) => {
    const sitemap = origin() ? `\nSitemap: ${origin()}/sitemap.xml` : "";
    res.type("text/plain").send(`User-agent: *\nAllow: /\nDisallow: /api/${sitemap}`);
  });
  app.get("/llms.txt", (_req: Request, res: Response) => {
    res.type("text/plain").send(`# ${siteInfo.name}\n\n> ${siteInfo.description}\n\nCanyon Outdoor provides planning and visualization services, not licensed construction or contracting services.\n\n## Public pages\n- /: Studio overview\n- /work: Landscape, pool, grotto, waterslide, kitchen, and swim-up-bar concept studies\n- /services: Landscape design, outdoor living concepts, hardscape concepts, and property visualization\n- /process: Design process\n- /privacy and /terms: Legal information\n\n## Contact\nUse the Contact control on any public page to submit a project inquiry.`);
  });
}
