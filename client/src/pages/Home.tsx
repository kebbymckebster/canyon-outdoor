/** Pacific Monolith design reminder: frame each interaction like an architectural proposal—dark, warm, restrained, and tactile. */
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Circle,
  Compass,
  Crosshair,
  Menu,
  Minus,
  MoveHorizontal,
  Plus,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { MapView } from "@/components/Map";

const ASSETS = {
  hero: "/manus-storage/canyon-hero_9f9f0755.jpg",
  concept: "/manus-storage/canyon-concept_51bbcde7.jpg",
  patio: "/manus-storage/canyon-patio_196b7aa9.jpg",
  garden: "/manus-storage/canyon-garden_39aefc7f.jpg",
  symbol: "/manus-storage/canyon-symbol_92480f48.png",
};

const navLinks = ["Work", "Services", "Process", "About", "Contact"];
const serviceCards = [
  { number: "01", title: "Landscape\nDesign", copy: "Planting, material palettes, spatial flow, and an approach tuned to your property's conditions.", tag: "Design direction", image: ASSETS.garden },
  { number: "02", title: "Outdoor\nLiving", copy: "Patios, gathering areas, fire features, kitchens, and entertaining zones translated into a cohesive concept.", tag: "Concept / Planning", image: ASSETS.patio },
  { number: "03", title: "Hardscape\nConcepts", copy: "Paving, walls, grade changes, and structural landscape elements considered as part of one environment.", tag: "Concept / Planning", image: ASSETS.concept },
  { number: "04", title: "Property\nVisualization", copy: "A visual language for seeing the opportunity in an underused outdoor area before decisions are made.", tag: "Visualization", image: ASSETS.hero },
];
const projects = [
  { name: "Pacific View", place: "Huntington Beach, CA", type: "Outdoor living concept", note: "A visual study of warm stone, shade, and a long horizon.", image: ASSETS.concept, shape: "wide" },
  { name: "Canyon Court", place: "Orange County, CA", type: "Landscape concept", note: "An illustrative planting and material direction for a calm courtyard.", image: ASSETS.patio, shape: "tall" },
  { name: "Quiet Edge", place: "Coastal Orange County", type: "Environmental study", note: "A light-touch approach to material durability and planting rhythm.", image: ASSETS.garden, shape: "medium" },
];
const styles = ["Modern", "California", "Natural", "Mediterranean", "Contemporary"];
const properties = ["Backyard", "Front yard", "Side yard", "Entire property"];
const features = ["Patio", "Pool", "Fire feature", "Outdoor kitchen", "Pergola", "Turf", "Planting", "Lighting"];
const inquiryTypes = ["Landscape", "Outdoor living", "Hardscape", "Backyard transformation", "Property visualization", "Other"];

function LinkArrow({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <span className={`group inline-flex items-center gap-3 text-sm font-bold ${dark ? "text-[#171a17]" : "text-current"}`}>
      {label}
      <span className={`grid h-7 w-7 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-1 ${dark ? "bg-[#171a17] text-[#f7f3ea]" : "border border-current/25"}`}><ArrowRight size={14} /></span>
    </span>
  );
}

function BrandLockup({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={`brand-lockup ${className}`}>
      <img src={ASSETS.symbol} alt="" className={compact ? "h-9 w-9 object-contain" : "h-12 w-12 object-contain"} />
      <span className="brand-lockup__type font-display text-[0.67rem] font-bold tracking-[0.2em]">
        <span>CANYON</span>
        <span className="brand-lockup__horizon">OUTDOOR</span>
      </span>
    </div>
  );
}

