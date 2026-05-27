import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    id: 1,
    brand: "Conleite",
    name: "Leite UHT Integral",
    description: "O sabor clássico da fazenda, com 3% de gordura, vitaminas essenciais e o máximo de nutrição para toda sua família. Puro, fresco e delicioso.",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=800&auto=format&fit=crop",
    gradient: "from-brand-blue to-brand-navy",
    accentColor: "text-brand-blue",
    bgAccent: "bg-brand-blue",
  },
  {
    id: 2,
    brand: "Conleite",
    name: "Leite UHT Desnatado",
    description: "A leveza que você precisa no dia a dia, com 0% de gordura, mantendo todo o cálcio e os benefícios do leite. Ideal para quem busca equilíbrio.",
    image: "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?q=80&w=800&auto=format&fit=crop",
    gradient: "from-sky-400 to-brand-blue",
    accentColor: "text-sky-500",
    bgAccent: "bg-sky-400",
  },
  {
    id: 3,
    brand: "Laticínios Conquista",
    name: "Iogurte Morango",
    description: "Cremoso, saboroso e com pedaços de fruta de verdade. O lanche perfeito para qualquer hora do seu dia. Sabor que conquista.",
    image: "https://images.unsplash.com/photo-1550974917-29007c082725?q=80&w=800&auto=format&fit=crop",
    gradient: "from-conquista-pink to-rose-700",
    accentColor: "text-conquista-pink",
    bgAccent: "bg-conquista-pink",
  },
  {
    id: 4,
    brand: "Laticínios Conquista",
    name: "Bebida Láctea",
    description: "Energia e sabor em uma embalagem prática, perfeita para a lancheira das crianças ou uma pausa revigorante no trabalho.",
    image: "https://images.unsplash.com/photo-1615484476693-02f43db5fc82?q=80&w=800&auto=format&fit=crop",
    gradient: "from-conquista-green to-emerald-700",
    accentColor: "text-conquista-green",
    bgAccent: "bg-conquista-green",
  }
];

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };
  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const current = products[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section id="produtos" className="py-28 bg-surface-light relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-brand-orange/5 text-brand-orange text-sm font-semibold mb-6 border border-brand-orange/10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
              NOSSOS PRODUTOS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-surface-dark leading-tight"
            >
              Qualidade em cada<br />
              <span className="text-brand-orange">detalhe</span>
            </motion.h2>
          </div>
          
          {/* Navigation Controls */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mt-8 md:mt-0"
          >
            <button 
              onClick={prev} 
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:border-brand-orange hover:text-brand-orange hover:shadow-lg hover:shadow-brand-orange/10 transition-all duration-300 hover:-translate-y-0.5"
              aria-label="Produto anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={next} 
              className="w-12 h-12 rounded-full bg-brand-orange text-white flex items-center justify-center hover:bg-brand-orange-dark hover:shadow-lg hover:shadow-brand-orange/30 transition-all duration-300 hover:-translate-y-0.5"
              aria-label="Próximo produto"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="text-gray-400 text-sm font-medium ml-2">
              {String(currentIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
            </span>
          </motion.div>
        </div>

        {/* Carousel Content */}
        <div className="relative min-h-[500px] md:min-h-[450px] w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-black/5 h-full">
                
                {/* Text Content */}
                <div className="order-2 md:order-1 flex flex-col justify-center p-8 md:p-12 lg:p-16">
                  <span className={`inline-block py-1.5 px-4 rounded-full text-xs font-bold mb-6 w-fit text-white ${current.bgAccent}`}>
                    {current.brand}
                  </span>
                  <h3 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight ${current.accentColor}`}>
                    {current.name}
                  </h3>
                  <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-md">
                    {current.description}
                  </p>
                  <a href="#" className="inline-flex items-center font-bold text-surface-dark hover:text-brand-orange transition-colors group text-sm uppercase tracking-wider">
                    Ver detalhes 
                    <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                  </a>
                </div>
                
                {/* Image */}
                <div className="order-1 md:order-2 relative h-[280px] md:h-full overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${current.gradient} opacity-20`}></div>
                  <img 
                    src={current.image} 
                    alt={current.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:bg-gradient-to-l"></div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Dots */}
        <div className="mt-10 flex items-center justify-center gap-3">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`transition-all duration-500 rounded-full ${
                idx === currentIndex 
                  ? 'w-10 h-3 bg-brand-orange' 
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir para produto ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
