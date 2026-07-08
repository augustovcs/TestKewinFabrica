import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "../data/products";

// Cutout transparente (fundo removido) do produto
const cutout = (img: string) => "/produtos/cutout/" + img.split("/").pop()!.replace(/\.\w+$/, ".png");

// Shape do card (Batavo): rounded-rect com degrau no canto inferior direito
const CARD_PATH =
  "M547 24C547 10.7452 536.255 0 523 0H24C10.7452 0 0 10.7452 0 24V808C0 821.255 10.7452 832 24 832H376C385.952 832 396 824 398 811C431.142 811 489.5 811 521.5 811C541 811 547 797.5 547 787V24Z";

export default function ProductShowcase() {
  const track = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLAnchorElement | null)[]>([]);

  // Cover-flow: escala/z-index/glow por proximidade do centro
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const center = el.scrollLeft + el.clientWidth / 2;
      cards.current.forEach((c) => {
        if (!c) return;
        const cc = c.offsetLeft + c.offsetWidth / 2;
        const d = Math.abs(cc - center);
        const t = Math.max(0, 1 - d / (c.offsetWidth * 1.15)); // 1 no centro → 0
        const scale = 0.84 + 0.26 * t;
        c.style.transform = `scale(${scale})`;
        c.style.zIndex = String(100 + Math.round(t * 100));
        c.style.opacity = String(0.82 + 0.18 * t);
        c.style.setProperty("--glow", t.toFixed(3));
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // centraliza o 2º card ao montar
    requestAnimationFrame(() => {
      const c = cards.current[1];
      if (c) el.scrollLeft = c.offsetLeft + c.offsetWidth / 2 - el.clientWidth / 2;
      update();
    });
    return () => { el.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const scrollByCard = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const w = (cards.current[0]?.offsetWidth ?? 300) + 16;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={track}
        className="flex gap-4 overflow-x-auto pt-28 pb-6 snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: "none", paddingLeft: "calc(50% - 150px)", paddingRight: "calc(50% - 150px)" }}
      >
        {products.map((p, i) => (
          <a
            ref={(n) => (cards.current[i] = n)}
            key={p.id}
            href={`/catalogo#${p.id}`}
            className="cf-card group shrink-0 w-[300px] relative snap-center origin-bottom will-change-transform"
            style={{ aspectRatio: "547 / 832", transition: "transform .35s cubic-bezier(.22,1,.36,1), opacity .35s ease" }}
          >
            {/* glow difuso atrás do card ativo */}
            <span
              aria-hidden
              className="absolute -inset-[20%] -z-10 rounded-[60px] blur-3xl"
              style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.92), rgba(153,191,23,.35) 55%, rgba(255,255,255,0) 78%)", opacity: "var(--glow,0)" }}
            />

            {/* shape do card (path Batavo) + gradiente radial verde */}
            <svg viewBox="0 0 547 832" preserveAspectRatio="none" className="absolute inset-0 w-full h-full drop-shadow-xl">
              <defs>
                <radialGradient id={`cardgrad-${i}`} cx="50%" cy="30%" r="80%">
                  <stop offset="0%" stopColor="#3f815a" />
                  <stop offset="100%" stopColor="#2c5a3f" />
                </radialGradient>
              </defs>
              <path d={CARD_PATH} fill={`url(#cardgrad-${i})`} />
            </svg>

            {/* produto flutuando pra fora do topo (sem painel) */}
            <img
              src={cutout(p.image)}
              alt={p.name}
              loading="lazy"
              width={520}
              height={650}
              className="absolute left-1/2 -translate-x-1/2 -top-[15%] w-[86%] h-[62%] object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.04]"
            />

            {/* nome + botão no rodapé do card */}
            <div className="absolute inset-x-0 bottom-0 px-6 pb-8 flex flex-col items-center text-center">
              <span className="text-white/60 text-[11px] font-bold uppercase tracking-wide mb-1">{p.category}</span>
              <h3 className="font-display font-extrabold text-white text-lg leading-snug min-h-[2.6em]">{p.name}</h3>
              <span className="mt-4 inline-flex items-center justify-center gap-2 bg-brand-green-ink text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-300 group-hover:gap-3" style={{ transitionTimingFunction: "var(--ease-spring)" }}>
                Ver detalhes
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* setas nuas + bicicleta */}
      <div className="flex items-center justify-center gap-8 mt-2">
        <button onClick={() => scrollByCard(-1)} aria-label="Anterior" className="text-brand-green hover:text-brand-green-deep transition-transform hover:-translate-x-0.5">
          <ChevronLeft className="w-7 h-7" strokeWidth={2.5} />
        </button>
        <svg className="wobble w-14 h-10 text-brand-green" viewBox="0 0 64 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="14" cy="28" r="9" />
          <circle cx="50" cy="28" r="9" />
          <path d="M14 28 L26 28 L38 14 L44 28" />
          <path d="M26 28 L34 14 L26 14" />
          <path d="M38 14 L41 10 L45 10" />
          <path d="M14 28 L20 14 L26 14" />
        </svg>
        <button onClick={() => scrollByCard(1)} aria-label="Próximo" className="text-brand-green hover:text-brand-green-deep transition-transform hover:translate-x-0.5">
          <ChevronRight className="w-7 h-7" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
