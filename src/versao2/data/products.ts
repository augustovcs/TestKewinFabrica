// === Catálogo Laticínios Conquista ===
// Produtos e embalagens conferidos nas fotos de estúdio (rótulos reais).
// A TABELA NUTRICIONAL é ilustrativa e deve ser substituída pelos valores
// oficiais de cada rótulo.

export type Category = "Leite" | "Bebida Láctea" | "Iogurte" | "Queijo" | "Ricota" | "Derivado";

export interface NutritionRow {
  label: string;
  amount: string;
  vd?: string;
}

export type Accent = "pink" | "green" | "blue" | "red" | "amber";

/** Embalagem/formato com foto própria (troca no modal) */
export interface Variant {
  label: string;
  image: string;
}

export interface Product {
  id: string;
  brand: "Laticínios Conquista" | "ConLeite";
  name: string;
  category: Category;
  tagline: string;
  description: string;
  /** PNG/WebP com fundo transparente — 1ª variante quando houver */
  image: string;
  variants?: Variant[];
  accent: Accent;
  badges: string[];
  uses: string[];
  servingSize: string;
  nutrition: NutritionRow[];
}

export const categories: Category[] = ["Leite", "Bebida Láctea", "Iogurte", "Queijo", "Ricota", "Derivado"];

const img = (f: string) => `/produtos/studio/${f}.webp`;
const sizes = (id: string, list: string[]): Variant[] =>
  list.map((s) => ({ label: `${s} g`, image: img(`${id}-${s}`) }));

// Tabelas compartilhadas (mesmo rótulo em vários sabores)
// "Polpa de fruta" 200 g: bebidas ameixa/graviola/coco e iogurte salada de frutas
const nutPolpa: NutritionRow[] = [
  { label: "Valor energético", amount: "187 kcal = 785 kJ", vd: "8%" },
  { label: "Carboidratos", amount: "25 g", vd: "7%" },
  { label: "Proteínas", amount: "6 g", vd: "10%" },
  { label: "Gorduras totais", amount: "5 g", vd: "8%" },
  { label: "Gorduras saturadas", amount: "4 g", vd: "16%" },
  { label: "Gorduras trans", amount: "0 g", vd: "—" },
  { label: "Fibra alimentar", amount: "0 g", vd: "0%" },
  { label: "Sódio", amount: "101 mg", vd: "5%" },
];
// Iogurte integral garrafa 200 g: morango, ameixa e banana/mamão/maçã
const nutGarrafa: NutritionRow[] = [
  { label: "Valor energético", amount: "196 kcal", vd: "10%" },
  { label: "Carboidratos", amount: "30 g", vd: "10%" },
  { label: "Açúcares totais", amount: "32 g", vd: "—" },
  { label: "Açúcares adicionados", amount: "22 g", vd: "36%" },
  { label: "Proteínas", amount: "6 g", vd: "12%" },
  { label: "Gorduras totais", amount: "6 g", vd: "9%" },
  { label: "Gorduras saturadas", amount: "2,2 g", vd: "11%" },
  { label: "Gorduras trans", amount: "0 g", vd: "0%" },
  { label: "Fibra alimentar", amount: "0 g", vd: "0%" },
  { label: "Sódio", amount: "114 mg", vd: "6%" },
  { label: "Cálcio", amount: "189 mg", vd: "19%" },
];
// shortcut: Diet ConLeite sem tabela no PDF, valores ilustrativos até chegar o rótulo
const nutDiet: NutritionRow[] = [
  { label: "Valor energético", amount: "75 kcal", vd: "4%" },
  { label: "Carboidratos", amount: "9,5 g", vd: "3%" },
  { label: "Açúcares adicionados", amount: "0 g", vd: "0%" },
  { label: "Proteínas", amount: "7,0 g", vd: "14%" },
  { label: "Gorduras totais", amount: "0,8 g", vd: "1%" },
  { label: "Cálcio", amount: "220 mg", vd: "22%" },
];

