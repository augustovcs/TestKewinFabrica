import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
      </svg>
    ),
    title: "Infraestrutura Moderna",
    description: "Fábrica equipada com tecnologia de última geração, garantindo o processamento seguro e higiênico de todos os nossos produtos.",
    color: "bg-brand-blue/10 text-brand-blue",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
    title: "Produtores Locais",
    description: "Parceria direta com produtores da nossa região, fomentando a economia local e garantindo frescor diário em cada entrega.",
    color: "bg-conquista-green/10 text-conquista-green",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
      </svg>
    ),
    title: "Qualidade Certificada",
    description: "Rigorosos padrões de qualidade com inspeção federal (SIF) e laboratório próprio para testes diários.",
    color: "bg-brand-orange/10 text-brand-orange",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function About() {
  return (
    <section id="sobre" className="py-28 bg-white relative overflow-hidden">
      {/* Subtle decorative background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-blue/[0.03] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-orange/[0.03] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-brand-blue/5 text-brand-blue text-sm font-semibold mb-6 border border-brand-blue/10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue"></span>
            QUEM SOMOS
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-surface-dark mb-6 leading-tight"
          >
            Transformando o{" "}
            <span className="text-brand-blue">viver</span>{" "}
            em viver{" "}
            <span className="text-brand-orange">bem</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Nascemos com o propósito de cuidar das famílias por meio da alimentação. Com uma infraestrutura de ponta e muito amor pelo que fazemos, garantimos que apenas o melhor chegue à sua mesa.
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-brand-blue/10 relative">
                <img 
                  src="https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=1200&auto=format&fit=crop" 
                  alt="Processamento de laticínios na fábrica Conleite" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/30 to-transparent"></div>
              </div>
              
              {/* Smaller overlapping image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-8 -right-8 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden md:block"
              >
                <img 
                  src="https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=400&auto=format&fit=crop" 
                  alt="Leite fresco" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Experience badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                className="absolute -top-6 -left-6 bg-brand-orange text-white w-28 h-28 rounded-2xl shadow-xl shadow-brand-orange/30 flex flex-col items-center justify-center hidden md:flex"
              >
                <span className="text-4xl font-extrabold leading-none">25</span>
                <span className="text-xs font-semibold uppercase tracking-wider opacity-90">anos</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Features Side */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex gap-5 p-6 rounded-2xl hover:bg-surface-light transition-colors duration-300 group cursor-default"
              >
                <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-surface-dark mb-2 group-hover:text-brand-blue transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div variants={itemVariants} className="pt-4 pl-6">
              <motion.a 
                whileHover={{ x: 8 }}
                href="#numeros" 
                className="inline-flex items-center text-brand-orange font-bold hover:text-brand-orange-dark transition-colors gap-3 group text-lg"
              >
                Descubra nossa história
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
