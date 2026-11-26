import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products as all } from "../data/products";

// novidades: iogurtes novos, nessa ordem
const NEW_IDS = ["iogurte-morango-zero", "iogurte-morango", "iogurte-ameixa", "iogurte-salada-frutas"];
const products = [
  ...NEW_IDS.map((id) => all.find((p) => p.id === id)!),
  ...all.filter((p) => !NEW_IDS.includes(p.id)),
];

// abaixo desse deslocamento o gesto conta como clique, não como arrasto
const DRAG_SLOP = 6;
const SPEED = 70; // esteira: px por segundo no mobile, sem parar
const SPEED_DESKTOP = 130; // tela larga mostra mais cards, então anda mais rápido
// 2 cópias da lista → quando a 1ª sai inteira pela esquerda, volta uma volta sem emenda visível
const loop = [...products, ...products];

// Shape do card (Batavo): rounded-rect com degrau no canto inferior direito
const CARD_PATH =
  "M547 24C547 10.7452 536.255 0 523 0H24C10.7452 0 0 10.7452 0 24V808C0 821.255 10.7452 832 24 832H376C385.952 832 396 824 398 811C431.142 811 489.5 811 521.5 811C541 811 547 797.5 547 787V24Z";

export default function ProductShowcase() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLAnchorElement | null)[]>([]);
  const x = useRef<number | null>(null); // posição atual do track (px)
  const target = useRef<number | null>(null); // destino das setas (anima até lá)
  const drag = useRef<{ startX: number; base: number } | null>(null);
  const dragged = useRef(false); // arrastou? então o clique no card não navega
  const hover = useRef(false); // mouse em cima de um card pausa a esteira

  // medidas: passo entre cards, largura de uma volta e x que centraliza o card 0
  const metrics = () => {
    const w = wrap.current, c0 = cards.current[0], c1 = cards.current[1];
    if (!w || !c0 || !c1) return null;
    const step = c1.offsetLeft - c0.offsetLeft;
    return { step, lap: step * products.length, zero: w.clientWidth / 2 - (c0.offsetLeft + c0.offsetWidth / 2) };
  };

  useEffect(() => {
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = matchMedia("(min-width: 1024px)");
    let raf = 0, last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      const m = metrics(), tk = track.current;
      if (m && tk) {
        if (x.current === null) x.current = m.zero;
        if (!drag.current) {
          if (target.current !== null) {
            x.current += (target.current - x.current) * Math.min(1, dt * 8);
            if (Math.abs(target.current - x.current) < 0.5) target.current = null;
          } else if (!hover.current && !still) x.current -= (wide.matches ? SPEED_DESKTOP : SPEED) * dt;
        }
        // mantém x dentro de uma volta (o salto é invisível porque a 2ª cópia é idêntica)
        const shift = x.current > m.zero ? -m.lap : x.current < m.zero - m.lap ? m.lap : 0;
        if (shift) {
          x.current += shift;
          if (target.current !== null) target.current += shift;
          if (drag.current) drag.current.base += shift;
        }
        tk.style.transform = `translateX(${x.current}px)`;
        // escala/brilho pela distância ao centro, medida em cards
        const center = wrap.current!.clientWidth / 2 - x.current;
        cards.current.forEach((c) => {
          if (!c) return;
          const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center) / m.step;
          const t = Math.max(0, 1 - d * 0.55);
          c.style.setProperty("--scale", String(0.84 + 0.26 * t));
          c.style.zIndex = String(100 - Math.round(d * 10));
          c.style.opacity = String(0.82 + 0.18 * t);
          c.style.setProperty("--glow", String(Math.max(0, 1 - d * 2)));
        });
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  // setas: vai pro card vizinho do que está mais perto do centro
  const go = (dir: number) => {
    const m = metrics();
    if (!m || x.current === null) return;
    const i = Math.round((m.zero - (target.current ?? x.current)) / m.step) + dir;
    target.current = m.zero - i * m.step;
  };

  // --- arrastar para o lado (Pointer Events nativos, sem lib de carrossel) ---
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    target.current = null;
    drag.current = { startX: e.clientX, base: x.current ?? 0 };
    dragged.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > DRAG_SLOP) dragged.current = true;
    x.current = d.base + dx;
  };

  // soltou: a esteira continua dali mesmo
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div>
      {/* wrapper corta só na horizontal; vertical transborda (produtos flutuantes sem corte) */}
      <div
        ref={wrap}
        className="overflow-x-clip pt-12 lg:pt-28 pb-6 cursor-grab active:cursor-grabbing select-none touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div ref={track} className="flex gap-4 will-change-transform">
          {loop.map((p, i) => (
            <a
              ref={(n) => { cards.current[i] = n; }}
              key={`${p.id}-${i}`}
              aria-hidden={i >= products.length || undefined}
              tabIndex={i >= products.length ? -1 : undefined}
              href={`/catalogo#${p.id}`}
              draggable={false}
              onClick={(e) => { if (dragged.current) e.preventDefault(); }}
              onPointerEnter={(e) => { if (e.pointerType === "mouse") hover.current = true; }}
              onPointerLeave={() => { hover.current = false; }}
              className="cf-card group shrink-0 w-[300px] relative origin-bottom will-change-transform hover:[--lift:-14px]"
              style={{
                aspectRatio: "547 / 832",
                transform: "translateY(var(--lift, 0px)) scale(var(--scale, 1))",
                transition: "transform .15s linear", // curta: a escala muda a cada frame
              }}
            >
              {/* glow difuso atrás do card ativo */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-[20%] -z-10 rounded-[60px] blur-3xl"
                style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.92), rgba(153,191,23,.35) 55%, rgba(255,255,255,0) 78%)", opacity: "var(--glow,0)" }}
              />

              {/* shape do card (path Batavo) + gradiente radial verde */}
              <svg viewBox="0 0 547 832" preserveAspectRatio="none" className="absolute inset-0 w-full h-full drop-shadow-xl transition duration-500 group-hover:drop-shadow-2xl group-hover:brightness-110">
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
                className="absolute left-1/2 -translate-x-1/2 -top-[6%] lg:-top-[15%] w-[86%] h-[62%] object-contain object-bottom drop-shadow-[0_18px_24px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.04]"
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
