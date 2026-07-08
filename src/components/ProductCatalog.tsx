import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import {
  products,
  categories,
  accentClasses,
  type Product,
  type Category,
} from "../data/products";
import { spring } from "../lib/motion";

const ease = [0.22, 1, 0.36, 1] as const;

// Mundo color-coded — tile por categoria + cor da aba ativa
const catStyle: Record<Category, { tile: string; tab: string }> = {
  "Leites":        { tile: "from-brand-green-tint to-white", tab: "bg-brand-green text-white" },
  "Bebida Láctea": { tile: "from-brand-pink-tint to-white",  tab: "bg-brand-pink text-white" },
  "Iogurtes":      { tile: "from-brand-lime-tint to-white",  tab: "bg-brand-lime text-brand-green-ink" },
  "Derivados":     { tile: "from-line-manteiga/20 to-white", tab: "bg-line-manteiga text-[#5c4708]" },
};

export default function ProductCatalog() {
  const [filter, setFilter] = useState<Category | "Todos">("Todos");
  const [selected, setSelected] = useState<Product | null>(null);

  const visible =
    filter === "Todos" ? products : products.filter((p) => p.category === filter);

  const close = useCallback(() => setSelected(null), []);

  // Abrir produto a partir do hash (#id), inclusive vindo da home
  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.replace("#", "");
      const found = products.find((p) => p.id === id);
      if (found) setSelected(found);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  // Esc + trava de scroll quando o modal está aberto
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, close]);

  const tabs: (Category | "Todos")[] = ["Todos", ...categories];

  return (
    <>
      {/* Filtros color-coded */}
      <div className="flex flex-wrap gap-2 mb-10">
        {tabs.map((t) => {
          const active = t === filter;
          const activeCls = t === "Todos" ? "bg-brand-green text-white" : catStyle[t as Category].tab;
          return (
            <motion.button
              key={t}
              whileTap={{ scale: 0.94 }}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                active ? activeCls : "bg-white text-muted border border-line hover:text-ink hover:border-brand-green/40"
              }`}
            >
              {t}
            </motion.button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => {
            const a = accentClasses[p.accent];
            return (
              <motion.button
                layout
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                whileHover={{ y: -10, rotate: -1, transition: spring }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.35, ease }}
                onClick={() => setSelected(p)}
                className="group text-left bg-white rounded-[18px] overflow-hidden border border-line hover:border-transparent hover:shadow-2xl hover:shadow-black/10"
              >
                <div className={`aspect-square overflow-hidden relative bg-gradient-to-br ${catStyle[p.category].tile}`}>
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={900}
                    height={900}
                    className="relative z-[1] w-full h-full object-cover group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-500"
                  />
                  <span className={`absolute z-[3] top-3 left-3 text-[11px] font-bold uppercase tracking-wide text-white px-2.5 py-1 rounded-full ${a.bg}`}>
                    {p.category}
                  </span>
                </div>
                <div className="p-5">
                  <span className={`text-xs font-bold uppercase tracking-wide ${a.text}`}>
                    {p.brand}
                  </span>
                  <h3 className="font-display font-extrabold text-lg text-ink mt-1.5 leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-muted text-sm mt-2 leading-relaxed">{p.tagline}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-green mt-4 group-hover:gap-2.5 transition-all">
                    Ver detalhes
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-ink/60 backdrop-blur-sm"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={selected.name}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.35, ease }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-[18px] sm:rounded-[18px] shadow-2xl"
            >
              <ModalContent product={selected} onClose={close} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ModalContent({ product, onClose }: { product: Product; onClose: () => void }) {
  const a = accentClasses[product.accent];
  return (
    <div className="grid md:grid-cols-2">
      {/* Imagem */}
      <div className="product-media relative h-56 md:h-full min-h-[240px]">
        <img src={product.image} alt={product.name} className="relative z-[1] w-full h-full object-cover" />
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute z-[3] top-4 right-4 md:hidden w-9 h-9 rounded-[8px] bg-white/90 text-ink flex items-center justify-center hover:bg-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Conteúdo */}
      <div className="p-7 md:p-8 relative">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-5 right-5 hidden md:flex w-9 h-9 rounded-[8px] bg-milk text-muted items-center justify-center hover:bg-line hover:text-ink transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <span className={`text-xs font-bold uppercase tracking-wide ${a.text}`}>
          {product.brand}
        </span>
        <h2 className="font-display text-2xl font-extrabold text-ink mt-1.5 leading-tight pr-8">
          {product.name}
        </h2>
        <p className="text-muted leading-relaxed mt-3">{product.description}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-5">
          {product.badges.map((b) => (
            <span key={b} className={`text-xs font-semibold px-3 py-1.5 rounded-[8px] ${a.soft} ${a.text}`}>
              {b}
            </span>
          ))}
        </div>

        {/* Usos */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-ink mb-2">Como aproveitar</h3>
          <ul className="space-y-1.5">
            {product.uses.map((u) => (
              <li key={u} className="flex items-center gap-2 text-sm text-muted">
                <span className={`w-1.5 h-1.5 rounded-full ${a.bg}`} />
                {u}
              </li>
            ))}
          </ul>
        </div>

        {/* Tabela nutricional — assinatura do catálogo */}
        <div className="mt-7 border-2 border-ink rounded-[4px] overflow-hidden">
          <div className="bg-ink text-white px-4 py-2.5">
            <div className="font-display font-bold text-sm tracking-wide">INFORMAÇÃO NUTRICIONAL</div>
            <div className="text-white/60 text-xs">Porção de {product.servingSize}</div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/15 text-muted text-xs uppercase tracking-wide">
                <th className="text-left font-semibold px-4 py-2">Item</th>
                <th className="text-right font-semibold px-4 py-2">Qtd.</th>
                <th className="text-right font-semibold px-4 py-2">%VD*</th>
              </tr>
            </thead>
            <tbody>
              {product.nutrition.map((row, i) => (
                <tr key={row.label} className={i % 2 ? "bg-milk" : "bg-white"}>
                  <td className="px-4 py-2 text-ink-soft">{row.label}</td>
                  <td className="px-4 py-2 text-right font-medium text-ink">{row.amount}</td>
                  <td className="px-4 py-2 text-right text-muted">{row.vd ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="px-4 py-2.5 text-[11px] text-muted bg-milk border-t border-ink/10">
            *Valores diários de referência (2.000 kcal). Valores ilustrativos.
          </p>
        </div>
      </div>
    </div>
  );
}
