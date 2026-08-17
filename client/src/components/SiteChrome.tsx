/** Canyon Outdoor shared chrome: the brand and menu control are the only top-bar actions, with routes revealed inside the menu. */
import { useEffect, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { MapPin, Menu, X } from "lucide-react";
import { ASSETS, navItems } from "@/lib/site";
import { ContactModal } from "@/components/ContactModal";

export function BrandLockup({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return <div className={`brand-lockup ${light ? "text-[#f7f6f0]" : "text-[#173221]"}`}>
    <img src={ASSETS.symbol} alt="Canyon Outdoor" className={compact ? "h-8 w-8 object-contain" : "h-10 w-10 object-contain"} />
    <span className="brand-lockup__type text-[0.66rem] font-bold tracking-[0.16em]"><span>CANYON</span><span>OUTDOOR</span></span>
  </div>;
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen || contactOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, contactOpen]);

  return <>
    <header className="fixed left-0 top-0 z-50 px-4 py-4 sm:px-6">
      <div className="flex w-fit items-center gap-2 rounded-full border border-white/35 bg-[#f8f7f1]/90 p-1.5 shadow-[0_14px_38px_rgba(21,42,26,0.18)] backdrop-blur-xl">
        <Link href="/" className="rounded-full px-2.5 py-1.5" aria-label="Canyon Outdoor home"><BrandLockup compact /></Link>
        <button onClick={() => setContactOpen(true)} className="rounded-full border border-[#1d2b20]/20 px-3.5 py-2 text-xs font-bold text-[#1d2b20] transition-colors hover:bg-[#e0e7d9]" aria-label="Open contact form">Contact</button>
        <button onClick={() => setMenuOpen(true)} className="flex items-center gap-2 rounded-full bg-[#1d2b20] px-3.5 py-2 text-xs font-bold text-white transition-transform active:scale-95" aria-label="Open menu"><span>Menu</span><Menu size={15} /></button>
      </div>
    </header>
    <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={!menuOpen}>
      <button className="absolute inset-0 bg-[#102015]/45 backdrop-blur-sm" onClick={() => setMenuOpen(false)} aria-label="Close menu overlay" />
      <div className={`menu-surface absolute left-1/2 top-4 w-[calc(100%-2rem)] max-w-[930px] -translate-x-1/2 overflow-hidden rounded-[1.7rem] border border-white/10 text-white transition-all duration-500 ${menuOpen ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"}`}>
        <div className="flex items-center justify-between border-b border-white/12 px-5 py-4 sm:px-7"><BrandLockup light compact /><button onClick={() => setMenuOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#173221]" aria-label="Close menu"><X size={18} /></button></div>
        <div className="relative grid gap-10 overflow-hidden px-6 py-10 sm:grid-cols-[1fr_0.85fr] sm:px-10 sm:py-12"><img src={ASSETS.detail} alt="" className="absolute inset-y-0 right-0 h-full w-1/2 object-cover opacity-20" />
          <nav className="relative grid content-start" aria-label="Site pages"><p className="eyebrow mb-6 text-[#b9d3b5]">Explore Canyon Outdoor</p>{navItems.map(item => <Link onClick={() => setMenuOpen(false)} key={item.href} href={item.href} className="border-t border-white/15 py-3.5 text-3xl font-semibold leading-none transition-colors hover:text-[#b9d3b5] sm:text-4xl">{item.label}</Link>)}</nav>
          <div className="relative flex flex-col justify-end"><p className="max-w-sm text-lg leading-8 text-white/75">Modern outdoor environments with deeper planting, pools, water, fire, and spaces that invite you to stay outside.</p><div className="mt-12 flex items-center gap-2 text-sm text-white/55"><MapPin size={15} className="text-[#b9d3b5]" />Orange County, California</div></div>
        </div>
      </div>
    </div>
    <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
  </>;
}

export function PageIntro({ eyebrow, title, copy, light = false }: { eyebrow: string; title: ReactNode; copy?: string; light?: boolean }) {
  return <div className={`grid gap-7 lg:grid-cols-[1.1fr_0.55fr] lg:items-end ${light ? "text-[#f8f7f1]" : "text-[#1d2b20]"}`}>
    <div><div className="mb-4 flex items-center gap-2"><img src={ASSETS.symbol} alt="" className="h-6 w-6 object-contain" /><p className={`eyebrow ${light ? "text-[#b9d3b5]" : "text-[#52705b]"}`}>{eyebrow}</p></div><h1 className="display max-w-3xl text-5xl font-bold leading-[0.9] md:text-7xl">{title}</h1></div>
    {copy && <p className={`max-w-md text-base leading-7 ${light ? "text-white/70" : "text-[#1d2b20]/67"}`}>{copy}</p>}
  </div>;
}

export function SiteFooter() {
  return <footer className="bg-[#173221] py-12 text-white"><div className="container flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><BrandLockup light /><p className="mt-5 max-w-xs text-sm leading-6 text-white/60">Landscape design, outdoor living concepts, hardscape concepts, and property visualization.</p></div><div className="flex flex-col gap-3 text-sm text-white/65 md:items-end"><div className="flex gap-4"><Link href="/privacy" className="hover:text-white">Privacy Policy</Link><Link href="/terms" className="hover:text-white">Terms of Service</Link></div><p className="text-xs text-white/45">© 2026 Canyon Outdoor</p></div></div></footer>;
}
