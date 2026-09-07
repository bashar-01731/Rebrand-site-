import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { CONCEPT_SLUGS, getConcept, type ConceptSlug } from "@/lib/concepts";
import { demoFontVariables } from "@/lib/demo-fonts";
import DemoShell from "@/components/demo/DemoShell";
import WhatsAppButton from "@/components/WhatsAppButton";

/**
 * Each concept demo is its own route, so it deep-links, shares, and works with
 * the browser Back button — an overlay-only implementation would break all
 * three, which is the single most common flaw in "interactive portfolio" sites.
 *
 * The six site components are loaded through a keyed dynamic import so a
 * visitor to /concepts/noir downloads NOIR and none of the other five.
 */
const SITES: Record<ConceptSlug, React.ComponentType> = {
  noir: dynamic(() => import("@/components/demo/sites/Noir")),
  ember: dynamic(() => import("@/components/demo/sites/Ember")),
  form: dynamic(() => import("@/components/demo/sites/Form")),
  elan: dynamic(() => import("@/components/demo/sites/Elan")),
  arc: dynamic(() => import("@/components/demo/sites/Arc")),
  void: dynamic(() => import("@/components/demo/sites/Void")),
};

export function generateStaticParams() {
  return CONCEPT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const concept = getConcept(slug);
  if (!concept) return { title: "Concept not found" };

  return {
    title: `${concept.name} — ${concept.industry} concept`,
    description: `${concept.tagline} A live concept website designed and built by RE:BRAND.`,
    openGraph: {
      title: `${concept.name} — a ${concept.industry.toLowerCase()} concept by RE:BRAND`,
      description: concept.tagline,
    },
  };
}

export default async function ConceptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = getConcept(slug);
  if (!concept) notFound();

  const Site = SITES[concept.slug];

  return (
    <div className={demoFontVariables}>
      <main id="main">
        <DemoShell concept={concept}>
          <Site />
        </DemoShell>
      </main>
      <WhatsAppButton />
    </div>
  );
}
