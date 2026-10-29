import { TireBasics } from "@/components/GuidePages";
import { dicts } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
export const metadata = pageMeta({ lang: "en", type: "article", path: "/tire-basics/", enPath: "/tire-basics/", esPath: "/es/llantas-basico/",
  title: "Tire Basics: Used vs New, Tread Depth and When to Replace | Reyes Tires Pro",
  description: "Plain answers about used vs new tires, tread depth, tire age and when to replace. Reyes Tires Pro, Escondido, CA. Call (442) 999-5014." });
export default function Page() { return <TireBasics t={dicts.en} />; }
