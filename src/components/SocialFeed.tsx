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
    <div className="relative">
      {/* Linha horizontal */}
      <div
        className="hidden lg:block absolute inset-x-0 top-1/2 h-[2px] bg-brand-green/20 pointer-events-none z-0"
        aria-hidden
      />

      <div className="relative z-10 grid lg:grid-cols-[35%_65%] gap-10 lg:gap-12 items-stretch">
        {/* Lado esquerdo */}
        <div className="flex flex-col justify-between min-h-[420px] lg:min-h-[560px]">
          <div>
            <span className="eyebrow">Redes sociais</span>

            <h2 className="font-display text-4xl md:text-[3rem] font-extrabold text-brand-green mt-4 leading-[0.98]">
              Conecte-se
              <br />
              com a gente
            </h2>
          </div>

          <div>
            <p className="text-muted leading-relaxed max-w-sm">
              Receitas, bastidores e novidades da Laticínios Conquista.
              Siga{" "}
              <strong className="text-ink font-semibold">
                @{handle}
              </strong>{" "}
              e venha com a gente.
            </p>

            <div className="flex items-center gap-5 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={s.label}
                  className="text-brand-green hover:text-brand-pink hover:-translate-y-1 transition-transform"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Feed EmbedSocial — a largura de 900px é o que faz o embed usar o
            layout de 3 cards; abaixo disso ele cai p/ 1 card gigante.
            A altura precisa sobrar em relação ao conteúdo (~530px) senão o
            iframe cria barra de rolagem própria; scrolling="no" garante que
            ela não apareça de jeito nenhum. */}
        <div className="self-center min-w-0">
          <iframe
            src="https://embedsocial.com/api/pro_hashtag/739d07504d0162fb98113b435b0e7b755b7a99d6"
            className="block w-[900px] max-w-[420px] lg:max-w-none h-[740px] lg:h-[600px] border-0"
            scrolling="no"
            loading="lazy"
            title="Feed do Instagram"
          />
        </div>
      </div>
    </div>
  );
}