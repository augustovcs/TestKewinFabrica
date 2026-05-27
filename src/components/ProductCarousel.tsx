import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    id: 1,
    brand: "Conleite",
    name: "Leite UHT Integral",
    description: "O sabor clássico da fazenda, com 3% de gordura, vitaminas essenciais e o máximo de nutrição para sua família.",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=800&auto=format&fit=crop",
    color: "bg-brand-blue",
    textColor: "text-brand-blue"
  },
  {
    id: 2,
    brand: "Conleite",
    name: "Leite UHT Desnatado",
    description: "A leveza que você precisa no dia a dia, com 0% de gordura, mantendo todo o cálcio e os benefícios do leite.",
    image: "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?q=80&w=800&auto=format&fit=crop",
    color: "bg-sky-400",
    textColor: "text-sky-500"
  },
  {
    id: 3,
    brand: "Laticínios Conquista",
    name: "Iogurte Morango",
    description: "Cremoso, saboroso e com pedaços de fruta. O lanche perfeito para qualquer hora do seu dia.",
    image: "https://images.unsplash.com/photo-1550974917-29007c082725?q=80&w=800&auto=format&fit=crop",
    color: "bg-conquista-pink",
    textColor: "text-conquista-pink"
  },
  {
    id: 4,
    brand: "Laticínios Conquista",
    name: "Bebida Láctea",
    description: "Energia e sabor em uma embalagem prática, perfeita para a lancheira das crianças ou uma pausa no trabalho.",
    image: "https://images.unsplash.com/photo-1615484476693-02f43db5fc82?q=80&w=800&auto=format&fit=crop",
    color: "bg-conquista-green",
    textColor: "text-conquista-green"
  }
];

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % products.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

  return (
    <section id="produtos" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-3">Conheça nossos produtos</h2>
            <h3 className="text-4xl font-extrabold text-brand-dark">Qualidade em cada detalhe</h3>
          </div>
          <div className="flex gap-4 mt-6 md:mt-0">
            <button onClick={prev} className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-brand-orange hover:text-brand-orange transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={next} className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-brand-orange hover:text-brand-orange transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Carousel Content */}
        <div className="relative h-[500px] md:h-[450px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-50 rounded-[2.5rem] p-8 md:p-12"
            >
              <div className="order-2 md:order-1 flex flex-col justify-center h-full">
                <span className={`inline-block py-1 px-3 rounded-full text-xs font-bold mb-4 w-fit text-white ${products[currentIndex].color}`}>
                  {products[currentIndex].brand}
                </span>
                <h4 className={`text-4xl md:text-5xl font-extrabold mb-6 ${products[currentIndex].textColor}`}>
                  {products[currentIndex].name}
                </h4>
                <p className="text-gray-600 text-lg mb-8 line-clamp-3">
                  {products[currentIndex].description}
                </p>
                <a href="#" className="inline-flex items-center font-bold text-gray-800 hover:text-brand-orange transition-colors group">
                  Ver detalhes do produto 
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              
              <div className="order-1 md:order-2 h-full relative flex items-center justify-center">
                <div className={`absolute inset-0 opacity-20 rounded-full blur-3xl ${products[currentIndex].color}`}></div>
                <img 
                  src={products[currentIndex].image} 
                  alt={products[currentIndex].name} 
                  className="relative z-10 w-full h-[250px] md:h-full max-h-[350px] object-cover rounded-2xl shadow-lg border-4 border-white"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Timeline Indicator */}
        <div className="mt-12 flex items-center gap-4 w-full max-w-xl mx-auto">
          {products.map((_, idx) => (
            <div key={idx} className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden relative cursor-pointer" onClick={() => setCurrentIndex(idx)}>
              {idx === currentIndex && (
                <motion.div 
                  layoutId="activeProgress"
                  className="absolute top-0 left-0 bottom-0 right-0 bg-brand-orange"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  onAnimationComplete={next}
                />
              )}
              {idx < currentIndex && (
                <div className="absolute inset-0 bg-gray-400" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
