import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="sobre" className="py-24 bg-surface-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-3"
          >
            Quem está com a gente
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-6"
          >
            Transformando o viver em viver bem
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg leading-relaxed"
          >
            Nascemos com o propósito de cuidar das famílias por meio da alimentação, levando mais sabor, qualidade e confiança para o seu dia a dia. Com uma infraestrutura de ponta e muito amor pelo que fazemos, garantimos que apenas o melhor chegue à sua mesa.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=1200&auto=format&fit=crop" 
                alt="Processamento de laticínios" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decoração estilo Piracanjuba (círculo com borda concêntrica) */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white rounded-full p-2 shadow-xl">
              <div className="w-full h-full rounded-full border-4 border-brand-orange flex items-center justify-center bg-brand-blue text-white p-4 text-center text-xs font-bold leading-tight">
                Qualidade Certificada
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-brand-dark mb-2">Infraestrutura Moderna</h4>
                <p className="text-gray-600">Fábrica equipada com tecnologia de ponta para garantir o processamento seguro e higiênico de todos os nossos produtos lácteos.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-brand-orange">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-brand-dark mb-2">Produtores Locais</h4>
                <p className="text-gray-600">Trabalhamos em parceria com produtores da nossa região, fomentando a economia local e garantindo frescor diário.</p>
              </div>
            </div>

            <div className="pt-4">
              <a href="#" className="inline-flex items-center text-brand-orange font-bold hover:text-brand-dark transition-colors gap-2">
                Descubra nossa história
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
