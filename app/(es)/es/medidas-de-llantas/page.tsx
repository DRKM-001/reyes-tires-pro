import { SizeGuide } from "@/components/GuidePages";
import { dicts } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
export const metadata = pageMeta({ lang: "es", type: "article", path: "/es/medidas-de-llantas/", enPath: "/tire-size-guide/", esPath: "/es/medidas-de-llantas/",
  title: "Cómo leer la medida de una llanta (225/45R17) | Reyes Tires Pro",
  description: "Cómo leer la medida de una llanta como 225/45R17: ancho, perfil, construcción, rin, índice de carga y velocidad. Reyes Tires Pro, Escondido, CA." });
export default function Page() { return <SizeGuide t={dicts.es} />; }
