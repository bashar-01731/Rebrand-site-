import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import ConceptsGrid from "@/components/ConceptsGrid";
import CaseStudies from "@/components/CaseStudies";
import Pricing from "@/components/Pricing";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Hero />
        <ConceptsGrid />
        <CaseStudies />
        <Pricing />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
