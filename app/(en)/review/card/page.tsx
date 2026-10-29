import type { Metadata } from "next";
import QRCode from "qrcode";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Review card (print) | Reyes Tires Pro", robots: { index: false, follow: false } };

// Printable counter card. The QR points to reyestirespro.com/review, so printed cards keep
// working even if the Google review link changes later.
export default async function Page() {
  const target = `${site.url}/review/`;
  const svg = await QRCode.toString(target, { type: "svg", margin: 1, errorCorrectionLevel: "M", color: { dark: "#0d0b08", light: "#ffffff" } });
  const Card = () => (
    <div className="card flex h-[4in] w-[6in] overflow-hidden rounded-xl border border-stone-300 bg-white">
      <div className="flex w-[3.4in] flex-col justify-between bg-blaze-700 p-5 text-white">
        <div>
          <p className="font-display text-2xl font-bold italic uppercase leading-none">Reyes Tires <span className="text-blaze-100">Pro</span></p>
          <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.3em] text-blaze-100">{site.slogan}</p>
        </div>
        <div>
          <p className="font-display text-[26px] font-bold uppercase leading-[1.05]">Thanks for coming in!</p>
          <p className="mt-2 text-[13px] leading-snug text-blaze-100">Scan to leave a quick review. It helps other drivers find us.</p>
          <p className="mt-3 font-display text-[20px] font-bold uppercase leading-[1.05]">¡Gracias por su visita!</p>
          <p className="mt-1 text-[13px] leading-snug text-blaze-100">Escanee para dejarnos una reseña.</p>
        </div>
        <p className="text-[11px] text-blaze-100">{site.address} · {site.phone}</p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-2 p-4">
        <div className="w-[2.2in]" dangerouslySetInnerHTML={{ __html: svg }} />
        <p className="font-display text-sm font-bold uppercase tracking-wide text-stone-850">★★★★★</p>
        <p className="text-[11px] text-stone-750">reyestirespro.com/review</p>
      </div>
    </div>
  );
  return (
    <main className="min-h-screen bg-sand-100 p-8 print:bg-white print:p-0">
      <style>{`@page { size: letter; margin: 0.5in; } @media print { .noprint { display: none } .card { break-inside: avoid; border-color: #ccc } }`}</style>
      <div className="noprint mx-auto mb-6 max-w-3xl text-stone-850">
        <h1 className="font-display text-3xl font-bold uppercase">Review card</h1>
        <p className="mt-1 text-sm">Print on letter paper (two 4×6 cards per page) or card stock, cut, and keep at the counter. Use your browser&apos;s Print (Cmd + P).</p>
      </div>
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6"><Card /><Card /></div>
    </main>
  );
}
