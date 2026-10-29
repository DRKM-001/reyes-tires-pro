import { site } from "@/lib/site";

// Type-only wordmark until the shop provides its logo files.
export default function Wordmark({ dark = false, banner = false }: { dark?: boolean; banner?: boolean }) {
  const inner = (
    <span className="relative z-10 flex flex-col leading-none">
      <span className={`whitespace-nowrap font-display text-2xl font-bold italic uppercase tracking-tight sm:text-[28px] ${dark ? "text-sand-50" : "text-stone-950"}`}>
        Reyes Tires <span className="text-blaze-500">Pro</span>
      </span>
      <span className={`mt-0.5 text-[9px] font-bold italic uppercase tracking-[0.3em] sm:text-[10px] ${dark ? "text-royal-400" : "text-royal-500"}`}>
        {site.slogan}
      </span>
    </span>
  );
  if (!banner) return inner;
  return (
    <span className="relative inline-flex items-center px-5 py-1.5">
      <span className="absolute inset-0 -skew-x-[14deg] bg-stone-850" />
      {inner}
    </span>
  );
}
