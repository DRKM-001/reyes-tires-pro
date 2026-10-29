import HomePage from "@/components/HomePage";
import { dicts } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  lang: "en", path: "/", enPath: "/", esPath: "/es/",
  title: "Reyes Tires Pro | Used & New Tires and Wheels in Escondido, CA",
  description: "Used and new tires and wheels at Juniper & Pennsylvania in Escondido. Installation, balancing, repair, rotation and TPMS. Send your tire size on WhatsApp or call (442) 999-5014.",
});

export default function Page() { return <HomePage t={dicts.en} />; }
