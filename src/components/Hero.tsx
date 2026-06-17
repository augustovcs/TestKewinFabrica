import { motion } from "framer-motion";

const stats = [
  { value: "25+", label: "anos de estrada" },
  { value: "50k", label: "litros por dia" },
  { value: "100k", label: "famílias atendidas" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative w-full min-h-[92vh] flex items-center overflow-hidden bg-night">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1920&auto=format&fit=crop"
          alt="Pasto verde com gado leiteiro ao amanhecer"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/70 to-night/40" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Copy */}
          <div className="lg:col-span-7 text-white">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 ring-1 ring-white/20 text-sm font-medium text-white/90 mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              Desde 1999 · Vitória da Conquista, BA
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.05 }}
              className="font-display font-bold leading-[0.98] tracking-tight text-5xl sm:text-6xl lg:text-7xl mb-6 text-white"
            >
              Do campo para
              <br />a sua <span className="text-brand-orange">mesa</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.15 }}
              className="text-lg text-white/75 max-w-xl mb-9 leading-relaxed"
            >
              Leite e derivados feitos com cuidado de quem conhece cada produtor
              da região. Qualidade que se renova todos os dias — há mais de duas
              décadas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.25 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="/catalogo"
                className="bg-brand-orange text-white px-7 py-3.5 rounded-full font-semibold hover:bg-brand-orange-dark transition-colors"
              >
                Ver catálogo
              </a>
              <a
                href="/sobre"
                className="bg-white/10 ring-1 ring-white/25 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/20 transition-colors"
              >
                Conheça a empresa
              </a>
            </motion.div>
          </div>

          {/* Trust card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="float-slow bg-white rounded-3xl p-7 shadow-2xl shadow-black/30 max-w-sm ml-auto">
              <div className="flex items-center gap-2 text-brand-blue mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-sm font-semibold uppercase tracking-wide">Inspeção Federal · SIF</span>
              </div>
              <div className="space-y-5">
                {stats.map((s, i) => (
                  <div key={s.label}>
                    <div className="flex items-baseline justify-between">
                      <span className="font-display text-3xl font-bold text-ink">{s.value}</span>
                      <span className="text-muted text-sm">{s.label}</span>
                    </div>
                    {i < stats.length - 1 && <div className="h-px bg-line mt-5" />}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Signature: single milk wave */}
      <div className="wave wave-bottom">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,64 C240,16 480,16 600,52 C760,100 980,108 1200,56 L1200,120 L0,120 Z" fill="#FFFFFF" />
        </svg>
      </div>
    </section>
  );
}