function SectionIntro({ number, kicker, title, copy, light = false }: { number: string; kicker: string; title: React.ReactNode; copy?: string; light?: boolean }) {
  return (
    <div className={`grid gap-8 md:grid-cols-[110px_minmax(0,1fr)_minmax(180px,0.45fr)] md:gap-12 ${light ? "text-[#f7f3ea]" : "text-[#171a17]"}`}>
      <div className="flex items-start gap-3 pt-1"><img src={ASSETS.symbol} alt="" className="h-7 w-7 object-contain opacity-80" /><div><span className="eyebrow block">{number}</span><span className="mt-2 block h-px w-9 bg-current/30" /></div></div>
      <div><p className="eyebrow mb-4 opacity-60">{kicker}</p><h2 className="display max-w-3xl text-5xl font-semibold leading-[0.9] md:text-7xl">{title}</h2></div>
      {copy && <p className="self-end max-w-sm text-sm leading-7 opacity-72">{copy}</p>}
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [comparison, setComparison] = useState(53);
  const [activeService, setActiveService] = useState(0);
  const [property, setProperty] = useState("Backyard");
  const [style, setStyle] = useState("California");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["Patio", "Planting", "Lighting"]);
  const [step, setStep] = useState(1);
  const [inquiryType, setInquiryType] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState("");
  const [area, setArea] = useState("");
  const [details, setDetails] = useState("");
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const complexity = useMemo(() => selectedFeatures.length >= 6 ? "High" : selectedFeatures.length <= 2 ? "Focused" : "Moderate", [selectedFeatures]);
  const toggleFeature = (feature: string) => setSelectedFeatures(current => current.includes(feature) ? current.filter(item => item !== feature) : [...current, feature]);
  const toggleInquiry = (item: string) => setInquiryType(current => current.includes(item) ? current.filter(value => value !== item) : [...current, item]);

  const nextStep = () => setStep(current => Math.min(6, current + 1));
  const prevStep = () => setStep(current => Math.max(1, current - 1));
  const submitInquiry = (event: FormEvent) => { event.preventDefault(); setSubmitted(true); };

  return (
    <main className="bg-[#f1eee8] text-[#171a17] selection:bg-[#29433a] selection:text-white">
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-white/10 bg-[#171a17]/94 py-3 backdrop-blur-xl" : "py-5"}`}>
        <div className="container flex items-center justify-between gap-5">
          <a href="#top" className="group text-[#f7f3ea] transition-transform duration-500 hover:scale-[1.03]" aria-label="Canyon Outdoor home"><BrandLockup compact /></a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navLinks.map(link => <a key={link} href={`#${link.toLowerCase()}`} className="text-xs font-bold tracking-wide text-white/70 transition-colors hover:text-white">{link}</a>)}
          </nav>
          <a href="#contact" className="hidden items-center gap-2 rounded-full border border-white/25 bg-white/5 px-4 py-2 text-xs font-bold text-white transition-all hover:border-white hover:bg-white hover:text-[#171a17] sm:flex">Start a Project <ArrowRight size={14} /></a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white lg:hidden" aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
        <div className={`overflow-hidden bg-[#171a17] transition-[max-height] duration-500 lg:hidden ${menuOpen ? "max-h-96 border-t border-white/10" : "max-h-0"}`}>
          <nav className="container grid gap-1 py-5" aria-label="Mobile navigation">
            {navLinks.map((link, index) => <a onClick={() => setMenuOpen(false)} key={link} href={`#${link.toLowerCase()}`} className="flex items-center justify-between border-b border-white/10 py-3 text-lg font-semibold text-white"><span>0{index + 1} — {link}</span><ArrowRight size={18} /></a>)}
          </nav>
        </div>
      </header>

      <section id="top" className="relative isolate min-h-[780px] overflow-hidden bg-[#171a17] text-[#f7f3ea] md:min-h-[860px]">
        <img src={ASSETS.hero} alt="Modern Southern California outdoor space at sunset" className="slow-drift absolute inset-0 h-full w-full object-cover opacity-85" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,18,15,0.92)_0%,rgba(15,18,15,0.62)_38%,rgba(15,18,15,0.04)_72%),linear-gradient(0deg,rgba(15,18,15,0.68)_0%,transparent_45%)]" />
        <div className="topo-lines absolute -right-28 -top-24 h-[520px] w-[520px] rounded-full opacity-70" />
        <img src={ASSETS.symbol} alt="" className="pointer-events-none absolute right-[8%] top-[18%] hidden h-56 w-56 opacity-[0.16] mix-blend-screen md:block" />
        <div className="container relative flex min-h-[780px] flex-col justify-end pb-10 pt-36 md:min-h-[860px] md:pb-14">
          <div className="grid max-w-5xl gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <div className="mb-7 flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-[#b7cfbe]" /><p className="eyebrow text-white/70">Southern California · Design Studio</p></div>
              <h1 className="display text-[clamp(4.2rem,11vw,10rem)] font-semibold leading-[0.78]">OUTDOORS,<br /><span className="text-[#d7c7b0]">REIMAGINED.</span></h1>
            </div>
            <div className="max-w-sm border-l border-white/30 pl-5 lg:mb-1"><p className="text-base leading-7 text-white/78">Thoughtfully designed outdoor spaces inspired by the Southern California landscape.</p><div className="mt-7 flex flex-wrap gap-3"><a href="#work" className="rounded-full bg-[#f7f3ea] px-5 py-3"><LinkArrow label="Explore Our Work" dark /></a><a href="#contact" className="rounded-full border border-white/35 px-5 py-3 text-sm font-bold transition-colors hover:bg-white/10">Start a Project</a></div></div>
          </div>
          <div className="mt-14 flex items-end justify-between border-t border-white/20 pt-5 md:mt-20"><div className="flex items-center gap-3 text-[0.65rem] font-bold tracking-[0.18em] text-white/65"><span className="grid h-7 w-7 place-items-center rounded-full border border-white/25"><ArrowDownRight size={14} /></span> SCROLL TO EXPLORE</div><p className="hidden max-w-[20rem] text-right text-xs leading-5 text-white/52 md:block">LANDSCAPE × ARCHITECTURE × TECHNOLOGY × NATURE</p></div>
        </div>
      </section>

      <section id="work" className="bg-[#f1eee8] px-0 py-20 md:py-32">
        <div className="container">
          <SectionIntro number="01" kicker="The Canyon Method" title={<>THE SPACE<br />BEFORE THE BUILD.</>} copy="We begin with visualization and site thinking—making the opportunity legible before expensive decisions are made." />
          <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_260px]">
            <div className="relative aspect-[1.18/1] overflow-hidden bg-[#c7bdaf] md:aspect-[1.68/1]">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1700&q=85" alt="Existing residential property" className="absolute inset-0 h-full w-full object-cover grayscale contrast-75" />
              <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${comparison}%` }}><img src={ASSETS.concept} alt="Conceptual transformed outdoor space" className="h-full max-w-none w-[calc(100vw-2.5rem)] object-cover md:w-[min(100%,1000px)]" /></div>
              <div className="absolute inset-y-0 z-10 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,.2)]" style={{ left: `${comparison}%` }}><button aria-label="Drag before and after comparison" className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#f7f3ea] text-[#171a17] shadow-lg" onPointerDown={event => { const parent = event.currentTarget.parentElement?.parentElement; if (!parent) return; const move = (moveEvent: PointerEvent) => { const rect = parent.getBoundingClientRect(); setComparison(Math.max(2, Math.min(98, ((moveEvent.clientX - rect.left) / rect.width) * 100))); }; window.addEventListener("pointermove", move); window.addEventListener("pointerup", () => window.removeEventListener("pointermove", move), { once: true }); }}><MoveHorizontal size={18} /></button></div>
              <span className="absolute left-5 top-5 z-20 rounded-full bg-[#171a17]/75 px-3 py-1.5 text-[0.63rem] font-bold tracking-[0.14em] text-white backdrop-blur">CANYON CONCEPT</span><span className="absolute right-5 top-5 rounded-full bg-white/75 px-3 py-1.5 text-[0.63rem] font-bold tracking-[0.14em] text-[#171a17] backdrop-blur">BEFORE</span>
              <div className="absolute bottom-5 left-5 z-20 hidden border-l border-white/70 pl-3 text-[0.6rem] font-bold leading-4 tracking-[0.12em] text-white md:block">SITE LINE 04 — VIEW AXIS<br />MATERIAL FIELD — TRAVERTINE</div>
            </div>
            <div className="flex flex-col justify-between bg-[#171a17] p-7 text-[#f7f3ea]"><div><p className="eyebrow text-[#b7cfbe]">Drag to compare</p><h3 className="display mt-5 text-3xl font-semibold leading-none">MAKE THE<br />POSSIBILITY<br />VISIBLE.</h3></div><div><div className="mb-5 site-line" /><p className="text-sm leading-6 text-white/65">A concept creates a shared language for your site, priorities, and next decisions.</p><a href="#configurator" className="mt-6 inline-block"><LinkArrow label="Build a concept" /></a></div></div>
          </div>
        </div>
      </section>

      <section id="services" className="relative overflow-hidden bg-[#d9d2c7] py-20 md:py-32">
        <div className="datum-dots absolute right-[6%] top-[12%] h-40 w-40" />
        <div className="container"><SectionIntro number="02" kicker="Capabilities" title={<>DESIGNED FOR<br />HOW YOU LIVE OUTSIDE.</>} copy="A planning-led service model that keeps practical needs, material character, and environmental conditions in view." />
          <div className="mt-16 border-y border-[#171a17]/25">
            {serviceCards.map((service, index) => <button onClick={() => setActiveService(index)} key={service.number} className={`group grid w-full gap-5 border-b border-[#171a17]/20 py-7 text-left last:border-b-0 md:grid-cols-[90px_minmax(220px,0.75fr)_minmax(0,1fr)_120px] md:items-center md:gap-8 md:px-5 ${activeService === index ? "bg-[#171a17] px-5 text-white md:-mx-5 md:w-[calc(100%+2.5rem)]" : "hover:bg-[#cfc6b8]"}`}>
              <div className="flex items-center gap-3"><span className={`eyebrow ${activeService === index ? "text-[#b7cfbe]" : "text-[#29433a]"}`}>{service.number}</span><span className="h-px flex-1 bg-current/25" /></div>
              <div><p className={`mb-2 text-[0.6rem] font-bold tracking-[0.14em] ${activeService === index ? "text-[#b7cfbe]" : "text-[#29433a]"}`}>{service.tag}</p><h3 className="display whitespace-pre-line text-3xl font-semibold leading-[0.86] md:text-4xl">{service.title}</h3></div>
              <p className="max-w-md text-sm leading-6 opacity-70">{service.copy}</p>
              <div className="flex items-center justify-between md:justify-end"><span className="eyebrow opacity-45">SPEC_{String(index + 1).padStart(2, "0")}</span><span className="rounded-full border border-current/25 p-2 transition-transform duration-300 group-hover:rotate-45"><ArrowRight size={15} /></span></div>
            </button>)}
          </div>
          <p className="mt-5 text-xs leading-5 text-[#171a17]/60">Outdoor living and hardscape concepts are planning and visualization services. Licensed construction work is coordinated with qualified professionals when appropriate.</p>
        </div>
      </section>

      <section id="configurator" className="relative overflow-hidden bg-[#171a17] py-20 text-[#f7f3ea] md:py-32"><div className="topo-lines absolute -left-44 bottom-0 h-[620px] w-[620px] rounded-full opacity-60" /><div className="container relative"><SectionIntro number="03" kicker="Interactive Planning Tool" light title={<>BUILD<br />YOUR SPACE.</>} copy="A quick, visual way to articulate the outdoor environment you want to explore. This is a concept prompt, not a construction quote." />
          <div className="mt-16 grid gap-7 xl:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-8 rounded-sm border border-white/15 bg-white/[0.04] p-5 md:p-8">
              <div><div className="mb-4 flex items-center justify-between"><p className="eyebrow text-[#b7cfbe]">01 — Property</p><span className="text-xs text-white/45">Choose one</span></div><div className="grid grid-cols-2 gap-2">{properties.map(item => <button key={item} onClick={() => setProperty(item)} className={`rounded-sm border px-3 py-3 text-left text-sm transition-colors ${property === item ? "border-[#b7cfbe] bg-[#b7cfbe] text-[#17251a]" : "border-white/15 text-white/70 hover:border-white/50"}`}>{property === item && <Check className="mb-3 h-4 w-4" />}{item}</button>)}</div></div>
              <div><div className="mb-4 flex items-center justify-between"><p className="eyebrow text-[#b7cfbe]">02 — Style</p><span className="text-xs text-white/45">Set the tone</span></div><div className="flex flex-wrap gap-2">{styles.map(item => <button key={item} onClick={() => setStyle(item)} className={`rounded-full border px-4 py-2 text-xs font-bold transition-colors ${style === item ? "border-[#d7c7b0] bg-[#d7c7b0] text-[#171a17]" : "border-white/15 text-white/70 hover:border-white/50"}`}>{item}</button>)}</div></div>
              <div><div className="mb-4 flex items-center justify-between"><p className="eyebrow text-[#b7cfbe]">03 — Features</p><span className="text-xs text-white/45">{selectedFeatures.length} selected</span></div><div className="grid grid-cols-2 gap-x-4">{features.map(item => <button key={item} onClick={() => toggleFeature(item)} className="flex items-center justify-between border-b border-white/10 py-3 text-left text-sm"><span className={selectedFeatures.includes(item) ? "text-white" : "text-white/55"}>{item}</span><span className={`grid h-5 w-5 place-items-center rounded-full border ${selectedFeatures.includes(item) ? "border-[#b7cfbe] bg-[#b7cfbe] text-[#17251a]" : "border-white/30"}`}>{selectedFeatures.includes(item) ? <Check size={12} /> : <Plus size={12} />}</span></button>)}</div></div>
            </div>
            <div className="relative min-h-[560px] overflow-hidden border border-white/15 bg-[#2e362e] p-5 md:p-8"><img src={ASSETS.concept} alt="Conceptual outdoor environment" className="absolute inset-0 h-full w-full object-cover opacity-75 transition-all duration-700" style={{ filter: style === "Mediterranean" ? "sepia(.28) saturate(1.1)" : style === "Modern" ? "saturate(.72) contrast(1.08)" : style === "Natural" ? "saturate(.85) hue-rotate(-8deg)" : "none" }} /><div className="absolute inset-0 bg-gradient-to-t from-[#171a17]/90 via-transparent to-[#171a17]/20" />
              <div className="relative flex h-full min-h-[500px] flex-col justify-between"><div className="flex justify-between"><div><p className="eyebrow text-white/55">CONCEPT_001 / 2026</p><p className="mt-2 text-xs text-white/80">{property.toUpperCase()} · {style.toUpperCase()}</p></div><div className="flex items-center gap-3"><BrandLockup compact className="hidden text-white/90 sm:flex" /><div className="grid h-10 w-10 place-items-center rounded-full border border-white/35 bg-[#171a17]/30 backdrop-blur"><Crosshair size={17} /></div></div></div><div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end"><div><p className="eyebrow text-[#b7cfbe]">Your Canyon Concept</p><h3 className="display mt-3 text-4xl font-semibold leading-none md:text-5xl">A {style.toLowerCase()}<br />{property.toLowerCase()} field.</h3><p className="mt-4 max-w-md text-sm leading-6 text-white/75">{selectedFeatures.length ? selectedFeatures.join(" · ") : "Select a feature to start"}</p></div><div className="border-l border-white/35 pl-4"><p className="text-[0.6rem] font-bold tracking-[0.14em] text-white/55">CONCEPT COMPLEXITY</p><p className="mt-1 text-xl font-semibold">{complexity}</p></div></div><a href="#contact" className="mt-8 inline-block self-start rounded-full bg-[#f7f3ea] px-5 py-3"><LinkArrow label="Discuss This Concept" dark /></a></div>
            </div>
          </div>
        </div></section>

      <section className="bg-[#f1eee8] py-20 md:py-32"><div className="container"><SectionIntro number="04" kicker="Illustrative Space Studies" title={<>SELECTED<br />SPACES.</>} copy="Visual studies demonstrate a range of outdoor spatial thinking. They are concepts and not a representation of completed construction work." />
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-12">{projects.map((project, index) => <article key={project.name} className={`group relative min-h-[420px] overflow-hidden bg-[#171a17] text-white ${project.shape === "wide" ? "md:col-span-2 lg:col-span-7" : project.shape === "tall" ? "lg:col-span-5 lg:row-span-2" : "lg:col-span-7"}`}><img src={project.image} alt="" className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#171a17]/85 via-[#171a17]/5 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6 md:p-8"><div className="mb-14 flex items-center justify-between"><span className="rounded-full border border-white/30 bg-[#171a17]/30 px-3 py-1.5 text-[0.6rem] font-bold tracking-[0.14em] backdrop-blur">ILLUSTRATIVE CONCEPT</span><span className="grid h-9 w-9 place-items-center rounded-full border border-white/30 transition-transform duration-300 group-hover:rotate-45"><ArrowRight size={15} /></span></div><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-[#d7c7b0]">0{index + 1} · {project.place}</p><h3 className="display mt-3 text-4xl font-semibold leading-none">{project.name}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-white/75">{project.note}</p></div><p className="text-xs text-white/55">{project.type}</p></div></div></article>)}</div>
      </div></section>

      <section id="process" className="bg-[#29433a] py-20 text-[#f7f3ea] md:py-32"><div className="container"><SectionIntro number="05" kicker="The Process" light title={<>FROM IDEA<br />TO OUTDOOR SPACE.</>} copy="A clear sequence creates room for creative thinking, careful decisions, and appropriate coordination as the project moves forward." />
        <div className="relative mt-16 grid divide-y divide-white/15 border-y border-white/15 lg:grid-cols-[0.85fr_1.18fr_0.86fr_1.22fr_0.9fr] lg:divide-x lg:divide-y-0">{[
          ["01", "Discover", "Understand the property, lifestyle, goals, and existing conditions."], ["02", "Concept", "Develop the visual direction, layout, materials, and overall experience."], ["03", "Refine", "Review the concept and sharpen the details that matter most."], ["04", "Plan", "Prepare the scope and coordinate appropriate professionals when applicable."], ["05", "Build", "Where licensed construction work is involved, coordinate with qualified professionals as appropriate."],
        ].map(([num, title, copy], index) => <div key={num} className={`group min-h-72 p-6 transition-colors hover:bg-white/[0.07] lg:min-h-[360px] lg:p-7 ${index === 1 || index === 3 ? "lg:pt-14" : index === 2 ? "lg:pt-9" : ""}`}><div className="flex justify-between"><span className="eyebrow text-[#b7cfbe]">{num} / SITE STAGE</span><Circle size={10} className="text-[#b7cfbe] transition-transform duration-300 group-hover:scale-150" /></div><div className="mt-4 h-px bg-white/15" /><h3 className="display mt-16 text-3xl font-semibold">{title}</h3><p className="mt-4 text-sm leading-6 text-white/67">{copy}</p><p className="mt-6 text-[0.58rem] font-bold tracking-[0.14em] text-white/35">DATUM_{String(index + 1).padStart(2, "0")}</p></div>)}</div>
      </div></section>

      <section className="relative overflow-hidden bg-[#e1d9cd] py-20 md:py-32"><img src={ASSETS.garden} alt="Climate-appropriate garden materials and planting" className="absolute inset-y-0 right-0 h-full w-full object-cover opacity-20 md:w-[52%] md:opacity-100" /><div className="absolute inset-y-0 right-0 hidden w-[65%] bg-gradient-to-r from-[#e1d9cd] via-[#e1d9cd]/25 to-transparent md:block" /><div className="container relative"><SectionIntro number="06" kicker="Environmental Intelligence" title={<>DESIGN WITH THE LAND.<br />NOT AGAINST IT.</>} copy="Site-aware design considers water, plant selection, material longevity, and the particular logic of Southern California's climate." />
        <div className="mt-16 grid gap-3 md:grid-cols-[0.82fr_1.18fr_0.9fr]"><div className="spec-corner border border-[#171a17]/20 bg-[#f1eee8]/80 p-6 pt-10 backdrop-blur"><p className="eyebrow text-[#29433a]">01 — Water-Conscious</p><h3 className="display mt-14 text-3xl font-semibold">LESS<br />WATER.</h3><p className="mt-4 text-sm leading-6 text-[#171a17]/65">Plant and irrigation concepts selected with the site's long-term conditions in mind.</p><p className="mt-8 text-[0.58rem] font-bold tracking-[0.14em] text-[#171a17]/40">FIELD NOTE — 01</p></div><div className="spec-corner border border-[#171a17]/20 bg-[#171a17] p-6 pt-10 text-white backdrop-blur md:-mt-7"><p className="eyebrow text-[#b7cfbe]">02 — Site-Aware</p><h3 className="display mt-14 text-4xl font-semibold">SMARTER<br />PLANTING.</h3><p className="mt-4 max-w-sm text-sm leading-6 text-white/65">Native and climate-appropriate plant palettes can create depth, resilience, and a stronger sense of place.</p><p className="mt-8 text-[0.58rem] font-bold tracking-[0.14em] text-white/35">FIELD NOTE — 02</p></div><div className="spec-corner border border-[#171a17]/20 bg-[#f1eee8]/80 p-6 pt-10 backdrop-blur md:mt-9"><p className="eyebrow text-[#29433a]">03 — Considered</p><h3 className="display mt-14 text-3xl font-semibold">LONGER-LASTING<br />MATERIALS.</h3><p className="mt-4 text-sm leading-6 text-[#171a17]/65">Durable, well-considered materials help a concept age with quiet consistency.</p><p className="mt-8 text-[0.58rem] font-bold tracking-[0.14em] text-[#171a17]/40">FIELD NOTE — 03</p></div></div>
      </div></section>

      <section className="bg-[#171a17] py-20 text-[#f7f3ea] md:py-32"><div className="container"><SectionIntro number="07" kicker="Local Context" light title={<>BUILT FOR<br />SOUTHERN CALIFORNIA.</>} copy="Canyon Outdoor is rooted in Orange County and guided by the region’s light, climate, material palette, and indoor–outdoor rhythm." />
        <div className="mt-16 grid overflow-hidden border border-white/15 lg:grid-cols-[1.2fr_0.8fr]"><div className="relative min-h-[430px]"><MapView initialCenter={{ lat: 33.6704, lng: -117.822 } as google.maps.LatLngLiteral} initialZoom={10} className="map-canvas h-full min-h-[430px] w-full" /><div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#171a17]/30 to-transparent" /><div className="absolute left-6 top-6 rounded-sm border border-white/20 bg-[#171a17]/80 px-4 py-3 backdrop-blur"><p className="eyebrow text-[#b7cfbe]">Orange County, CA</p><p className="mt-1 text-xs text-white/65">A local perspective, not a blanket service-area claim.</p></div></div><div className="flex flex-col justify-between bg-[#20241f] p-7 md:p-10"><div><p className="eyebrow text-[#b7cfbe]">Areas of interest</p><h3 className="display mt-5 text-4xl font-semibold leading-[0.9]">CLOSE TO<br />THE LAND.</h3><p className="mt-6 max-w-sm text-sm leading-7 text-white/67">For a location not listed, an inquiry is the best way to determine if the project is a fit.</p></div><div className="mt-12 grid grid-cols-2 gap-x-6 border-t border-white/15 pt-5 text-sm text-white/75">{["Huntington Beach", "Newport Beach", "Costa Mesa", "Irvine", "Fountain Valley", "Anaheim"].map(areaName => <div key={areaName} className="flex items-center gap-2 border-b border-white/10 py-3"><Compass size={13} className="text-[#b7cfbe]" />{areaName}</div>)}</div></div></div>
      </div></section>

      <section id="about" className="bg-[#f1eee8] py-20 md:py-32"><div className="container grid gap-14 lg:grid-cols-[0.38fr_0.62fr]"><div className="section-rail"><p className="eyebrow text-[#29433a]">08 — About Canyon Outdoor</p><p className="mt-5 max-w-xs text-sm leading-7 text-[#171a17]/65">A growing studio with a broad view of what outdoor spaces can become.</p></div><div><h2 className="display max-w-4xl text-6xl font-semibold leading-[0.86] md:text-8xl">WE SEE MORE<br />THAN A YARD.</h2><div className="mt-12 grid gap-8 border-t border-[#171a17]/20 pt-6 md:grid-cols-[1.3fr_0.7fr]"><p className="max-w-xl text-lg leading-8 text-[#171a17]/78">Canyon Outdoor approaches exterior space as an extension of the property and the people who use it. We focus on design, planning, environment, function, and a long view of the experience.</p><div className="grid grid-cols-2 gap-2">{["Design", "Planning", "Craft", "Environment", "Function", "Long-term vision"].map(word => <span key={word} className="border border-[#171a17]/20 px-3 py-3 text-xs font-bold">{word}</span>)}</div></div><a href="#contact" className="mt-10 inline-block"><LinkArrow label="Start with a conversation" dark /></a></div></div></section>

      <section id="contact" className="relative overflow-hidden bg-[#d7c7b0] py-20 text-[#171a17] md:py-32"><div className="topo-lines absolute -right-24 -top-20 h-[520px] w-[520px] rounded-full opacity-30" /><img src={ASSETS.symbol} alt="" className="pointer-events-none absolute bottom-10 right-[8%] hidden h-40 w-40 opacity-10 md:block" /><div className="container relative"><SectionIntro number="09" kicker="Project Inquiry" title={<>LET'S CREATE<br />YOUR OUTDOOR SPACE.</>} copy="Share what you’re envisioning. This guided inquiry helps start a more useful first conversation." />
        <div className="mt-16 overflow-hidden border border-[#171a17]/25 bg-[#f4f0e8] shadow-[0_25px_90px_rgba(23,26,23,0.12)]">{submitted ? <div className="grid min-h-[520px] place-items-center p-8 text-center"><div className="max-w-lg"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#29433a] text-white"><Check size={28} /></div><p className="eyebrow mt-8 text-[#29433a]">Inquiry noted</p><h3 className="display mt-4 text-5xl font-semibold leading-[0.88]">PROJECT<br />RECEIVED.</h3><p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#171a17]/65">Thanks for reaching out to Canyon Outdoor. We’ll review your project information and get back to you.</p><button onClick={() => { setSubmitted(false); setStep(1); }} className="mt-8 border-b border-[#171a17] pb-1 text-sm font-bold">Start another inquiry</button></div></div> : <form onSubmit={submitInquiry} className="grid lg:grid-cols-[0.28fr_0.72fr]"><div className="flex min-h-64 flex-col justify-between bg-[#171a17] p-7 text-white md:p-9"><div><p className="eyebrow text-[#b7cfbe]">Project Application</p><p className="display mt-6 text-5xl font-semibold">0{step}<span className="text-white/30">/06</span></p></div><div className="mt-12 space-y-3">{["Vision", "Property", "Location", "Details", "Inspiration", "Contact"].map((label, index) => <button type="button" onClick={() => setStep(index + 1)} key={label} className={`flex w-full items-center gap-3 text-left text-xs font-bold transition-colors ${step === index + 1 ? "text-[#b7cfbe]" : "text-white/45 hover:text-white"}`}><span className={`h-px w-5 ${step === index + 1 ? "bg-[#b7cfbe]" : "bg-current"}`} />0{index + 1} — {label}</button>)}</div></div><div className="min-h-[500px] p-7 md:p-10 lg:p-14"><div className="flex items-center justify-between border-b border-[#171a17]/20 pb-5"><p className="eyebrow text-[#29433a]">Step 0{step}</p><p className="text-xs text-[#171a17]/50">Use the arrows or the stage list to move through your brief.</p></div>
            {step === 1 && <div className="py-10"><h3 className="display text-4xl font-semibold leading-none md:text-5xl">WHAT ARE YOU<br />ENVISIONING?</h3><p className="mt-4 max-w-lg text-sm leading-6 text-[#171a17]/62">Select everything that feels relevant right now.</p><div className="mt-8 grid gap-2 sm:grid-cols-2">{inquiryTypes.map(item => <button type="button" key={item} onClick={() => toggleInquiry(item)} className={`flex items-center justify-between border p-4 text-left text-sm font-bold transition-colors ${inquiryType.includes(item) ? "border-[#29433a] bg-[#29433a] text-white" : "border-[#171a17]/20 hover:border-[#171a17]"}`}><span>{item}</span>{inquiryType.includes(item) ? <Check size={17} /> : <Plus size={17} />}</button>)}</div></div>}
            {step === 2 && <div className="py-10"><h3 className="display text-4xl font-semibold leading-none md:text-5xl">WHAT TYPE OF<br />PROPERTY?</h3><div className="mt-8 grid gap-2 sm:grid-cols-3">{["Residential", "Commercial", "Other"].map(item => <button type="button" key={item} onClick={() => setPropertyType(item)} className={`min-h-36 border p-5 text-left text-lg font-semibold transition-colors ${propertyType === item ? "border-[#29433a] bg-[#29433a] text-white" : "border-[#171a17]/20 hover:border-[#171a17]"}`}><span className="eyebrow mb-10 block opacity-60">Select</span>{item}</button>)}</div></div>}
            {step === 3 && <div className="py-10"><h3 className="display text-4xl font-semibold leading-none md:text-5xl">WHERE IS THE<br />PROJECT LOCATED?</h3><p className="mt-4 text-sm leading-6 text-[#171a17]/62">A city or general neighborhood is enough for a first look.</p><input value={area} onChange={event => setArea(event.target.value)} placeholder="e.g. Costa Mesa, CA" className="mt-10 w-full border-b border-[#171a17]/30 bg-transparent py-4 font-display text-2xl outline-none placeholder:text-[#171a17]/28 focus:border-[#29433a]" /></div>}
            {step === 4 && <div className="py-10"><h3 className="display text-4xl font-semibold leading-none md:text-5xl">WHAT ARE YOU<br />HOPING TO CREATE?</h3><textarea value={details} onChange={event => setDetails(event.target.value)} placeholder="Tell us about the site, your routines, the current pain points, and what you’d like to feel different." className="mt-8 min-h-48 w-full resize-none border border-[#171a17]/20 bg-transparent p-4 text-sm leading-7 outline-none placeholder:text-[#171a17]/38 focus:border-[#29433a]" /></div>}
            {step === 5 && <div className="py-10"><h3 className="display text-4xl font-semibold leading-none md:text-5xl">UPLOAD<br />INSPIRATION.</h3><p className="mt-4 max-w-xl text-sm leading-6 text-[#171a17]/62">Share a reference photo, a rough site sketch, or something that captures the feeling you are after.</p><label className="mt-9 flex min-h-48 flex-col items-center justify-center border border-dashed border-[#171a17]/35 bg-[#171a17]/[0.03] p-6 text-center transition-colors hover:bg-[#29433a]/5"><Sparkles size={21} className="mb-4 text-[#29433a]" /><span className="text-sm font-bold">{fileName || "Choose an image or drop it here"}</span><span className="mt-2 text-xs text-[#171a17]/55">Images are added to this inquiry preview.</span><input type="file" accept="image/*" className="sr-only" onChange={event => setFileName(event.target.files?.[0]?.name || "")} /></label></div>}
            {step === 6 && <div className="py-10"><h3 className="display text-4xl font-semibold leading-none md:text-5xl">HOW CAN WE<br />REACH YOU?</h3><div className="mt-8 grid gap-4 sm:grid-cols-2"><input required placeholder="Name" className="border-b border-[#171a17]/30 bg-transparent py-4 text-sm outline-none placeholder:text-[#171a17]/40 focus:border-[#29433a]" /><input required type="email" placeholder="Email address" className="border-b border-[#171a17]/30 bg-transparent py-4 text-sm outline-none placeholder:text-[#171a17]/40 focus:border-[#29433a]" /><input placeholder="Phone (optional)" className="border-b border-[#171a17]/30 bg-transparent py-4 text-sm outline-none placeholder:text-[#171a17]/40 focus:border-[#29433a]" /><input placeholder="Best time to connect (optional)" className="border-b border-[#171a17]/30 bg-transparent py-4 text-sm outline-none placeholder:text-[#171a17]/40 focus:border-[#29433a]" /></div><p className="mt-7 max-w-xl text-xs leading-5 text-[#171a17]/55">This prototype confirms the inquiry on-screen. Connect a secure form delivery service before collecting live project details.</p></div>}
            <div className="mt-2 flex items-center justify-between border-t border-[#171a17]/20 pt-5"><button type="button" onClick={prevStep} disabled={step === 1} className="flex items-center gap-2 text-sm font-bold disabled:opacity-20"><ChevronLeft size={16} /> Back</button>{step < 6 ? <button type="button" onClick={nextStep} className="flex items-center gap-2 rounded-full bg-[#171a17] px-5 py-3 text-sm font-bold text-white">Continue <ChevronRight size={16} /></button> : <button type="submit" className="flex items-center gap-2 rounded-full bg-[#29433a] px-5 py-3 text-sm font-bold text-white">Submit Project <Send size={16} /></button>}</div>
          </div></form>}</div>
      </div></section>

      <footer className="bg-[#171a17] pt-16 text-[#f7f3ea] md:pt-24"><div className="container"><div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.2fr_0.8fr_0.7fr_0.7fr]"><div><BrandLockup /><p className="display mt-7 text-4xl font-semibold leading-[0.84]">OUTDOOR<br />POSSIBILITY,<br />MADE LEGIBLE.</p><p className="mt-6 max-w-xs text-sm leading-6 text-white/55">Landscape design, outdoor living concepts, hardscape concepts, and property visualization.</p></div><div><p className="eyebrow text-[#b7cfbe]">Navigate</p><div className="mt-5 grid gap-3">{navLinks.map(link => <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-white/70 hover:text-white">{link}</a>)}</div></div><div><p className="eyebrow text-[#b7cfbe]">Connect</p><div className="mt-5 grid gap-3 text-sm text-white/70"><span>Instagram — link to be added</span><span>Facebook — link to be added</span></div></div><div><p className="eyebrow text-[#b7cfbe]">Details</p><div className="mt-5 grid gap-3 text-sm leading-6 text-white/70"><span>Phone — to be added</span><span>Email — to be added</span><span>Orange County, California</span></div></div></div><div className="flex flex-wrap items-center justify-between gap-3 py-6 text-[0.65rem] font-bold tracking-[0.14em] text-white/45"><span>© 2026 CANYON OUTDOOR</span><span>33.70° N / 117.84° W</span><span>DESIGN WITH THE LAND.</span></div></div></footer>
    </main>
  );
}
