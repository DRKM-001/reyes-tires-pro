import { TireBasics } from "@/components/GuidePages";
import { dicts } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
export const metadata = pageMeta({ lang: "es", type: "article", path: "/es/llantas-basico/", enPath: "/tire-basics/", esPath: "/es/llantas-basico/",
  title: "Llantas usadas o nuevas, dibujo y edad: lo básico | Reyes Tires Pro",
  description: "Respuestas claras sobre llantas usadas o nuevas, profundidad del dibujo, edad de la llanta y cuándo cambiarla. Reyes Tires Pro, Escondido, CA." });
export default function Page() { return <TireBasics t={dicts.es} />; }
