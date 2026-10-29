import type { Dict } from "@/lib/i18n";
import { businessSchema, faqSchema } from "@/lib/schema";
import Header from "./Header";
import Hero from "./Hero";
import BrandMarquee from "./BrandMarquee";
import ShopPanels from "./ShopPanels";
import Services from "./Services";
import Reviews from "./Reviews";
import Visit from "./Visit";
import Faq from "./Faq";
import Guides from "./Guides";
import Footer from "./Footer";
import ContactDock from "./ContactDock";
import JsonLd from "./JsonLd";

export default function HomePage({ t }: { t: Dict }) {
  return (
    <>
      <JsonLd data={businessSchema()} />
      <JsonLd data={faqSchema(t)} />
      <Header lang={t.lang} />
      <main id="main">
        <Hero t={t} />
        <BrandMarquee t={t} />
        <ShopPanels lang={t.lang} />
        <Services t={t} />
        <Reviews t={t} />
        <Visit lang={t.lang} />
        <Faq lang={t.lang} />
        <Guides t={t} />
      </main>
      <Footer t={t} />
      <ContactDock lang={t.lang} />
    </>
  );
}
