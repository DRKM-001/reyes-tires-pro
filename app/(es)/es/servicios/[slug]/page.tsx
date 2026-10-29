import { notFound } from "next/navigation";
import ServicePage from "@/components/ServicePage";
import { services, findService, serviceHref } from "@/lib/services";
import { pageMeta } from "@/lib/meta";

export const dynamicParams = false;
export function generateStaticParams() { return services.map((s) => ({ slug: s.slug.es })); }
export function generateMetadata({ params }: { params: { slug: string } }) {
  const s = findService("es", params.slug)!;
  return pageMeta({ lang: "es", path: serviceHref(s, "es"), enPath: serviceHref(s, "en"), esPath: serviceHref(s, "es"), title: s.copy.es.metaTitle, description: s.copy.es.metaDesc });
}
export default function Page({ params }: { params: { slug: string } }) {
  const s = findService("es", params.slug); if (!s) notFound();
  return <ServicePage lang="es" svc={s} />;
}
