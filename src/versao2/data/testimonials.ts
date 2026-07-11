// === Depoimentos ===
// PLACEHOLDER — estes depoimentos são ilustrativos, para validar o layout.
// Substituir por depoimentos reais de clientes/parceiros (com autorização
// de uso do nome e da empresa) antes de publicar.

export interface Testimonial {
  name: string;
  company: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Cliente parceiro",
    company: "Mercado de bairro · Vitória da Conquista",
    quote:
      "O leite chega fresquinho e no horário certo. Nossos clientes já pedem a Conquista pelo nome.",
  },
  {
    name: "Cliente parceiro",
    company: "Padaria · Região de Conquista",
    quote:
      "Trabalhamos com a manteiga ConLeite há tempos — sabor que não muda e entrega que a gente pode confiar.",
  },
  {
    name: "Cliente parceiro",
    company: "Distribuidora · Sudoeste da Bahia",
    quote:
      "Atendimento próximo e produção séria. É bom ter um fornecedor da região com esse padrão.",
  },
];
