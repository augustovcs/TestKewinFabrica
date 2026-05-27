import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-blue to-brand-dark pt-20">
      {/* Decorative Circles inspired by Conleite Identity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-[20%] -right-[10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full border-[40px] border-white"
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute -top-[10%] -right-[5%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full border-[20px] border-brand-orange"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-2xl"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md text-sm font-semibold mb-6 border border-white/30 uppercase tracking-wider"
            >
              Desde 1999 • Tradição e Qualidade
            </motion.span>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Para sua <span className="text-brand-orange">mesa</span>,<br />
              para sua <span className="text-brand-orange">vida</span>.
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg">
              Levando o melhor sabor do campo para milhares de famílias. Qualidade que você sente em cada gota.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#produtos" 
                className="bg-brand-orange text-white px-8 py-4 rounded-full font-bold shadow-[0_8px_20px_rgba(255,145,0,0.4)] transition-shadow hover:shadow-[0_12px_25px_rgba(255,145,0,0.6)]"
              >
                Nossos Produtos
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#sobre" 
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-colors"
              >
                Conheça a Fábrica
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative h-[500px]"
          >
            {/* Imagem Placeholder de Leite/Fazenda */}
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl shadow-brand-dark/50 border-4 border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1200&auto=format&fit=crop" 
                alt="Fazenda leiteira" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent"></div>
            </div>
            
            {/* Card flutuante */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-[200px]"
            >
              <div className="text-brand-orange font-bold text-3xl mb-1">+20</div>
              <div className="text-gray-600 text-sm font-medium leading-tight">Anos de história e compromisso</div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
