const origin = "http://localhost:4101";
const routes = ["/", "/work", "/services", "/process", "/privacy", "/terms"];

for (const route of routes) {
  const response = await fetch(new URL(route, origin));
  const html = await response.text();
  if (!response.ok) throw new Error(`${route} returned HTTP ${response.status}`);

  const expectations = [
    ["loading shell", /id="page-loader"/],
    ["skip link", /href="#main-content"/],
    ["main landmark", /<main id="main-content"/],
    ["document title", /<title>[^<]+<\/title>/],
    ["description", /<meta name="description" content="[^"]+"/],
    ["Open Graph title", /<meta property="og:title" content="[^"]+"/],
    ["canonical URL", new RegExp(`<link rel="canonical" href="${origin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}${route === "/" ? "/" : route}"`)],
  ];

  for (const [label, pattern] of expectations) {
    if (!pattern.test(html)) throw new Error(`${route} is missing ${label}`);
  }

  const h1Count = (html.match(/<h1\b/g) ?? []).length;
  if (h1Count !== 1) throw new Error(`${route} should have exactly one h1, found ${h1Count}`);

  const imageTags = html.match(/<img\b[^>]*>/g) ?? [];
  const missingAlt = imageTags.filter(tag => !/\balt=("[^"]*"|'[^']*')/.test(tag));
  if (missingAlt.length) throw new Error(`${route} has ${missingAlt.length} image(s) without alt text`);
  console.log(`${route}: rendered metadata, accessible landmarks, loader shell, and ${imageTags.length} image alt attributes verified.`);
}
