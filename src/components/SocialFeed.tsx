import { useEffect, useRef, useState } from "react";
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
const CommentIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 11.5a8.5 8.5 0 0 1-11.9 7.8L3 21l1.7-5.1A8.5 8.5 0 1 1 21 11.5Z" /></svg>
);
const ShareIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" /></svg>
);
const PlayIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M8 5v14l11-7L8 5Z" /></svg>
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
}

const nf = (n?: number | null) => (n == null ? null : n >= 1000 ? (n / 1000).toFixed(1).replace(".0", "") + "k" : String(n));

export default function SocialFeed({ feedId, handle, instagram, posts: initial, socials }: Props) {
  const [posts, setPosts] = useState<Post[]>(initial);
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

  // Cover-flow leve: card central um pouco maior
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const center = el.scrollLeft + el.clientWidth / 2;
      cards.current.forEach((c) => {
        if (!c) return;
        const cc = c.offsetLeft + c.offsetWidth / 2;
        const t = Math.max(0, 1 - Math.abs(cc - center) / (c.offsetWidth * 1.3));
        c.style.transform = `scale(${0.9 + 0.12 * t})`;
        c.style.zIndex = String(10 + Math.round(t * 10));
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    requestAnimationFrame(update);
    return () => { el.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [posts]);

  const scrollByCard = (d: number) => {
    const el = track.current;
    if (!el) return;
    const w = (cards.current[0]?.offsetWidth ?? 220) + 16;
    el.scrollBy({ left: d * w, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Linha de acento horizontal cruzando atrás do conteúdo (mid-height) */}
      <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-px bg-brand-green/15 pointer-events-none" aria-hidden />

      <div className="relative grid lg:grid-cols-[minmax(0,340px)_1fr] gap-10 lg:gap-14 items-center">
        {/* Esquerda: título + descrição + sociais */}
        <div>
          <span className="eyebrow">Redes sociais</span>
          <h2 className="font-display text-4xl md:text-[3rem] font-extrabold text-brand-green mt-4 leading-[0.98]">
            Conecte-se<br />com a gente
          </h2>
          <p className="text-muted leading-relaxed mt-5 max-w-sm">
            Receitas, bastidores e novidades da Laticínios Conquista. Siga
            <strong className="text-ink font-semibold"> @{handle}</strong> e venha com a gente.
          </p>
          <div className="flex items-center gap-5 mt-7">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label}
                className="text-brand-green hover:text-brand-pink hover:-translate-y-1 transition-transform" style={{ transitionTimingFunction: "var(--ease-spring)" }}>
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d={s.path} /></svg>
              </a>
            ))}
          </div>
        </div>

        {/* Direita: carrossel de mídia */}
        <div className="min-w-0">
          <div ref={track} className="flex gap-4 overflow-x-auto pt-6 pb-8 snap-x snap-mandatory scrollbar-none" style={{ scrollbarWidth: "none" }}>
            {posts.map((p, i) => (
              <a
                ref={(n) => (cards.current[i] = n)}
                key={p.id}
                href={p.permalink}
                target="_blank"
                rel="noopener"
                className="group shrink-0 w-[220px] sm:w-[240px] snap-center origin-center rounded-[20px] overflow-hidden relative bg-brand-green-ink shadow-xl shadow-black/10 will-change-transform"
                style={{ aspectRatio: "9 / 16", transition: "transform .35s cubic-bezier(.22,1,.36,1)" }}
              >
                <img src={p.img} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

                {/* top-left: avatar + username */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-brand-green ring-2 ring-white/80 flex items-center justify-center text-white text-xs font-extrabold">C</span>
                  <span className="text-white text-xs font-semibold drop-shadow">@{handle}</span>
                </div>
                {/* top-right: IG logo */}
                <IgIcon className="absolute top-3 right-3 w-5 h-5 text-white drop-shadow" />

                {/* play se vídeo */}
                {p.isVideo && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-white/25 backdrop-blur flex items-center justify-center">
                      <PlayIcon className="w-6 h-6 text-white" />
                    </span>
                  </span>
                )}

                {/* métricas empilhadas na borda direita */}
                <div className="absolute right-2.5 bottom-3 flex flex-col items-center gap-3 text-white">
                  <span className="flex flex-col items-center leading-none">
                    <HeartIcon className="w-5 h-5 drop-shadow" />
                    {nf(p.likes) && <span className="text-[10px] mt-0.5">{nf(p.likes)}</span>}
                  </span>
                  <span className="flex flex-col items-center leading-none">
                    <CommentIcon className="w-5 h-5 drop-shadow" />
                    {nf(p.comments) && <span className="text-[10px] mt-0.5">{nf(p.comments)}</span>}
                  </span>
                  <span className="flex flex-col items-center leading-none">
                    <ShareIcon className="w-5 h-5 drop-shadow" />
                    {nf(p.shares) && <span className="text-[10px] mt-0.5">{nf(p.shares)}</span>}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* setas nuas, alinhadas à direita */}
          <div className="flex items-center justify-end gap-6 mt-1 pr-1">
            <button onClick={() => scrollByCard(-1)} aria-label="Anterior" className="text-brand-green hover:text-brand-green-deep transition-transform hover:-translate-x-0.5">
              <ChevronLeft className="w-7 h-7" strokeWidth={2.5} />
            </button>
            <button onClick={() => scrollByCard(1)} aria-label="Próximo" className="text-brand-green hover:text-brand-green-deep transition-transform hover:translate-x-0.5">
              <ChevronRight className="w-7 h-7" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
