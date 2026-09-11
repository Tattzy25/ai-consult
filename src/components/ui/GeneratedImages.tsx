import { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Heart,
  Share2,
  X,
} from "lucide-react";
import { cn } from "./lib/utils";

const PER_PAGE = 4;

type GeneratedImagesProps = {
  urls: string[];
  prompt?: string;
  onDismiss?: () => void;
};

export function GeneratedImages({ urls, prompt, onDismiss }: GeneratedImagesProps) {
  const [minimized, setMinimized] = useState(false);
  const [page, setPage] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [likes, setLikes] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState(false);

  const pages = Math.ceil(urls.length / PER_PAGE);
  const slice = urls.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const toggleLike = (index: number) => {
    setLikes((previous) => {
      const next = new Set(previous);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const share = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };

  const download = (url: string) => {
    fetch(url)
      .then((r) => r.blob())
      .then((blob) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `generate-image-${Date.now()}.webp`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      });
  };

  const iconBtn =
    "flex size-6 items-center justify-center rounded-full bg-white/10 text-zinc-300 transition hover:bg-white/20 hover:text-white";

  return (
    <>
      <div className="absolute bottom-24 left-1/2 z-30 w-[min(720px,92vw)] -translate-x-1/2">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/85 shadow-[0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <div className="flex items-center gap-2 px-3 py-2">
            <span className="size-1.5 rounded-full bg-violet-400" />
            <span className="text-[11px] font-semibold tracking-[0.14em] text-zinc-200">
              GENERATED
            </span>
            <span className="ml-auto text-[11px] text-zinc-500">
              {urls.length} {urls.length === 1 ? "image" : "images"}
            </span>
            <button
              type="button"
              className={iconBtn}
              onClick={() => setMinimized((m) => !m)}
              aria-label={minimized ? "Expand" : "Minimize"}
            >
              <ChevronDown
                size={14}
                className={cn("transition-transform", minimized && "rotate-180")}
              />
            </button>
            <button
              type="button"
              className={iconBtn}
              onClick={onDismiss}
              aria-label="Close"
            >
              <X size={14} />
            </button>
          </div>

          {!minimized && (
            <div className="p-2 pt-0">
              <div
                className="grid gap-2"
                style={{ gridTemplateColumns: `repeat(${slice.length}, minmax(0, 1fr))` }}
              >
                {slice.map((url, i) => {
                  const index = page * PER_PAGE + i;
                  return (
                    <div
                      key={url + index}
                      className="group relative cursor-pointer rounded-lg bg-white p-1.5"
                      onClick={() => setLightbox(index)}
                    >
                      <div className="aspect-square overflow-hidden rounded-md bg-zinc-100">
                        <img
                          src={url}
                          alt={prompt ?? "Generated image"}
                          className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                      <span className="absolute inset-x-1.5 bottom-1.5 flex justify-end gap-1 rounded-b-md bg-gradient-to-t from-black/70 to-transparent p-1 opacity-0 transition group-hover:opacity-100">
                        <button
                          type="button"
                          className="flex size-6 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/75"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(index);
                          }}
                        >
                          <Heart
                            size={12}
                            className={cn(likes.has(index) && "fill-red-400 text-red-400")}
                          />
                        </button>
                        <button
                          type="button"
                          className="flex size-6 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/75"
                          onClick={(e) => {
                            e.stopPropagation();
                            share(url);
                          }}
                        >
                          <Share2 size={12} />
                        </button>
                        <button
                          type="button"
                          className="flex size-6 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/75"
                          onClick={(e) => {
                            e.stopPropagation();
                            download(url);
                          }}
                        >
                          <Download size={12} />
                        </button>
                      </span>
                      {likes.has(index) && (
                        <span className="absolute left-3 top-3 flex size-6 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
                          <Heart size={12} className="fill-red-400 text-red-400" />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {pages > 1 && (
                <div className="flex items-center justify-center gap-3 py-2">
                  <button
                    type="button"
                    className={cn(iconBtn, page === 0 && "opacity-40")}
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    aria-label="Previous"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: pages }, (_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "h-1 rounded-full transition-all",
                          i === page ? "w-4 bg-white" : "w-1 bg-white/30"
                        )}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className={cn(iconBtn, page === pages - 1 && "opacity-40")}
                    onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
                    aria-label="Next"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-md"
          onClick={() => setLightbox(null)}
        >
          <div className="flex items-center gap-3 px-4 py-3" onClick={(e) => e.stopPropagation()}>
            <span className="truncate text-[13px] text-zinc-300">{prompt}</span>
            <button
              type="button"
              className={cn(iconBtn, "ml-auto")}
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <X size={14} />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center px-5">
            <img
              src={urls[lightbox]}
              alt={prompt ?? "Generated image"}
              className="max-h-full max-w-full rounded-xl shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div
            className="flex items-center justify-center gap-2 px-4 py-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={cn(
                "flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-white/20",
                likes.has(lightbox) && "border-red-400/40 bg-red-400/10 text-red-300"
              )}
              onClick={() => toggleLike(lightbox)}
            >
              <Heart size={13} className={cn(likes.has(lightbox) && "fill-red-400 text-red-400")} />
              {likes.has(lightbox) ? "Liked" : "Like"}
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-white/20"
              onClick={() => share(urls[lightbox])}
            >
              {copied ? <Check size={13} /> : <Share2 size={13} />}
              {copied ? "Copied" : "Share"}
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-white/20"
              onClick={() => download(urls[lightbox])}
            >
              <Download size={13} />
              Download
            </button>
          </div>
        </div>
      )}
    </>
  );
}
