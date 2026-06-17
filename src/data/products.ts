// === Catálogo Conleite ===
// Conteúdo representativo (placeholder). Substitua nomes, textos, imagens e a
// tabela nutricional pelos dados reais quando tiver. A estrutura abaixo já
// alimenta a página /catalogo e o modal de cada produto.

export type Category = "Leites" | "Iogurtes" | "Derivados" | "Conquista";

export interface NutritionRow {
  label: string;
  /** valor por porção, ex: "120 mg" */
  amount: string;
  /** %VD — pode ficar vazio */
  vd?: string;
}

export interface Product {
  id: string;
  brand: "Conleite" | "Laticínios Conquista";
  name: string;
  category: Category;
  /** chamada curta para o card */
  tagline: string;
  /** parágrafo do modal */
  description: string;
  image: string;
  /** cor de destaque por linha de produto */
  accent: "green" | "pink" | "blue" | "red" | "yellow";
  /** selos / atributos */
  badges: string[];
  /** modos de uso / sugestões */
  uses: string[];
  servingSize: string;
  nutrition: NutritionRow[];
}

export const categories: Category[] = ["Leites", "Iogurtes", "Derivados", "Conquista"];

export const products: Product[] = [
  {
    id: "leite-uht-integral",
    brand: "Conleite",
    name: "Leite UHT Integral",
    category: "Leites",
    tagline: "O clássico da fazenda, com 3% de gordura.",
    description:
      "Nosso leite integral preserva o sabor encorpado e cremoso de sempre. Coletado de produtores parceiros da região e processado em até 24 horas, mantém as vitaminas e o cálcio que sustentam a rotina da família.",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=900&auto=format&fit=crop",
    accent: "red",
    badges: ["SIF", "Fonte de cálcio", "Embalagem 1L"],
    uses: ["Café da manhã", "Vitaminas e shakes", "Receitas e mingaus"],
    servingSize: "200 ml (1 copo)",
    nutrition: [
      { label: "Valor energético", amount: "120 kcal", vd: "6%" },
      { label: "Carboidratos", amount: "9,4 g", vd: "3%" },
      { label: "Proteínas", amount: "6,4 g", vd: "13%" },
      { label: "Gorduras totais", amount: "6,4 g", vd: "12%" },
      { label: "Gorduras saturadas", amount: "4,0 g", vd: "18%" },
      { label: "Cálcio", amount: "240 mg", vd: "24%" },
      { label: "Sódio", amount: "100 mg", vd: "4%" },
    ],
  },
  {
    id: "leite-uht-desnatado",
    brand: "Conleite",
    name: "Leite UHT Desnatado",
    category: "Leites",
    tagline: "Leveza com 0% de gordura, todo o cálcio.",
    description:
      "Para quem busca equilíbrio sem abrir mão do leite de verdade. Zero gordura, mantendo as proteínas e o cálcio. Sabor suave, ideal para o dia a dia de quem cuida da alimentação.",
    image: "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?q=80&w=900&auto=format&fit=crop",
    accent: "blue",
    // (desnatado — código azul, mantido)
    badges: ["SIF", "0% gordura", "Embalagem 1L"],
    uses: ["Dietas equilibradas", "Café e cappuccino", "Pós-treino"],
    servingSize: "200 ml (1 copo)",
    nutrition: [
      { label: "Valor energético", amount: "70 kcal", vd: "4%" },
      { label: "Carboidratos", amount: "9,8 g", vd: "3%" },
      { label: "Proteínas", amount: "6,8 g", vd: "14%" },
      { label: "Gorduras totais", amount: "0 g", vd: "0%" },
      { label: "Gorduras saturadas", amount: "0 g", vd: "0%" },
      { label: "Cálcio", amount: "250 mg", vd: "25%" },
      { label: "Sódio", amount: "105 mg", vd: "4%" },
    ],
  },
  {
    id: "leite-semidesnatado",
    brand: "Conleite",
    name: "Leite UHT Semidesnatado",
    category: "Leites",
    tagline: "O meio-termo cremoso, com 1% de gordura.",
    description:
      "O equilíbrio perfeito entre a leveza do desnatado e a cremosidade do integral. Indicado para toda a família que quer reduzir gordura sem perder o sabor de um bom leite.",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=900&auto=format&fit=crop",
    accent: "green",
    badges: ["SIF", "1% gordura", "Embalagem 1L"],
    uses: ["Toda a família", "Café da manhã", "Receitas leves"],
    servingSize: "200 ml (1 copo)",
    nutrition: [
      { label: "Valor energético", amount: "92 kcal", vd: "5%" },
      { label: "Carboidratos", amount: "9,6 g", vd: "3%" },
      { label: "Proteínas", amount: "6,6 g", vd: "13%" },
      { label: "Gorduras totais", amount: "2,8 g", vd: "5%" },
      { label: "Gorduras saturadas", amount: "1,8 g", vd: "8%" },
      { label: "Cálcio", amount: "245 mg", vd: "25%" },
      { label: "Sódio", amount: "102 mg", vd: "4%" },
    ],
  },
  {
    id: "iogurte-morango",
    brand: "Laticínios Conquista",
    name: "Iogurte Integral Morango",
    category: "Iogurtes",
    tagline: "Cremoso, com pedaços de fruta de verdade.",
    description:
      "Iogurte batido com polpa e pedaços reais de morango. Cremosidade na medida certa para o lanche da tarde, a lancheira das crianças ou aquela pausa gostosa no meio do dia.",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=900&auto=format&fit=crop",
    accent: "pink",
    badges: ["SIF", "Com pedaços de fruta", "Garrafa 900g"],
    uses: ["Lanche da tarde", "Lancheira", "Com granola e frutas"],
    servingSize: "170 g (1 pote)",
    nutrition: [
      { label: "Valor energético", amount: "150 kcal", vd: "8%" },
      { label: "Carboidratos", amount: "23 g", vd: "8%" },
      { label: "Açúcares totais", amount: "20 g", vd: "—" },
      { label: "Proteínas", amount: "5,0 g", vd: "10%" },
      { label: "Gorduras totais", amount: "4,2 g", vd: "8%" },
      { label: "Cálcio", amount: "180 mg", vd: "18%" },
      { label: "Sódio", amount: "75 mg", vd: "3%" },
    ],
  },
  {
    id: "iogurte-natural",
    brand: "Laticínios Conquista",
    name: "Iogurte Natural Integral",
    category: "Iogurtes",
    tagline: "Só leite e fermento. Do jeito que deve ser.",
    description:
      "Iogurte natural sem adição de açúcar, com a acidez equilibrada de uma fermentação cuidadosa. Versátil para receitas doces e salgadas, ou puro com mel e frutas.",
    image: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?q=80&w=900&auto=format&fit=crop",
    accent: "green",
    badges: ["SIF", "Sem açúcar adicionado", "Pote 500g"],
    uses: ["Molhos e cremes", "Com mel e frutas", "Receitas fit"],
    servingSize: "170 g (1 pote)",
    nutrition: [
      { label: "Valor energético", amount: "110 kcal", vd: "6%" },
      { label: "Carboidratos", amount: "8,0 g", vd: "3%" },
      { label: "Açúcares totais", amount: "8,0 g", vd: "—" },
      { label: "Proteínas", amount: "6,5 g", vd: "13%" },
      { label: "Gorduras totais", amount: "5,5 g", vd: "10%" },
      { label: "Cálcio", amount: "210 mg", vd: "21%" },
      { label: "Sódio", amount: "80 mg", vd: "3%" },
    ],
  },
  {
    id: "bebida-lactea",
    brand: "Laticínios Conquista",
    name: "Bebida Láctea Chocolate",
    category: "Conquista",
    tagline: "Energia e sabor em embalagem prática.",
    description:
      "A queridinha da lancheira: bebida láctea sabor chocolate, prática para levar a qualquer lugar. Sabor que conquista a criançada e dá aquele gás na correria do dia.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=900&auto=format&fit=crop",
    accent: "pink",
    badges: ["SIF", "Prática 200ml", "Fonte de cálcio"],
    uses: ["Lancheira escolar", "Lanche rápido", "Geladinha"],
    servingSize: "200 ml (1 embalagem)",
    nutrition: [
      { label: "Valor energético", amount: "160 kcal", vd: "8%" },
      { label: "Carboidratos", amount: "27 g", vd: "9%" },
      { label: "Açúcares totais", amount: "23 g", vd: "—" },
      { label: "Proteínas", amount: "4,0 g", vd: "8%" },
      { label: "Gorduras totais", amount: "3,5 g", vd: "6%" },
      { label: "Cálcio", amount: "160 mg", vd: "16%" },
      { label: "Sódio", amount: "95 mg", vd: "4%" },
    ],
  },
  {
    id: "manteiga",
    brand: "Conleite",
    name: "Manteiga com Sal",
    category: "Derivados",
    tagline: "Manteiga de verdade, batida em pequenos lotes.",
    description:
      "Produzida a partir do creme fresco do nosso leite, com o ponto certo de sal. Aquele aroma e sabor que transformam o pão da manhã num momento especial.",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?q=80&w=900&auto=format&fit=crop",
    accent: "yellow",
    badges: ["SIF", "Pote 200g", "Creme fresco"],
    uses: ["Pão na chapa", "Bolos e massas", "Finalização de pratos"],
    servingSize: "10 g (1 colher de chá)",
    nutrition: [
      { label: "Valor energético", amount: "72 kcal", vd: "4%" },
      { label: "Carboidratos", amount: "0 g", vd: "0%" },
      { label: "Proteínas", amount: "0 g", vd: "0%" },
      { label: "Gorduras totais", amount: "8,1 g", vd: "15%" },
      { label: "Gorduras saturadas", amount: "5,3 g", vd: "24%" },
      { label: "Sódio", amount: "60 mg", vd: "3%" },
    ],
  },
  {
    id: "creme-de-leite",
    brand: "Conleite",
    name: "Creme de Leite",
    category: "Derivados",
    tagline: "Cremosidade para adoçar e encorpar receitas.",
    description:
      "Creme de leite homogêneo e estável, ideal para dar liga e cremosidade a doces, molhos e estrogonofes. Da nossa cozinha para a sua.",
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?q=80&w=900&auto=format&fit=crop",
    accent: "blue",
    // (creme de leite — código azul)
    badges: ["SIF", "Caixinha 200g", "Pronto para uso"],
    uses: ["Estrogonofe", "Molhos cremosos", "Sobremesas"],
    servingSize: "30 g (1 colher de sopa)",
    nutrition: [
      { label: "Valor energético", amount: "63 kcal", vd: "3%" },
      { label: "Carboidratos", amount: "1,5 g", vd: "1%" },
      { label: "Proteínas", amount: "0,8 g", vd: "2%" },
      { label: "Gorduras totais", amount: "6,0 g", vd: "11%" },
      { label: "Gorduras saturadas", amount: "3,8 g", vd: "17%" },
      { label: "Sódio", amount: "20 mg", vd: "1%" },
    ],
  },
];

export const accentClasses: Record<
  Product["accent"],
  { text: string; bg: string; soft: string }
> = {
  green:  { text: "text-brand-green",     bg: "bg-brand-green",  soft: "bg-brand-green-tint" },
  pink:   { text: "text-brand-pink-dark", bg: "bg-brand-pink",   soft: "bg-brand-pink-tint" },
  blue:   { text: "text-brand-blue",      bg: "bg-brand-blue",   soft: "bg-brand-blue/10" },
  red:    { text: "text-brand-red",       bg: "bg-brand-red",    soft: "bg-brand-red/10" },
  yellow: { text: "text-amber-600",       bg: "bg-brand-yellow", soft: "bg-amber-100" },
};
