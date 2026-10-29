import { notFound } from "next/navigation";
import ServicePage from "@/components/ServicePage";
import { services, findService, serviceHref } from "@/lib/services";
import { pageMeta } from "@/lib/meta";

export const dynamicParams = false;
export function generateStaticParams() { return services.map((s) => ({ slug: s.slug.en })); }
export function generateMetadata({ params }: { params: { slug: string } }) {
  const s = findService("en", params.slug)!;
  return pageMeta({ lang: "en", path: serviceHref(s, "en"), enPath: serviceHref(s, "en"), esPath: serviceHref(s, "es"), title: s.copy.en.metaTitle, description: s.copy.en.metaDesc });
}
export default function Page({ params }: { params: { slug: string } }) {
  const s = findService("en", params.slug); if (!s) notFound();
  return <ServicePage lang="en" svc={s} />;
}
