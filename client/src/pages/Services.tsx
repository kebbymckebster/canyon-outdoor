/** Canyon Outdoor Services page: modern landscape practice explained through living systems, not dense marketing panels. */
import { Droplets, Leaf, Sparkles } from "lucide-react";
import { ASSETS } from "@/lib/site";
import { PageIntro, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { QuickContactForm } from "@/components/QuickContactForm";

const offerings = [
  { title: "Landscape design", copy: "Layered planting, shade, textures, and materials shaped around the site and the way you move through it.", image: ASSETS.detail, icon: Leaf },
  { title: "Outdoor living", copy: "Pools, water, fire, gathering areas, and outdoor kitchens that make the outdoors a natural part of every day.", image: ASSETS.water, icon: Droplets, dark: true },
  { title: "Property visualization", copy: "A clear visual direction for the changes you are considering before decisions are made and work begins.", image: ASSETS.concept, icon: Sparkles },
];

export default function Services() {
  return <><SiteHeader /><main className="bg-[#e0e7d9] pt-32 text-[#1d2b20] md:pt-40"><section className="soft-mesh relative overflow-hidden pb-24 md:pb-32"><div className="container relative"><PageIntro eyebrow="Designed for real life" title={<>MORE GREEN.<br />MORE OUTSIDE.</>} copy="We balance planting, shade, water, and durable materials around the daily rituals that make an outdoor space worth using." />
    <div className="mt-14 grid gap-4 md:grid-cols-3">{offerings.map(({ title, copy, image, icon: Icon, dark }) => <article key={title} className={`overflow-hidden rounded-[1.5rem] p-6 ${dark ? "bg-[#173221] text-white" : "plant-glass"}`}><Icon className={dark ? "text-[#b9d3b5]" : "text-[#52705b]"} /><h2 className="display mt-10 text-3xl font-semibold">{title}</h2><p className={`mt-4 text-sm leading-6 ${dark ? "text-white/70" : "text-[#1d2b20]/65"}`}>{copy}</p><img src={image} alt="" className="mt-7 aspect-[1.35/1] w-full rounded-2xl object-cover" /></article>)}</div>
    <p className="mt-6 max-w-2xl text-xs leading-5 text-[#1d2b20]/60">Outdoor living and hardscape concepts are planning and visualization services. Licensed construction work is coordinated with qualified professionals when appropriate.</p></div></section></main><QuickContactForm /><SiteFooter /></>;
}
