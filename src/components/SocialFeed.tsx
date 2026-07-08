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

  // Card central maior (1.05), laterais recuadas (0.94) — 3 visíveis, laterais cortadas
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
        const t = Math.max(0, 1 - Math.abs(cc - center) / (c.offsetWidth * 1.15));
        c.style.transform = `scale(${0.94 + 0.11 * t})`;
        c.style.zIndex = String(10 + Math.round(t * 10));
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    requestAnimationFrame(() => {
      const c = cards.current[1];
      if (c) el.scrollLeft = c.offsetLeft + c.offsetWidth / 2 - el.clientWidth / 2;
      update();
    });
    return () => { el.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [posts]);

  const scrollByCard = (d: number) => {
    const el = track.current;
    if (!el) return;
    const w = (cards.current[0]?.offsetWidth ?? 230) + 16;
    el.scrollBy({ left: d * w, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Linha de acento horizontal — atravessa a section inteira no meio, atrás de tudo */}
      <div className="hidden lg:block absolute inset-x-0 top-1/2 h-px bg-brand-green/15 pointer-events-none z-0" aria-hidden />

      <div className="relative z-10 grid lg:grid-cols-[35%_65%] gap-10 lg:gap-12 items-stretch">
        {/* Esquerda: split topo (título) / base (descrição + sociais) */}
        <div className="flex flex-col justify-between min-h-[360px]">
          <div>
            <span className="eyebrow">Redes sociais</span>
            <h2 className="font-display text-4xl md:text-[3rem] font-extrabold text-brand-green mt-4 leading-[0.98]">
              Conecte-se<br />com a gente
            </h2>
          </div>
          <div>
            <p className="text-muted leading-relaxed max-w-sm">
              Receitas, bastidores e novidades da Laticínios Conquista. Siga
              <strong className="text-ink font-semibold"> @{handle}</strong> e venha com a gente.
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

        {/* Direita: carrossel (3 visíveis, laterais cortadas) */}
        <div className="self-center min-w-0">
          <div ref={track} className="flex gap-4 overflow-hidden" style={{ paddingLeft: "calc(50% - 115px)", paddingRight: "calc(50% - 115px)" }}>
            {posts.map((p, i) => (
              <a
                ref={(n) => (cards.current[i] = n)}
                key={p.id}
                href={p.permalink}
                target="_blank"
                rel="noopener"
                className="group shrink-0 w-[200px] sm:w-[230px] my-6 rounded-[18px] overflow-hidden relative bg-brand-green-ink shadow-xl shadow-black/10 will-change-transform"
                style={{ aspectRatio: "9 / 16", transition: "transform .4s cubic-bezier(.22,1,.36,1)" }}
              >
                <img src={p.img} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />

                {/* header overlay: avatar + @handle + logo IG */}
                <div className="absolute top-0 inset-x-0 p-2.5 flex items-center gap-2 bg-gradient-to-b from-black/45 to-transparent">
                  <span className="w-6 h-6 rounded-full bg-brand-green ring-2 ring-white/80 flex items-center justify-center text-white text-[10px] font-extrabold">C</span>
                  <span className="text-white text-[11px] font-semibold drop-shadow truncate">@{handle}</span>
                  <IgIcon className="w-4 h-4 text-white ml-auto shrink-0" />
                </div>

                {/* bottom overlay: gradiente + curtidas (heart) no canto inferior direito */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                {nf(p.likes) && (
                  <div className="absolute bottom-2.5 right-3 flex items-center gap-1 text-white">
                    <HeartIcon className="w-4 h-4 drop-shadow" />
                    <span className="text-xs font-semibold drop-shadow">{nf(p.likes)}</span>
                  </div>
                )}
              </a>
            ))}
          </div>

          {/* setas nuas, canto inferior direito da coluna dos cards */}
          <div className="flex items-center justify-end gap-6 mt-2 pr-1">
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
