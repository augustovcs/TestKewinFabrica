import { motion } from "framer-motion";
import { whatsappLink } from "../data/site";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};
const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Hero() {
  const wa = whatsappLink();
  return (
    <section className="relative overflow-hidden bg-brand-green-ink grain pt-[68px]">
      {/* Glows atmosféricos */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-32 -left-24 w-[40rem] h-[40rem] rounded-full bg-brand-lime/15 blur-[120px]" />
        <div className="absolute bottom-[-12rem] right-[-6rem] w-[34rem] h-[34rem] rounded-full bg-brand-pink/15 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center py-16 lg:py-24">
          {/* Copy */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-6 text-white"
          >
            <motion.span
              variants={rise}
              className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-lime mb-6"
            >
              <span className="w-7 h-[3px] rounded-full bg-brand-pink" />
              Vitória da Conquista · Bahia
            </motion.span>

            <h1 className="font-display font-extrabold leading-[0.95] tracking-tight text-[2.9rem] sm:text-6xl lg:text-[4.4rem] text-white mb-6">
              <motion.span variants={rise} className="block">Do campo</motion.span>
              <motion.span variants={rise} className="block">para a sua</motion.span>
              <motion.span variants={rise} className="block text-brand-lime">mesa.</motion.span>
            </h1>

            <motion.p
              variants={rise}
              className="text-lg text-white/75 max-w-lg mb-8 leading-relaxed"
            >
              Leite, bebida láctea, iogurte e manteiga produzidos com cuidado em
              Vitória da Conquista. A qualidade da{" "}
              <strong className="text-white font-semibold">Laticínios Conquista</strong>{" "}
              na rotina da família baiana.
            </motion.p>

            <motion.div variants={rise} className="flex flex-wrap gap-3">
              <a href="/catalogo" className="btn-lime">Ver catálogo</a>
              <a href={wa} target="_blank" rel="noopener" className="btn-ghost-light">
                Falar no WhatsApp
              </a>
            </motion.div>

            <motion.div variants={rise} className="flex flex-wrap items-center gap-x-7 gap-y-3 mt-10 text-white/65 text-sm">
              <span className="inline-flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Inspeção Federal
              </span>
              <span className="inline-flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Indústria Brasileira
              </span>
              <span className="inline-flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                Produção regional
              </span>
            </motion.div>
          </motion.div>

          {/* Imagem lifestyle (banner real, sem texto sobreposto) */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.4 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-[20px] overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-white/10">
              <img
                src="/banners/banner-04.webp"
                alt="Mãe e filha tomando Leite Conquista no café da manhã"
                width="1920"
                height="672"
                className="w-full h-[300px] sm:h-[380px] lg:h-[460px] object-cover object-center"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green-ink/30 to-transparent" />
            </div>

            {/* Selo flutuante */}
            <div className="float-slow absolute -bottom-5 -left-3 sm:left-5 bg-white rounded-[14px] shadow-xl px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-green-tint flex items-center justify-center text-brand-green">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="leading-tight">
                <div className="font-display font-extrabold text-ink text-sm">Leite Conquista</div>
                <div className="text-muted text-xs">campeão na rotina da família</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider para a próxima seção (branca) */}
      <div className="relative z-10 -mb-px">
        <svg viewBox="0 0 1440 90" className="w-full h-[60px] sm:h-[90px]" preserveAspectRatio="none" aria-hidden="true">
          <path fill="#ffffff" d="M0,40 C240,90 480,90 720,60 C960,30 1200,10 1440,45 L1440,90 L0,90 Z" />
        </svg>
      </div>
    </section>
  );
}
