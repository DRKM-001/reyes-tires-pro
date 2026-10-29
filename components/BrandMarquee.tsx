import type { Dict } from "@/lib/i18n";
import { site } from "@/lib/site";

// Brand names as type. Logo files can replace them later.
export default function BrandMarquee({ t }: { t: Dict }) {
  const row = [...site.brands, ...site.brands, ...site.brands];
  return (
    <div className="overflow-hidden border-b border-sand-200/10 bg-ink-950 py-5">
      <p className="container-x mb-3 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-blaze-500">{t.marquee}</p>
      <div className="relative flex w-max animate-marquee items-center gap-10 whitespace-nowrap motion-reduce:animate-none" aria-hidden="true">
        {[...row, ...row].map((b, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-xl font-semibold uppercase tracking-wide text-sand-200/80">{b}</span>
            <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-royal-500" />
          </span>
        ))}
      </div>
      <p className="sr-only">{site.brands.join(", ")}</p>
    </div>
  );
}
