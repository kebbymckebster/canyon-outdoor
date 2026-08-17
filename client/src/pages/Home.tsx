/** Canyon Outdoor Home page: a focused, fade-blended welcome with all secondary content reached through the menu. */
import { Link } from "wouter";
import { Leaf } from "lucide-react";
import { ASSETS } from "@/lib/site";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { QuickContactForm } from "@/components/QuickContactForm";

export default function Home() {
  return <><SiteHeader /><main className="soft-mesh relative isolate min-h-screen overflow-hidden pt-28 md:pt-36">
    <img src={ASSETS.hero} alt="Lush contemporary Southern California outdoor space with planting, water, and fire" className="absolute inset-y-0 right-0 h-full w-full object-cover md:w-[74%]" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,#f4f2eb_0%,rgba(244,242,235,0.98)_34%,rgba(244,242,235,0.88)_54%,rgba(244,242,235,0.52)_74%,rgba(244,242,235,0.12)_100%)] md:bg-[linear-gradient(90deg,#f4f2eb_0%,#f4f2eb_26%,rgba(244,242,235,0.95)_38%,rgba(244,242,235,0.62)_51%,rgba(244,242,235,0.14)_68%,rgba(244,242,235,0)_100%)]" />
    <section className="container relative flex min-h-[calc(100vh-7rem)] items-center py-16 md:min-h-[calc(100vh-9rem)]"><div className="max-w-4xl"><div className="plant-glass inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-[#31563a]"><Leaf size={14} /> Southern California landscape design</div><h1 className="display mt-7 text-[clamp(4.15rem,9.6vw,8.8rem)] font-bold leading-[0.82] text-[#1b2e20]">OUTDOORS,<br /><span className="text-[#52705b]">REIMAGINED.</span></h1><p className="mt-7 max-w-md text-base leading-7 text-[#1b2e20]/72 md:text-lg">Landscape concepts shaped by Southern California light, layered planting, and the way a property moves from shade to firelight.</p><Link href="/work" className="mt-8 inline-block rounded-full bg-[#1d2b20] px-5 py-3.5 text-sm font-semibold text-white">Explore our work</Link></div></section>
  </main><QuickContactForm /><SiteFooter /></>;
}
