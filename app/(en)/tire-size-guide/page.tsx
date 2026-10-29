import { SizeGuide } from "@/components/GuidePages";
import { dicts } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
export const metadata = pageMeta({ lang: "en", type: "article", path: "/tire-size-guide/", enPath: "/tire-size-guide/", esPath: "/es/medidas-de-llantas/",
  title: "How to Read a Tire Size (225/45R17 Explained) | Reyes Tires Pro",
  description: "How to read a tire size like 225/45R17: width, aspect ratio, construction, wheel diameter, load index and speed rating. Reyes Tires Pro, Escondido, CA." });
export default function Page() { return <SizeGuide t={dicts.en} />; }
