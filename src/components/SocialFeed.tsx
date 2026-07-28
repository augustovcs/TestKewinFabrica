interface Props {
  handle: string;
  instagram: string;
  socials: { label: string; href: string; path: string }[];
}

export default function SocialFeed({
  handle,
  socials,
}: Props) {
  return (
    <div>
      {/* Título + feed ficam ACIMA da linha divisória */}
      <div className="grid lg:grid-cols-[35%_65%] gap-8 lg:gap-12 items-start">
        <div>
          <span className="eyebrow">Redes sociais</span>

          <h2 className="font-display text-4xl md:text-[3rem] font-extrabold text-brand-green mt-4 leading-[0.98]">
            Conecte-se
            <br />
            com a gente
          </h2>
        </div>
        {/* Feed EmbedSocial — a largura de 900px é o que faz o embed usar o
            layout de 3 cards; abaixo disso ele cai p/ 1 card gigante.
            A altura precisa sobrar em relação ao conteúdo (~530px) senão o
            iframe cria barra de rolagem própria; scrolling="no" garante que
            ela não apareça de jeito nenhum. */}
        <div className="min-w-0">
          <iframe
            src="https://embedsocial.com/api/pro_hashtag/739d07504d0162fb98113b435b0e7b755b7a99d6"
            className="block w-[900px] max-w-[420px] lg:max-w-none h-[740px] lg:h-[600px] border-0"
            scrolling="no"
            loading="lazy"
            title="Feed do Instagram"
          />
        </div>
      </div>

      <div className="h-px bg-brand-green/20 mt-8" aria-hidden />

      {/* Texto + redes colados logo abaixo da linha */}
      <div className="mt-5">
        <p className="text-muted leading-relaxed max-w-xl">
          Receitas, bastidores e novidades da Laticínios Conquista. Siga{" "}
          <strong className="text-ink font-semibold">@{handle}</strong> e venha
          com a gente.
        </p>

        <div className="flex items-center gap-5 mt-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener"
              aria-label={s.label}
              className="text-brand-green hover:text-brand-pink hover:-translate-y-1 transition-transform"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
