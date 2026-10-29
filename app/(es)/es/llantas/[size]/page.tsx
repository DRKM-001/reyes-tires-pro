import { notFound } from "next/navigation";
import SizePage, { sizeMeta } from "@/components/SizePage";
import { allSizes, findSize, sizeHref } from "@/lib/sizes";
import { pageMeta } from "@/lib/meta";

export const dynamicParams = false;
export function generateStaticParams() { return allSizes().map((f) => ({ size: f.slug })); }
export function generateMetadata({ params }: { params: { size: string } }) {
  const f = findSize(params.size)!;
  return pageMeta({ lang: "es", path: sizeHref(f, "es"), enPath: sizeHref(f, "en"), esPath: sizeHref(f, "es"), ...sizeMeta("es", f) });
}
export default function Page({ params }: { params: { size: string } }) {
  const f = findSize(params.size); if (!f) notFound();
  return <SizePage lang="es" f={f} />;
}
