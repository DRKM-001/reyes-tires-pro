import type { Metadata } from "next";
import ReviewPage from "@/components/ReviewPage";
export const metadata: Metadata = { title: "Deje una reseña | Reyes Tires Pro", robots: { index: false, follow: true } };
export default function Page() { return <ReviewPage lang="es" />; }
