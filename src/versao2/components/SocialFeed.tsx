import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Ícones inline (lucide-react 1.16 não exporta todos)
const IgIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
const HeartIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 21s-7.5-4.9-10-9.2C.3 8.6 1.6 5 5 5c2 0 3.2 1.2 4 2.3C9.8 6.2 11 5 13 5c3.4 0 4.7 3.6 3 6.8C19.5 16.1 12 21 12 21Z" /></svg>
);

interface Post {
  id: string;
  img: string;
  permalink: string;
  isVideo?: boolean;
  likes?: number | null;
  comments?: number | null;
  shares?: number | null;
}

interface Props {
  feedId?: string;
  handle: string;
  instagram: string;
  posts: Post[]; // snapshot real dos últimos posts (hardcoded, sem auth)
  socials: { label: string; href: string; path: string }[];
  /** eyebrow acima do título */
  eyebrow?: string;
  /** título — use "\n" para quebrar em 2 linhas */
  title?: string;
  /** texto de apoio; "{handle}" é substituído pelo @handle */
  description?: string;
}

const GAP = 40; // px entre cards
const nf = (n?: number | null) => (n == null ? null : n >= 1000 ? (n / 1000).toFixed(1).replace(".0", "") + "k" : String(n));

export default function SocialFeed({
  feedId,
  handle,
  instagram,
  posts: initial,
  socials,
  eyebrow = "Redes sociais",
  title = "Conecte-se\ncom a gente",
  description = "Receitas, bastidores e novidades da Laticínios Conquista. Siga {handle} e venha com a gente.",
}: Props) {
  const titleLines = title.split("\n");
  const descParts = description.split("{handle}");
  const [posts, setPosts] = useState<Post[]>(initial);
  const [index, setIndex] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLAnchorElement | null)[]>([]);

  // Behold.io (opcional): se configurado, sobrepõe o snapshot com feed ao vivo.
  useEffect(() => {
    if (!feedId) return;
    let alive = true;
    fetch(`https://feeds.behold.so/${feedId}`)
      .then((r) => r.json())
      .then((data) => {
        if (!alive) return;
        const items: any[] = Array.isArray(data) ? data : data.posts || [];
        const mapped: Post[] = items.map((it, i) => ({
          id: it.id || "p" + i,
          img: it.sizes?.medium?.mediaUrl || it.thumbnailUrl || it.mediaUrl,
          permalink: it.permalink || instagram,
          isVideo: it.mediaType === "VIDEO",
          likes: it.likeCount ?? it.likesCount,
          comments: it.commentsCount ?? it.commentCount,
        }));
        if (mapped.length) setPosts(mapped);
      })
      .catch(() => {});
    return () => { alive = false; };
  }, [feedId]);

  // 2 cards inteiros por vez (sem corte); avança 1 por vez.
  useEffect(() => {
    const layout = () => {
      const w = wrap.current, tk = track.current;
      if (!w || !tk) return;
      const cardW = (w.clientWidth - GAP) / 2; // 2 cards cabem exatos
      cards.current.forEach((c) => { if (c) c.style.width = `${cardW}px`; });
      tk.style.transform = `translateX(${-index * (cardW + GAP)}px)`;
    };
    layout();
    window.addEventListener("resize", layout);
    return () => window.removeEventListener("resize", layout);
  }, [index, posts]);

  const maxIndex = Math.max(0, posts.length - 2);
  const go = (d: number) => setIndex((i) => Math.min(maxIndex, Math.max(0, i + d)));

  return (
    <div className="relative">
      {/* Listra horizontal no meio — atravessa a section inteira, atrás de tudo */}
      <div className="hidden lg:block absolute inset-x-0 top-1/2 h-[2px] bg-brand-green/20 pointer-events-none z-0" aria-hidden />

      <div className="relative z-10 grid lg:grid-cols-[35%_65%] gap-10 lg:gap-12 items-stretch">
        {/* Esquerda: split topo (título) / base (descrição + sociais) */}
        <div className="flex flex-col justify-between min-h-[420px] lg:min-h-[560px]">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="font-display text-4xl md:text-[3rem] font-extrabold text-brand-green mt-4 leading-[0.98]">
              {titleLines.map((line, i) => (
                <Fragment key={i}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </h2>
          </div>
          <div>
            <p className="text-muted leading-relaxed max-w-sm">
              {descParts[0]}
              {descParts.length > 1 && <strong className="text-ink font-semibold">@{handle}</strong>}
              {descParts[1]}
            </p>
            <div className="flex items-center gap-5 mt-6">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label}
                  className="text-brand-green hover:text-brand-pink hover:-translate-y-1 transition-transform" style={{ transitionTimingFunction: "var(--ease-spring)" }}>
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Direita: 2 cards inteiros por vez */}
        <div className="self-center min-w-0">
          <div ref={wrap} className="overflow-hidden">
            <div ref={track} className="flex will-change-transform" style={{ gap: `${GAP}px`, transition: "transform .5s cubic-bezier(.22,1,.36,1)" }}>
              {posts.map((p, i) => (
                <a
                  ref={(n) => (cards.current[i] = n)}
                  key={p.id}
                  href={p.permalink}
                  target="_blank"
                  rel="noopener"
                  className="group shrink-0 rounded-[22px] overflow-hidden relative bg-brand-green-ink shadow-2xl shadow-black/15"
                  style={{ aspectRatio: "9 / 16" }}
                >
                  <img src={p.img} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

                  {/* header overlay: avatar + @handle + logo IG */}
                  <div className="absolute top-0 inset-x-0 p-3.5 flex items-center gap-2.5 bg-gradient-to-b from-black/45 to-transparent">
                    <span className="w-8 h-8 rounded-full bg-brand-green ring-2 ring-white/80 flex items-center justify-center text-white text-xs font-extrabold">C</span>
                    <span className="text-white text-sm font-semibold drop-shadow truncate">@{handle}</span>
                    <IgIcon className="w-5 h-5 text-white ml-auto shrink-0" />
                  </div>

                  {/* bottom overlay: gradiente + curtidas (heart) canto inferior direito */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  {nf(p.likes) && (
                    <div className="absolute bottom-3.5 right-4 flex items-center gap-1.5 text-white">
                      <HeartIcon className="w-5 h-5 drop-shadow" />
                      <span className="text-sm font-semibold drop-shadow">{nf(p.likes)}</span>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* setas nuas, canto inferior direito */}
          <div className="flex items-center justify-end gap-6 mt-4 pr-1">
            <button onClick={() => go(-1)} aria-label="Anterior" disabled={index === 0} className="text-brand-green hover:text-brand-green-deep transition-transform hover:-translate-x-0.5 disabled:opacity-30">
              <ChevronLeft className="w-7 h-7" strokeWidth={2.5} />
            </button>
            <button onClick={() => go(1)} aria-label="Próximo" disabled={index === maxIndex} className="text-brand-green hover:text-brand-green-deep transition-transform hover:translate-x-0.5 disabled:opacity-30">
              <ChevronRight className="w-7 h-7" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