export const products: Product[] = [
  {
    id: "leite-integral",
    brand: "Laticínios Conquista",
    name: "Leite Pasteurizado Integral",
    category: "Leite",
    tagline: "O leite de verdade da família conquistense.",
    description:
      "Leite pasteurizado integral Conquista, com o sabor encorpado e cremoso de sempre. Processado na nossa unidade em Vitória da Conquista e distribuído fresquinho para a região.",
    image: img("leite-integral"),
    accent: "red",
    badges: ["Inspeção Federal", "Saquinho 1L", "Indústria Brasileira"],
    uses: ["Café da manhã", "Vitaminas e mingaus", "Receitas do dia a dia"],
    servingSize: "200 g (1 copo)",
    nutrition: [
      { label: "Valor energético", amount: "126 kcal = 529 kJ", vd: "6%" },
      { label: "Carboidratos", amount: "10 g", vd: "3%" },
      { label: "Proteínas", amount: "8 g", vd: "11%" },
      { label: "Gorduras totais", amount: "6 g", vd: "11%" },
      { label: "Gorduras saturadas", amount: "4 g", vd: "18%" },
      { label: "Gorduras trans", amount: "0 g", vd: "—" },
      { label: "Fibra alimentar", amount: "0 g", vd: "0%" },
      { label: "Cálcio", amount: "246 mg", vd: "25%" },
      { label: "Sódio", amount: "230 mg", vd: "10%" },
    ],
  },
  {
    id: "leite-desnatado",
    brand: "Laticínios Conquista",
    name: "Leite Pasteurizado Desnatado",
    category: "Leite",
    tagline: "Leveza com todo o cálcio que a família precisa.",
    description:
      "Leite pasteurizado desnatado Conquista: zero gordura, mantendo as proteínas e o cálcio. Sabor suave e equilibrado para quem cuida da alimentação sem abrir mão do leite de verdade.",
    image: img("leite-desnatado"),
    accent: "blue",
    badges: ["Inspeção Federal", "Saquinho 1L", "Baixo teor de gordura"],
    uses: ["Dietas equilibradas", "Café e cappuccino", "Pós-treino"],
    servingSize: "200 g (1 copo)",
    nutrition: [
      { label: "Valor energético", amount: "68 kcal = 285 kJ", vd: "3%" },
      { label: "Carboidratos", amount: "10 g", vd: "2%" },
      { label: "Proteínas", amount: "7 g", vd: "13%" },
      { label: "Gorduras totais", amount: "0,15 g", vd: "0,2%" },
      { label: "Gorduras saturadas", amount: "0,10 g", vd: "0,4%" },
      { label: "Gorduras trans", amount: "0 g", vd: "—" },
      { label: "Fibra alimentar", amount: "0 g", vd: "0%" },
      { label: "Cálcio", amount: "250 mg", vd: "31%" },
      { label: "Sódio", amount: "84 mg", vd: "3,5%" },
    ],
  },
  {
    id: "bebida-morango",
    brand: "Laticínios Conquista",
    name: "Bebida Láctea Fermentada Morango",
    category: "Bebida Láctea",
    tagline: "A queridinha da lancheira, com sabor de morango.",
    description:
      "Bebida láctea fermentada com preparado de morango. Cremosa e gostosa, é só agitar antes de beber. Do garrafão da família ao squeeze de 110 g da lancheira.",
    image: img("bebida-morango-950"),
    variants: sizes("bebida-morango", ["950", "450", "180", "110"]),
    accent: "pink",
    badges: ["Inspeção Federal", "950 g · 450 g · 180 g · 110 g", "Agite antes de beber"],
    uses: ["Lancheira escolar", "Lanche da tarde", "Vitamina com banana"],
    servingSize: "200 g (1 copo)",
    nutrition: [
      { label: "Valor energético", amount: "124 kcal = 521 kJ", vd: "6%" },
      { label: "Carboidratos", amount: "22 g", vd: "7%" },
      { label: "Proteínas", amount: "3,1 g", vd: "4%" },
      { label: "Gorduras totais", amount: "2,6 g", vd: "5%" },
      { label: "Gorduras saturadas", amount: "1,6 g", vd: "7%" },
      { label: "Gorduras trans", amount: "0 g", vd: "—" },
      { label: "Fibra alimentar", amount: "0 g", vd: "0%" },
      { label: "Cálcio", amount: "79 mg", vd: "8%" },
      { label: "Sódio", amount: "99 mg", vd: "4%" },
    ],
  },
  {
    id: "bebida-ameixa",
    brand: "Laticínios Conquista",
    name: "Bebida Láctea Fermentada Ameixa",
    category: "Bebida Láctea",
    tagline: "Sabor ameixa, suave e diferente.",
    description:
      "Bebida láctea fermentada com preparo de ameixa. Cremosa e levemente adocicada para variar o lanche da família.",
    image: img("bebida-ameixa-950"),
    variants: sizes("bebida-ameixa", ["950", "450", "180", "110"]),
    accent: "red",
    badges: ["Inspeção Federal", "950 g · 450 g · 180 g · 110 g", "Agite antes de beber"],
    uses: ["Lanche da tarde", "Com granola", "Geladinha"],
    servingSize: "200 g (1 copo)",
    nutrition: nutPolpa,
  },
  {
    id: "bebida-maca-mamao-banana",
    brand: "Laticínios Conquista",
    name: "Bebida Láctea Fermentada Maçã, Mamão e Banana",
    category: "Bebida Láctea",
    tagline: "Três frutas numa garrafa só.",
    description:
      "Bebida láctea fermentada com preparado de maçã, mamão e banana. O clássico sabor salada de frutas, cremoso e prático para qualquer hora.",
    image: img("bebida-maca-mamao-banana-950"),
    variants: sizes("bebida-maca-mamao-banana", ["950", "450", "180", "110"]),
    accent: "amber",
    badges: ["Inspeção Federal", "950 g · 450 g · 180 g · 110 g", "Agite antes de beber"],
    uses: ["Café da manhã", "Lancheira", "Com aveia"],
    servingSize: "200 g (1 copo)",
    nutrition: nutGarrafa,
  },
  {
    id: "bebida-graviola",
    brand: "Laticínios Conquista",
    name: "Bebida Láctea Fermentada Graviola",
    category: "Bebida Láctea",
    tagline: "O sabor tropical que é a cara da Bahia.",
    description:
      "Bebida láctea fermentada com preparo de graviola. Refrescante, cremosa e com aquele gostinho de fruta do quintal.",
    image: img("bebida-graviola-950"),
    variants: sizes("bebida-graviola", ["950", "450", "180"]),
    accent: "green",
    badges: ["Inspeção Federal", "950 g · 450 g · 180 g", "Agite antes de beber"],
    uses: ["Lanche da tarde", "Geladinha", "Sobremesa rápida"],
    servingSize: "200 g (1 copo)",
    nutrition: nutPolpa,
  },
  {
    id: "bebida-coco",
    brand: "Laticínios Conquista",
    name: "Bebida Láctea Fermentada Coco",
    category: "Bebida Láctea",
    tagline: "O sabor de coco que combina com o Nordeste.",
    description:
      "Bebida láctea fermentada com preparado de coco. Cremosidade na medida certa e aquele gostinho tropical para o lanche de qualquer hora.",
    image: img("bebida-coco-450"),
    variants: sizes("bebida-coco", ["450", "180"]),
    accent: "green",
    badges: ["Inspeção Federal", "450 g · 180 g", "Agite antes de beber"],
    uses: ["Lanche da tarde", "Lancheira", "Sobremesa rápida"],
    servingSize: "200 g (1 copo)",
    nutrition: nutPolpa,
  },
  {
    id: "iogurte-morango",
    brand: "Laticínios Conquista",
    name: "Iogurte Morango",
    category: "Iogurte",
    tagline: "Cremoso, com o sabor de morango que todo mundo ama.",
    description:
      "Iogurte Conquista sabor morango, fonte de cálcio e cremoso de verdade. Garrafa de 950 g para a família toda.",
    image: img("iogurte-morango-950"),
    accent: "red",
    badges: ["Inspeção Federal", "950 g", "Fonte de cálcio"],
    uses: ["Café da manhã", "Com cereais", "Smoothies"],
    servingSize: "200 g (1 copo)",
    nutrition: nutGarrafa,
  },
  {
    id: "iogurte-morango-zero",
    brand: "Laticínios Conquista",
    name: "Iogurte Morango Triplo Zero",
    category: "Iogurte",
    tagline: "Zero açúcar adicionado, zero lactose, zero gordura.",
    description:
      "Iogurte desnatado com preparado de morango para dietas com restrição de lactose. 0% de adição de açúcares, 0% lactose e 0% gordura, sem glúten. Todo o sabor, sem culpa.",
    image: img("iogurte-morango-zero-950"),
    accent: "blue",
    badges: ["Inspeção Federal", "950 g", "Zero lactose", "Sem glúten"],
    uses: ["Dietas com restrição", "Pós-treino", "Com frutas"],
    servingSize: "200 g (1 copo)",
    nutrition: [
      { label: "Valor energético", amount: "52 kcal", vd: "3%" },
      { label: "Carboidratos", amount: "7,8 g", vd: "3%" },
      { label: "Açúcares totais", amount: "6 g", vd: "—" },
      { label: "Açúcares adicionados", amount: "0 g", vd: "0%" },
      { label: "Lactose", amount: "0 g", vd: "—" },
      { label: "Galactose", amount: "3 g", vd: "—" },
      { label: "Glicose", amount: "3 g", vd: "—" },
      { label: "Frutose", amount: "0 g", vd: "—" },
      { label: "Proteínas", amount: "5,2 g", vd: "10%" },
      { label: "Gorduras totais", amount: "0 g", vd: "0%" },
      { label: "Gorduras saturadas", amount: "0 g", vd: "0%" },
      { label: "Gorduras trans", amount: "0 g", vd: "0%" },
      { label: "Gorduras monoinsaturadas", amount: "0 g", vd: "0%" },
      { label: "Gorduras poli-insaturadas", amount: "0 g", vd: "0%" },
      { label: "Colesterol", amount: "0 g", vd: "0%" },
      { label: "Fibra alimentar", amount: "0 g", vd: "0%" },
      { label: "Sódio", amount: "78 mg", vd: "4%" },
      { label: "Cálcio", amount: "360 mg", vd: "36%" },
    ],
  },
  {
    id: "iogurte-salada-frutas",
    brand: "Laticínios Conquista",
    name: "Iogurte Salada de Frutas",
    category: "Iogurte",
    tagline: "Uma salada de frutas cremosa no copo.",
    description:
      "Iogurte Conquista sabor salada de frutas, fonte de cálcio e muito cremoso. Garrafa de 950 g.",
    image: img("iogurte-salada-frutas-950"),
    accent: "amber",
    badges: ["Inspeção Federal", "950 g", "Fonte de cálcio"],
    uses: ["Café da manhã", "Com granola", "Lanche da tarde"],
    servingSize: "200 g (1 copo)",
    nutrition: nutPolpa,
  },
  {
    id: "iogurte-ameixa",
    brand: "Laticínios Conquista",
    name: "Iogurte Ameixa",
    category: "Iogurte",
    tagline: "O clássico de ameixa, cremoso e encorpado.",
    description:
      "Iogurte Conquista sabor ameixa, fonte de cálcio, com textura encorpada. Garrafa de 950 g.",
    image: img("iogurte-ameixa-950"),
    accent: "red",
    badges: ["Inspeção Federal", "950 g", "Fonte de cálcio"],
    uses: ["Café da manhã", "Com aveia", "Sobremesa"],
    servingSize: "200 g (1 copo)",
    nutrition: nutGarrafa,
  },
  {
    id: "iogurte-natural",
    brand: "ConLeite",
    name: "Iogurte Natural Desnatado",
    category: "Iogurte",
    tagline: "Só leite e fermento. Do jeito que deve ser.",
    description:
      "Iogurte natural desnatado ConLeite com apenas 2 ingredientes: leite e fermento lácteo. 0% de adição de açúcares e 0% de gorduras totais. Versátil para receitas doces e salgadas, ou puro com mel e frutas.",
    image: img("iogurte-natural-500"),
    accent: "blue",
    badges: ["Inspeção Federal", "500 g", "0% gordura", "Sem açúcar adicionado"],
    uses: ["Molhos e cremes", "Com mel e frutas", "Receitas fit"],
    servingSize: "200 g (1 copo)",
    nutrition: [
      { label: "Valor energético", amount: "80 kcal = 336 kJ", vd: "4%" },
      { label: "Carboidratos", amount: "10 g", vd: "4%" },
      { label: "Proteínas", amount: "6 g", vd: "20%" },
      { label: "Gorduras totais", amount: "0 g", vd: "0%" },
      { label: "Gorduras saturadas", amount: "0 g", vd: "0%" },
      { label: "Gorduras trans", amount: "0 g", vd: "—" },
      { label: "Fibra alimentar", amount: "0 g", vd: "0%" },
      { label: "Sódio", amount: "105 mg", vd: "5%" },
    ],
  },
  {
    id: "iogurte-diet-morango",
    brand: "ConLeite",
    name: "Iogurte Diet Morango",
    category: "Iogurte",
    tagline: "Diet, desnatado e com sabor de morango.",
    description:
      "Iogurte diet ConLeite com preparado de fruta desnatado sabor morango. Garrafinha de 180 g, ideal para levar na bolsa.",
    image: img("iogurte-diet-morango-180"),
    accent: "pink",
    badges: ["Inspeção Federal", "180 g", "Diet"],
    uses: ["Lanche rápido", "Pós-treino", "Dietas"],
    servingSize: "180 g (1 unidade)",
    nutrition: nutDiet,
  },
  {
    id: "iogurte-diet-mamao-maca-banana",
    brand: "ConLeite",
    name: "Iogurte Diet Mamão, Maçã e Banana",
    category: "Iogurte",
    tagline: "Diet com três frutas.",
    description:
      "Iogurte diet ConLeite com preparado de mamão, maçã e banana. Garrafinha de 180 g, leve e prática.",
    image: img("iogurte-diet-mamao-maca-banana-180"),
    accent: "amber",
    badges: ["Inspeção Federal", "180 g", "Diet"],
    uses: ["Lanche rápido", "Café da manhã", "Dietas"],
    servingSize: "180 g (1 unidade)",
    nutrition: nutDiet,
  },
  {
    id: "queijo-mussarela",
    brand: "Laticínios Conquista",
    name: "Queijo Mussarela",
    category: "Queijo",
    tagline: "Derrete bonito, puxa fio, agrada todo mundo.",
    description:
      "Queijo mussarela Conquista em barra (para fatiar e ralar) ou no formato redondo. O queijo da pizza, do misto quente e do lanche da família.",
    image: img("queijo-mussarela-barra"),
    variants: [
      { label: "Barra", image: img("queijo-mussarela-barra") },
      { label: "Redondo", image: img("queijo-mussarela-redondo") },
    ],
    accent: "green",
    badges: ["Inspeção Federal", "Barra e redondo", "Pesado na hora"],
    uses: ["Pizza e lasanha", "Misto quente", "Tábua de frios"],
    servingSize: "30 g (1 fatia)",
    nutrition: [
      { label: "Valor energético", amount: "115 kcal", vd: "6%" },
      { label: "Carboidratos", amount: "0 g", vd: "0%" },
      { label: "Açúcares totais", amount: "0 g", vd: "—" },
      { label: "Açúcares adicionados", amount: "0 g", vd: "0%" },
      { label: "Proteínas", amount: "10 g", vd: "20%" },
      { label: "Gorduras totais", amount: "8,4 g", vd: "13%" },
      { label: "Gorduras saturadas", amount: "5,5 g", vd: "28%" },
      { label: "Gorduras trans", amount: "0 g", vd: "0%" },
      { label: "Fibra alimentar", amount: "0 g", vd: "0%" },
      { label: "Sódio", amount: "129 mg", vd: "6%" },
    ],
  },
  {
    id: "queijo-tropical",
    brand: "Laticínios Conquista",
    name: "Queijo Tropical",
    category: "Queijo",
    tagline: "Sabor marcante, textura firme, sem lactose.",
    description:
      "Queijo Tropical Conquista, curado no ponto, de sabor levemente adocicado e textura firme. Não contém lactose nem glúten. Inteiro ou fracionado, pesado na presença do consumidor.",
    image: img("queijo-tropical-inteiro"),
    variants: [
      { label: "Inteiro", image: img("queijo-tropical-inteiro") },
      { label: "Fracionado", image: img("queijo-tropical-fracionado") },
    ],
    accent: "amber",
    badges: ["Inspeção Federal", "Sem lactose", "Sem glúten"],
    uses: ["Com goiabada", "Tábua de queijos", "Ralado na tapioca"],
    servingSize: "30 g (1 fatia)",
    nutrition: [
      { label: "Valor energético", amount: "80 kcal", vd: "4%" },
      { label: "Carboidratos", amount: "1 g", vd: "0%" },
      { label: "Açúcares totais", amount: "0 g", vd: "—" },
      { label: "Açúcares adicionados", amount: "0 g", vd: "0%" },
      { label: "Proteínas", amount: "6 g", vd: "12%" },
      { label: "Gorduras totais", amount: "6 g", vd: "9%" },
      { label: "Gorduras saturadas", amount: "4 g", vd: "20%" },
      { label: "Gorduras trans", amount: "0 g", vd: "0%" },
      { label: "Fibra alimentar", amount: "0 g", vd: "0%" },
      // PDF traz 155 mg num rótulo e 115 mg noutro; 383 mg/100 g → 115 mg em 30 g
      { label: "Sódio", amount: "115 mg", vd: "6%" },
      { label: "Cálcio", amount: "155 mg", vd: "16%" },
    ],
  },
  {
    id: "ricota",
    brand: "Laticínios Conquista",
    name: "Ricota Fresca",
    category: "Ricota",
    tagline: "Leve, macia e cheia de possibilidades.",
    description:
      "Ricota fresca Conquista, de massa leve e sabor suave. Vai bem em recheios, pastas, saladas e receitas doces.",
    image: img("ricota"),
    accent: "green",
    badges: ["Inspeção Federal", "Fresca", "Baixo teor de gordura"],
    uses: ["Recheio de massas", "Pastinhas", "Cheesecake"],
    servingSize: "30 g (1 fatia)",
    nutrition: [
      { label: "Valor energético", amount: "41 kcal", vd: "2%" },
      { label: "Carboidratos", amount: "0,9 g", vd: "0%" },
      { label: "Açúcares totais", amount: "0,9 g", vd: "—" },
      { label: "Açúcares adicionados", amount: "0 g", vd: "0%" },
      { label: "Proteínas", amount: "3,9 g", vd: "8%" },
      { label: "Gorduras totais", amount: "2,4 g", vd: "4%" },
      { label: "Gorduras saturadas", amount: "1 g", vd: "5%" },
      { label: "Gorduras trans", amount: "0 g", vd: "0%" },
      { label: "Fibra alimentar", amount: "0 g", vd: "0%" },
      { label: "Sódio", amount: "72 mg", vd: "4%" },
    ],
  },
  {
    id: "requeijao",
    brand: "Laticínios Conquista",
    name: "Requeijão Cremoso Tradicional",
    category: "Derivado",
    tagline: "Cremoso de passar e de rechear.",
    description:
      "Requeijão cremoso tradicional Conquista, no copo de 180 g. Perfeito no pão, na torrada e nas receitas que pedem cremosidade.",
    image: img("requeijao-180"),
    accent: "green",
    badges: ["Inspeção Federal", "180 g", "Tradicional"],
    uses: ["Pão e torrada", "Recheio de salgados", "Molho branco"],
    servingSize: "30 g (2 colheres de sopa)",
    nutrition: [
      { label: "Valor energético", amount: "78 kcal", vd: "4%" },
      { label: "Carboidratos", amount: "1,0 g", vd: "0%" },
      { label: "Proteínas", amount: "2,7 g", vd: "5%" },
      { label: "Gorduras totais", amount: "7,1 g", vd: "11%" },
      { label: "Gorduras saturadas", amount: "4,4 g", vd: "20%" },
      { label: "Sódio", amount: "150 mg", vd: "8%" },
    ],
  },
  {
    id: "manteiga",
    brand: "ConLeite",
    name: "Manteiga com Sal",
    category: "Derivado",
    tagline: "Textura e sabor da verdadeira manteiga.",
    description:
      "Manteiga de primeira qualidade com sal ConLeite, produzida a partir do creme do nosso leite. Aquele aroma e sabor que transformam o pão da manhã num momento especial.",
    image: img("manteiga-500"),
    variants: sizes("manteiga", ["500", "200"]),
    accent: "amber",
    badges: ["Inspeção Federal", "500 g · 200 g", "Com sal"],
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
