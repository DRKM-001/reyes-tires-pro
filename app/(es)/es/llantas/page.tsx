import { SizesHub } from "@/components/SizePage";
import { pageMeta } from "@/lib/meta";
export const metadata = pageMeta({ lang: "es", path: "/es/llantas/", enPath: "/tires/", esPath: "/es/llantas/",
  title: "Medidas de llantas: usadas y nuevas en Escondido, CA | Reyes Tires Pro",
  description: "Llantas usadas y nuevas en todas las medidas menos agrícolas grandes: carro, SUV, camioneta, todoterreno y camión. Mande su medida para un precio." });
export default function Page() { return <SizesHub lang="es" />; }
