import HomePage from "@/components/HomePage";
import { dicts } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  lang: "es", path: "/es/", enPath: "/", esPath: "/es/",
  title: "Reyes Tires Pro | Llantas usadas y nuevas en Escondido, CA",
  description: "Llantas y rines usados y nuevos en Juniper y Pennsylvania, Escondido. Montaje, balanceo, reparación, rotación y TPMS. Mándenos su medida por WhatsApp o llame al (442) 999-5014.",
});

export default function Page() { return <HomePage t={dicts.es} />; }
