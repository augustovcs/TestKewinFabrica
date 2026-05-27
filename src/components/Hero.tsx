import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1920&auto=format&fit=crop" 
          alt="Campo verde com gado leiteiro ao pôr do sol" 
          className="w-full h-full object-cover scale-105"
          loading="eager"
        />
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface-darker/80 via-surface-dark/60 to-brand-navy/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-surface-darker/50 via-transparent to-transparent"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.06, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute -top-[20%] -right-[15%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full border-[60px] border-white"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.04, scale: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
          className="absolute -bottom-[30%] -left-[20%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full border-[40px] border-brand-orange"
        />
        {/* Floating dots */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[15%] w-3 h-3 rounded-full bg-brand-orange/40"
        />
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[30%] left-[10%] w-2 h-2 rounded-full bg-white/30"
        />
        <motion.div
          animate={{ y: [-5, 15, -5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] left-[30%] w-1.5 h-1.5 rounded-full bg-brand-blue-light/30"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-white lg:col-span-7"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/10 backdrop-blur-md text-sm font-medium mb-8 border border-white/20"
            >
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
              <span className="text-white/90">Desde 1999 • Vitória da Conquista — BA</span>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] mb-8 tracking-tight">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="block text-white"
              >
                Do campo
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="block text-white"
              >
                para sua
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="block shimmer-text"
              >
                mesa.
              </motion.span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-lg md:text-xl text-white/70 mb-10 max-w-xl leading-relaxed font-light"
            >
              Alimentando famílias com qualidade, confiança e o verdadeiro sabor do leite. Uma tradição que se renova a cada dia.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#produtos" 
                className="bg-brand-orange text-white px-8 py-4 rounded-full font-bold shadow-[0_8px_30px_rgba(255,145,0,0.4)] hover:shadow-[0_12px_40px_rgba(255,145,0,0.6)] transition-shadow duration-300 text-sm uppercase tracking-wider"
              >
                Nossos Produtos
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#sobre" 
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all duration-300 text-sm uppercase tracking-wider"
              >
                Conheça a Fábrica
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Right Side - Floating Stats Card */}
          <motion.div 
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex lg:col-span-5 justify-center"
          >
            <div className="relative">
              {/* Main floating card */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="glass rounded-3xl p-8 max-w-sm shadow-2xl shadow-black/20"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-orange/20 flex items-center justify-center">
                      <svg className="w-7 h-7 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="text-3xl font-extrabold text-white">50k+</div>
                      <div className="text-white/50 text-sm font-medium">Litros/dia processados</div>
                    </div>
                  </div>
                  
                  <div className="h-px bg-white/10"></div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-blue/20 flex items-center justify-center">
                      <svg className="w-7 h-7 text-brand-blue-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="text-3xl font-extrabold text-white">100k+</div>
                      <div className="text-white/50 text-sm font-medium">Famílias atendidas</div>
                    </div>
                  </div>
                  
                  <div className="h-px bg-white/10"></div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-conquista-green/20 flex items-center justify-center">
                      <svg className="w-7 h-7 text-conquista-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="text-3xl font-extrabold text-white">25+</div>
                      <div className="text-white/50 text-sm font-medium">Anos de qualidade</div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Small floating badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, y: [-3, 8, -3] }}
                transition={{ 
                  scale: { delay: 1.5, duration: 0.5, type: "spring" },
                  y: { delay: 2, duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -bottom-6 -left-8 bg-brand-orange text-white p-4 rounded-2xl shadow-xl shadow-brand-orange/30"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="font-bold text-sm whitespace-nowrap">SIF Certificado</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs uppercase tracking-widest font-medium">Conheça</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
