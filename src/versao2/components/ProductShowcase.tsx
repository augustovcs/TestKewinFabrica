import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "../data/products";

const EASE = "transform .45s cubic-bezier(.22,1,.36,1)";
// abaixo desse deslocamento o gesto conta como clique, não como arrasto
const DRAG_SLOP = 6;

// Shape do card (Batavo): rounded-rect com degrau no canto inferior direito
const CARD_PATH =
  "M547 24C547 10.7452 536.255 0 523 0H24C10.7452 0 0 10.7452 0 24V808C0 821.255 10.7452 832 24 832H376C385.952 832 396 824 398 811C431.142 811 489.5 811 521.5 811C541 811 547 797.5 547 787V24Z";

export default function ProductShowcase() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLAnchorElement | null)[]>([]);
  const [index, setIndex] = useState(1); // começa no 2º card
  const [paused, setPaused] = useState(false);
  const drag = useRef<{ startX: number; base: number; dx: number } | null>(null);
  const dragged = useRef(false); // arrastou? então o clique no card não navega

  // deslocamento do track que deixa o card `i` centralizado
  const offsetFor = useCallback((i: number) => {
    const w = wrap.current, a = cards.current[i], first = cards.current[0];
    if (!w || !a || !first) return 0;
    return w.clientWidth / 2 - (a.offsetLeft - first.offsetLeft + a.offsetWidth / 2);
  }, []);

  // Carrossel por transform (SEM scroll → nada corta os produtos que transbordam).
  // A escala vai numa CSS var p/ o hover poder somar um --lift por cima.
  useEffect(() => {
    const layout = () => {
      const w = wrap.current, tk = track.current, a = cards.current[index], first = cards.current[0];
      if (!w || !tk || !a || !first) return;
      // centro do card ativo relativo ao INÍCIO do track (diferença cancela o offsetParent)
      const activeCenter = a.offsetLeft - first.offsetLeft + a.offsetWidth / 2;
      tk.style.transition = EASE; // o arrasto zera a transição; aqui ela volta
      tk.style.transform = `translateX(${w.clientWidth / 2 - activeCenter}px)`;
      cards.current.forEach((c, i) => {
        if (!c) return;
        const t = Math.max(0, 1 - Math.abs(i - index) * 0.55);
        c.style.setProperty("--scale", String(0.84 + 0.26 * t));
        c.style.zIndex = String(100 - Math.abs(i - index));
        c.style.opacity = String(0.82 + 0.18 * t);
        c.style.setProperty("--glow", i === index ? "1" : "0");
      });
    };
    // 1º layout após o paint (garante offsetLeft/Width já medidos)
    const raf = requestAnimationFrame(layout);
    window.addEventListener("resize", layout);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", layout); };
  }, [index]);

  // Autoplay com loop (pausa no hover e respeita prefers-reduced-motion).
  // `index` nas deps reinicia a contagem a cada troca — inclusive nas manuais,
  // senão o autoplay podia avançar logo depois de um clique na seta.
  useEffect(() => {
    if (paused) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % products.length), 3200);
    return () => clearTimeout(id);
  }, [paused, index]);

  const go = (d: number) => setIndex((i) => (i + d + products.length) % products.length);

  // --- arrastar para o lado (Pointer Events nativos, sem lib de carrossel) ---
  const settle = () => {
    const tk = track.current;
    if (!tk) return;
    tk.style.transition = EASE;
    tk.style.transform = `translateX(${offsetFor(index)}px)`;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { startX: e.clientX, base: offsetFor(index), dx: 0 };
    dragged.current = false;
    setPaused(true); // não deixa o autoplay puxar o track no meio do gesto
    e.currentTarget.setPointerCapture(e.pointerId);
    if (track.current) track.current.style.transition = "none";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current, tk = track.current;
    if (!d || !tk) return;
    d.dx = e.clientX - d.startX;
    if (Math.abs(d.dx) > DRAG_SLOP) dragged.current = true;
    tk.style.transform = `translateX(${d.base + d.dx}px)`;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current, w = wrap.current, first = cards.current[0];
    drag.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    if (!d || !w || !first) return;
    // encaixa no card mais próximo do centro na posição em que soltou
    const center = w.clientWidth / 2 - (d.base + d.dx);
    let nearest = index, best = Infinity;
    cards.current.forEach((c, i) => {
      if (!c) return;
      const dist = Math.abs(c.offsetLeft - first.offsetLeft + c.offsetWidth / 2 - center);
      if (dist < best) { best = dist; nearest = i; }
    });
    // se o índice não muda o efeito não roda, então recoloca no lugar aqui
    if (nearest === index) settle();
    else setIndex(nearest);
    // no mouse quem despausa é o onMouseLeave; em toque/caneta não há esse evento
    if (e.pointerType !== "mouse") setPaused(false);
  };

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* wrapper corta só na horizontal; vertical transborda (produtos flutuantes sem corte) */}
      <div
        ref={wrap}
        className="overflow-x-clip pt-28 pb-6 cursor-grab active:cursor-grabbing select-none touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div ref={track} className="flex gap-4 will-change-transform" style={{ transition: EASE }}>
          {products.map((p, i) => (
            <a
              ref={(n) => { cards.current[i] = n; }}
              key={p.id}
              href={`/versao2/catalogo#${p.id}`}
              draggable={false}
              onClick={(e) => { if (dragged.current) e.preventDefault(); }}
              className="cf-card group shrink-0 w-[320px] relative origin-bottom will-change-transform hover:[--lift:-14px]"
              style={{
                aspectRatio: "547 / 832",
                transform: "translateY(var(--lift, 0px)) scale(var(--scale, 1))",
                transition: "transform .45s cubic-bezier(.22,1,.36,1), opacity .45s ease",
              }}
            >
              {/* glow difuso atrás do card ativo */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-[20%] -z-10 rounded-[60px] blur-3xl"
                style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.92), rgba(153,191,23,.35) 55%, rgba(255,255,255,0) 78%)", opacity: "var(--glow,0)" }}
              />

              {/* shape do card (path Batavo) + gradiente radial verde */}
              <svg viewBox="0 0 547 832" preserveAspectRatio="none" className="absolute inset-0 w-full h-full drop-shadow-xl transition-[filter] duration-500 group-hover:drop-shadow-2xl">
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
                src={p.image}
                alt={p.name}
                loading="lazy"
                draggable={false}
                width={520}
                height={650}
                className="absolute left-1/2 -translate-x-1/2 -top-[15%] w-[86%] h-[62%] object-contain object-bottom drop-shadow-[0_18px_24px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.04]"
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
      </div>

      {/* setas nuas + bicicleta */}
      <div className="flex items-center justify-center gap-8 mt-2">
        <button onClick={() => go(-1)} aria-label="Anterior" className="text-brand-green hover:text-brand-green-deep transition-transform hover:-translate-x-0.5">
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
        <button onClick={() => go(1)} aria-label="Próximo" className="text-brand-green hover:text-brand-green-deep transition-transform hover:translate-x-0.5">
          <ChevronRight className="w-7 h-7" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
