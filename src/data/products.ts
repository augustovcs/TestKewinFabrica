// === Catálogo Laticínios Conquista ===
// Produtos reais identificados pelas fotos/embalagens da marca.
// Sabores e, principalmente, a TABELA NUTRICIONAL são ilustrativos e devem
// ser substituídos pelos valores oficiais de cada rótulo.

export type Category = "Leites" | "Bebida Láctea" | "Iogurtes" | "Derivados";

export interface NutritionRow {
  label: string;
  amount: string;
  vd?: string;
}

export type Accent = "pink" | "green" | "blue" | "red" | "amber";

export interface Product {
  id: string;
  brand: "Laticínios Conquista" | "ConLeite";
  name: string;
  category: Category;
  tagline: string;
  description: string;
  image: string;
  accent: Accent;
  badges: string[];
  uses: string[];
  servingSize: string;
  nutrition: NutritionRow[];
}

export const categories: Category[] = ["Leites", "Bebida Láctea", "Iogurtes", "Derivados"];

export const products: Product[] = [
  {
    id: "leite-integral",
    brand: "Laticínios Conquista",
    name: "Leite Pasteurizado Integral",
    category: "Leites",
    tagline: "O leite de verdade da família conquistense.",
    description:
      "Leite pasteurizado integral Conquista, com o sabor encorpado e cremoso de sempre. Processado na nossa unidade em Vitória da Conquista e distribuído fresquinho para a região.",
    image: "/produtos/IMG_7332.webp",
    accent: "red",
    badges: ["Inspeção Federal", "Saquinho 1L", "Indústria Brasileira"],
    uses: ["Café da manhã", "Vitaminas e mingaus", "Receitas do dia a dia"],
    servingSize: "200 ml (1 copo)",
    nutrition: [
      { label: "Valor energético", amount: "120 kcal", vd: "6%" },
      { label: "Carboidratos", amount: "9,4 g", vd: "3%" },
      { label: "Proteínas", amount: "6,4 g", vd: "13%" },
      { label: "Gorduras totais", amount: "6,4 g", vd: "12%" },
      { label: "Gorduras saturadas", amount: "4,0 g", vd: "18%" },
      { label: "Cálcio", amount: "240 mg", vd: "24%" },
    ],
  },
  {
    id: "leite-desnatado",
    brand: "Laticínios Conquista",
    name: "Leite Pasteurizado Desnatado",
    category: "Leites",
    tagline: "Leveza com todo o cálcio que a família precisa.",
    description:
      "Leite pasteurizado desnatado Conquista: zero gordura, mantendo as proteínas e o cálcio. Sabor suave e equilibrado para quem cuida da alimentação sem abrir mão do leite de verdade.",
    image: "/produtos/IMG_7329.webp",
    accent: "blue",
    badges: ["Inspeção Federal", "Saquinho 1L", "Baixo teor de gordura"],
    uses: ["Dietas equilibradas", "Café e cappuccino", "Pós-treino"],
    servingSize: "200 ml (1 copo)",
    nutrition: [
      { label: "Valor energético", amount: "70 kcal", vd: "4%" },
      { label: "Carboidratos", amount: "9,8 g", vd: "3%" },
      { label: "Proteínas", amount: "6,8 g", vd: "14%" },
      { label: "Gorduras totais", amount: "0 g", vd: "0%" },
      { label: "Cálcio", amount: "250 mg", vd: "25%" },
    ],
  },
  {
    id: "bebida-morango",
    brand: "Laticínios Conquista",
    name: "Bebida Láctea Fermentada Morango",
    category: "Bebida Láctea",
    tagline: "A queridinha da lancheira, com sabor de morango.",
    description:
      "Bebida láctea fermentada com preparado de morango. Cremosa e gostosa, agita antes de beber e conquista a criançada. Disponível em 450 g e 950 g.",
    image: "/produtos/IMG_7281.webp",
    accent: "pink",
    badges: ["Inspeção Federal", "450 g e 950 g", "Agite antes de beber"],
    uses: ["Lancheira escolar", "Lanche da tarde", "Geladinha"],
    servingSize: "200 g",
    nutrition: [
      { label: "Valor energético", amount: "150 kcal", vd: "8%" },
      { label: "Carboidratos", amount: "23 g", vd: "8%" },
      { label: "Açúcares totais", amount: "20 g", vd: "—" },
      { label: "Proteínas", amount: "4,0 g", vd: "8%" },
      { label: "Cálcio", amount: "160 mg", vd: "16%" },
    ],
  },
  {
    id: "bebida-coco",
    brand: "Laticínios Conquista",
    name: "Bebida Láctea Fermentada Coco",
    category: "Bebida Láctea",
    tagline: "O sabor de coco que combina com o Nordeste.",
    description:
      "Bebida láctea fermentada com preparado de coco. Cremosidade na medida certa e aquele gostinho tropical para o lanche de qualquer hora.",
    image: "/produtos/IMG_7285.webp",
    accent: "green",
    badges: ["Inspeção Federal", "450 g e 950 g", "Agite antes de beber"],
    uses: ["Lanche da tarde", "Lancheira", "Sobremesa rápida"],
    servingSize: "200 g",
    nutrition: [
      { label: "Valor energético", amount: "145 kcal", vd: "7%" },
      { label: "Carboidratos", amount: "22 g", vd: "7%" },
      { label: "Açúcares totais", amount: "19 g", vd: "—" },
      { label: "Proteínas", amount: "4,0 g", vd: "8%" },
      { label: "Cálcio", amount: "160 mg", vd: "16%" },
    ],
  },
  {
    id: "bebida-ameixa",
    brand: "Laticínios Conquista",
    name: "Bebida Láctea Fermentada Ameixa",
    category: "Bebida Láctea",
    tagline: "Sabor ameixa, suave e diferente.",
    description:
      "Bebida láctea fermentada com preparado de ameixa. Uma opção cremosa e levemente adocicada para variar o lanche da família. (Sabor a confirmar com o rótulo oficial.)",
    image: "/produtos/IMG_7310.webp",
    accent: "red",
    badges: ["Inspeção Federal", "450 g", "Agite antes de beber"],
    uses: ["Lanche da tarde", "Com granola", "Geladinha"],
    servingSize: "200 g",
    nutrition: [
      { label: "Valor energético", amount: "150 kcal", vd: "8%" },
      { label: "Carboidratos", amount: "23 g", vd: "8%" },
      { label: "Açúcares totais", amount: "20 g", vd: "—" },
      { label: "Proteínas", amount: "4,0 g", vd: "8%" },
      { label: "Cálcio", amount: "160 mg", vd: "16%" },
    ],
  },
  {
    id: "iogurte-natural",
    brand: "ConLeite",
    name: "Iogurte Natural Desnatado",
    category: "Iogurtes",
    tagline: "Só leite e fermento. Do jeito que deve ser.",
    description:
      "Iogurte natural desnatado ConLeite, com acidez equilibrada de uma fermentação cuidadosa. Versátil para receitas doces e salgadas, ou puro com mel e frutas.",
    image: "/produtos/IMG_7291.webp",
    accent: "blue",
    badges: ["Inspeção Federal", "Desnatado", "Sem corantes"],
    uses: ["Molhos e cremes", "Com mel e frutas", "Receitas fit"],
    servingSize: "170 g (1 pote)",
    nutrition: [
      { label: "Valor energético", amount: "70 kcal", vd: "4%" },
      { label: "Carboidratos", amount: "8,0 g", vd: "3%" },
      { label: "Proteínas", amount: "6,5 g", vd: "13%" },
      { label: "Gorduras totais", amount: "0,2 g", vd: "0%" },
      { label: "Cálcio", amount: "210 mg", vd: "21%" },
    ],
  },
  {
    id: "manteiga",
    brand: "ConLeite",
    name: "Manteiga com Sal",
    category: "Derivados",
    tagline: "Textura e sabor da verdadeira manteiga.",
    description:
      "Manteiga de primeira qualidade com sal ConLeite, produzida a partir do creme do nosso leite. Aquele aroma e sabor que transformam o pão da manhã num momento especial. Potes de 200 g e 500 g.",
    image: "/produtos/manteiga.webp",
    accent: "amber",
    badges: ["Inspeção Federal", "200 g e 500 g", "Com sal"],
    uses: ["Pão na chapa", "Bolos e massas", "Finalização de pratos"],
    servingSize: "10 g (1 colher de chá)",
    nutrition: [
      { label: "Valor energético", amount: "72 kcal", vd: "4%" },
      { label: "Carboidratos", amount: "0 g", vd: "0%" },
      { label: "Gorduras totais", amount: "8,1 g", vd: "15%" },
      { label: "Gorduras saturadas", amount: "5,3 g", vd: "24%" },
      { label: "Sódio", amount: "60 mg", vd: "3%" },
    ],
  },
];

export const accentClasses: Record<Accent, { text: string; bg: string; soft: string }> = {
  pink:  { text: "text-brand-pink-dark",  bg: "bg-brand-pink",     soft: "bg-brand-pink-tint" },
  green: { text: "text-brand-green",      bg: "bg-brand-green",    soft: "bg-brand-green-tint" },
  blue:  { text: "text-line-desnatado",   bg: "bg-line-desnatado", soft: "bg-line-desnatado/10" },
  red:   { text: "text-line-integral",    bg: "bg-line-integral",  soft: "bg-line-integral/10" },
  amber: { text: "text-[#8a6a10]",        bg: "bg-line-manteiga",  soft: "bg-line-manteiga/20" },
};
