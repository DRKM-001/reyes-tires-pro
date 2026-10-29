import { SizesHub } from "@/components/SizePage";
import { pageMeta } from "@/lib/meta";
export const metadata = pageMeta({ lang: "en", path: "/tires/", enPath: "/tires/", esPath: "/es/llantas/",
  title: "Tire Sizes: Used & New Tires in Escondido, CA | Reyes Tires Pro",
  description: "Used and new tires in every size except large farm tires: passenger, SUV, light truck, off-road and commercial. Send your size for a quote." });
export default function Page() { return <SizesHub lang="en" />; }
