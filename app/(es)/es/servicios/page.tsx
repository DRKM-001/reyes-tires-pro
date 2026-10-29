import { ServicesHub } from "@/components/ServicePage";
import { pageMeta } from "@/lib/meta";
export const metadata = pageMeta({ lang: "es", path: "/es/servicios/", enPath: "/services/", esPath: "/es/servicios/",
  title: "Servicios de llantas en Escondido, CA | Reyes Tires Pro",
  description: "Llantas usadas y nuevas, rines, montaje, balanceo, reparación de ponchaduras, rotación y TPMS en Juniper y Pennsylvania, Escondido. Abierto los 7 días." });
export default function Page() { return <ServicesHub lang="es" />; }
