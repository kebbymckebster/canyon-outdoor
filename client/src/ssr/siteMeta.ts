export type SiteHead = {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  ogImageAlt?: string;
  notFound?: boolean;
};

const siteName = "Canyon Outdoor";
const defaultDescription = "Canyon Outdoor is a Southern California studio for landscape design, outdoor living concepts, hardscape concepts, and property visualization.";
const heroImage = "/manus-storage/canyon-lush-hero_c3aabbb0.jpg";

const pageMeta: Record<string, Omit<SiteHead, "canonicalPath">> = {
  "/": { title: "Canyon Outdoor | Landscape Design and Outdoor Living Concepts", description: defaultDescription, ogImage: heroImage, ogImageAlt: "Canyon Outdoor contemporary landscape concept" },
  "/work": { title: "Landscape and Outdoor Living Concepts | Canyon Outdoor", description: "Explore Canyon Outdoor concept studies for pools, water features, grottos, outdoor kitchens, hardscape, and layered planting.", ogImage: "/manus-storage/canyon-pool-living_9bbb600f.jpg", ogImageAlt: "Contemporary outdoor living concept with pool and planting" },
  "/services": { title: "Landscape Design and Property Visualization Services | Canyon Outdoor", description: "Canyon Outdoor provides landscape design, outdoor living concepts, hardscape concepts, and property visualization in Southern California.", ogImage: heroImage, ogImageAlt: "Contemporary Southern California outdoor space" },
  "/process": { title: "Landscape Design Process | Canyon Outdoor", description: "Learn how Canyon Outdoor turns site observations, planting, water, fire, and material ideas into a clear outdoor living direction.", ogImage: heroImage, ogImageAlt: "Lush planting and contemporary outdoor materials" },
  "/privacy": { title: "Privacy Policy | Canyon Outdoor", description: "Read the Canyon Outdoor Privacy Policy for information about project inquiries and website data handling." },
  "/terms": { title: "Terms of Service | Canyon Outdoor", description: "Read the Canyon Outdoor Terms of Service for use of its landscape design, outdoor living concept, hardscape concept, and property visualization website." },
};

export function headForPath(rawUrl: string): SiteHead {
  const pathname = rawUrl.split("?")[0].replace(/\/+$/, "") || "/";
  const current = pageMeta[pathname];
  if (!current) return { title: `${siteName} | Page Not Found`, description: defaultDescription, canonicalPath: pathname, notFound: true };
  return { ...current, canonicalPath: pathname };
}

export const publicPaths = Object.keys(pageMeta);
export const siteInfo = { name: siteName, description: defaultDescription, heroImage };
