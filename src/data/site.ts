// === Dados institucionais — Laticínios Conquista ===
// Fonte: embalagens/banners da marca + dados de contato fornecidos.
// Itens marcados "a confirmar" devem ser validados com a empresa.

export const site = {
  brand: "Laticínios Conquista",
  brandShort: "Conquista",
  /** submarca presente em alguns produtos (manteiga, iogurte natural) */
  subBrand: "ConLeite",
  tagline: "Do campo para a sua mesa",
  description:
    "Laticínios Conquista — leite, bebida láctea, iogurte e manteiga produzidos em Vitória da Conquista, BA. Qualidade que se põe à mesa da família.",
  url: "https://conleite.com.br",
  email: "contato@conleite.com.br",
  phones: [
    { label: "(77) 3424-2285", tel: "+557734242285", whatsapp: true },
    { label: "(77) 3422-6423", tel: "+557734226423", whatsapp: false },
  ],
  whatsapp: {
    number: "557734242285",
    message: "Olá! Vim pelo site e gostaria de falar com a Laticínios Conquista.",
  },
  address: {
    street: "Distrito Industrial dos Imborés, Quadra Q3, Lotes 01, 02 e 03",
    extra: "Caixa Postal 85",
    city: "Vitória da Conquista",
    state: "BA",
    zip: "45000-000",
    country: "BR",
  },
  /** links a confirmar com a empresa */
  social: {
    instagram: "#",
    facebook: "#",
  },
  /** Google Maps embed centrado na cidade (a refinar com o endereço exato) */
  mapsEmbed:
    "https://www.google.com/maps?q=Distrito+Industrial+dos+Imbor%C3%A9s,+Vit%C3%B3ria+da+Conquista+-+BA&output=embed",
} as const;

export function whatsappLink() {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(site.whatsapp.message)}`;
}

export const fullAddress = `${site.address.street} — ${site.address.city}/${site.address.state}`;
