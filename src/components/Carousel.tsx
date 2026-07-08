import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Hero = banner carousel (banners reais). Seção termina em onda.
const banners = [
  { src: "/banners/banner-04.webp", alt: "Laticínios Conquista — do campo para a sua mesa" },
  { src: "/banners/banner-06.webp", alt: "Qualidade que se põe à mesa — Laticínios Conquista" },
  { src: "/banners/banner-05.webp", alt: "Produtos Laticínios Conquista" },
  { src: "/banners/banner-03.webp", alt: "Família no café da manhã com Laticínios Conquista" },
  { src: "/banners/banner-02.webp", alt: "Laticínios Conquista" },
];

const AUTOPLAY = 5000;

export default function Carousel() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const paused = useRef(false);

  const go = useCallback((next: number, d: number) => {
    setDir(d);
    setI((next + banners.length) % banners.length);
  }, []);
  const prev = useCallback(() => go(i - 1, -1), [go, i]);
  const next = useCallback(() => go(i + 1, 1), [go, i]);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => { if (!paused.current) setI((p) => (p + 1) % banners.length); }, AUTOPLAY);
    return () => clearInterval(t);
  }, [reduce]);

  // swipe
  const startX = useRef<number | null>(null);
  const onDown = (e: React.PointerEvent) => { startX.current = e.clientX; };
  const onUp = (e: React.PointerEvent) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next() : prev());
    startX.current = null;
  };

  return (
    <section
      className="relative overflow-hidden bg-white pt-[68px] select-none"
      aria-roledescription="carousel"
      aria-label="Banners Laticínios Conquista"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onPointerDown={onDown}
      onPointerUp={onUp}
    >
      {/* Banner — a onda branca fica POR CIMA, sobrepondo a imagem */}
      <div className="relative w-full h-[340px] sm:h-[490px] lg:h-[620px] overflow-hidden bg-white">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={i}
            src={banners[i].src}
            alt={banners[i].alt}
            width={1920}
            height={672}
            loading="eager"
            initial={{ opacity: 0, x: reduce ? 0 : dir * 60, scale: 1.03 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: reduce ? 0 : dir * -60, scale: 1.03 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Setas */}
        <button onClick={prev} aria-label="Banner anterior"
          className="absolute z-20 left-2 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/30 hover:bg-white/55 backdrop-blur text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={next} aria-label="Próximo banner"
          className="absolute z-20 right-2 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/30 hover:bg-white/55 backdrop-blur text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95">
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Onda animada branca SOBREPONDO o banner (só corta um pouco embaixo) */}
        <div className="wave-hero absolute z-20 left-0 right-0 bottom-[-1px] h-[42px] sm:h-[60px] overflow-hidden leading-[0] pointer-events-none">
          <svg className="wave-hero-svg absolute inset-0 w-[200%] h-full" viewBox="0 0 2880 90" preserveAspectRatio="none" aria-hidden>
            <path fill="#ffffff" d="M0,48 q180,34 360,0 t360,0 t360,0 t360,0 t360,0 t360,0 t360,0 t360,0 L2880,90 L0,90 Z" />
          </svg>
        </div>
      </div>
    </section>
  );
}
