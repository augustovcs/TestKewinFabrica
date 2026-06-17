import { motion } from "framer-motion";

const stats = [
  { value: "25+", label: "anos de estrada" },
  { value: "50k", label: "litros por dia" },
  { value: "100k", label: "famílias atendidas" },
];

const ease = [0.22, 1, 0.36, 1] as const;

// Orquestração da abertura
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Hero() {
  return (
    <section className="relative w-full min-h-[94vh] flex items-center overflow-hidden bg-night grain">
      {/* Camada base: imagem */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease }}
          src="https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1920&auto=format&fit=crop"
          alt="Pasto verde com gado leiteiro ao amanhecer"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Gradiente verde dominante */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green-ink via-brand-green-ink/85 to-brand-green-deep/40" />
      </div>

      {/* Atmosfera: luzes (gradiente como luz/névoa) */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute -top-32 -left-24 w-[42rem] h-[42rem] rounded-full bg-brand-lime/20 blur-[120px]" />
        <div className="absolute bottom-[-10rem] right-[-6rem] w-[36rem] h-[36rem] rounded-full bg-brand-pink/25 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 w-full pt-28 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Copy */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 text-white"
          >
            <motion.span
              variants={rise}
              className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-lime-300 mb-7"
            >
              <span className="w-7 h-[3px] bg-brand-pink" />
              Desde 1999 · Vitória da Conquista, BA
            </motion.span>

            <h1 className="font-display font-extrabold leading-[0.92] tracking-tight text-[3.25rem] sm:text-7xl lg:text-[5.5rem] text-white mb-7">
              <motion.span variants={rise} className="block">Do campo</motion.span>
              <motion.span variants={rise} className="block">para a sua</motion.span>
              <motion.span variants={rise} className="block text-brand-pink">mesa.</motion.span>
            </h1>

            <motion.p
              variants={rise}
              className="text-lg text-white/75 max-w-xl mb-9 leading-relaxed"
            >
              Leite e derivados feitos com cuidado de quem conhece cada produtor
              da região. Qualidade que se renova todos os dias — há mais de duas
              décadas.
            </motion.p>

            <motion.div variants={rise} className="flex flex-wrap gap-3">
              <a href="/catalogo" className="btn-accent">Ver catálogo</a>
              <a href="/sobre" className="btn-ghost-light">Conhecer a empresa</a>
            </motion.div>
          </motion.div>

          {/* Trust card — squared */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.6 }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="float-slow bg-white border border-white/10 p-7 max-w-sm ml-auto shadow-2xl shadow-black/40">
              <div className="flex items-center gap-2 text-brand-green mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-sm font-bold uppercase tracking-wide">Inspeção Federal · SIF</span>
              </div>
              <div className="divide-y divide-line">
                {stats.map((s) => (
                  <div key={s.label} className="flex items-baseline justify-between py-4 first:pt-0 last:pb-0">
                    <span className="font-display text-3xl font-extrabold text-ink">{s.value}</span>
                    <span className="text-muted text-sm">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
