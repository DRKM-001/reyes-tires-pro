import { ServicesHub } from "@/components/ServicePage";
import { pageMeta } from "@/lib/meta";
export const metadata = pageMeta({ lang: "en", path: "/services/", enPath: "/services/", esPath: "/es/servicios/",
  title: "Tire Services in Escondido, CA | Reyes Tires Pro",
  description: "Used and new tires, wheels, tire installation, balancing, flat repair, rotation and TPMS repair at Juniper & Pennsylvania in Escondido. Open 7 days." });
export default function Page() { return <ServicesHub lang="en" />; }
