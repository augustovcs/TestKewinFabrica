interface Props {
  handle: string;
  instagram: string;
}

const INSTAGRAM_PATH =
  "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z";

export default function SocialFeed({ handle, instagram }: Props) {
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

      {/* Texto + Instagram colados logo abaixo da linha */}
      <div className="mt-5">
        <p className="text-muted leading-relaxed max-w-xl">
          Receitas, bastidores e novidades da Laticínios Conquista. Siga{" "}
          <strong className="text-ink font-semibold">@{handle}</strong> e venha
          com a gente.
        </p>

        <a
          href={instagram}
          target="_blank"
          rel="noopener"
          aria-label="Instagram"
          className="inline-flex mt-3 text-brand-green hover:text-brand-pink hover:-translate-y-1 transition-transform"
        >
          <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
            <path d={INSTAGRAM_PATH} />
          </svg>
        </a>
      </div>
    </div>
  );
}
