import Link from "next/link";
import { ArrowLeft } from "@/components/icons";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-screen items-center">
      <div className="u-container">
        <p className="t-label text-silver">404</p>
        <h1 className="t-h2 mt-6 max-w-2xl">
          That page doesn&apos;t exist — but six complete ones do.
        </h1>
        <p className="mt-6 max-w-md text-dim">
          Head back to the concepts and open one. They&apos;re live sites, not
          screenshots.
        </p>
        <Link
          href="/#work"
          className="group mt-10 inline-flex min-h-13 items-center gap-2.5 bg-bone px-8 py-3.5 text-sm font-medium text-ink transition-opacity hover:opacity-88"
        >
          <ArrowLeft className="text-lg transition-transform duration-300 group-hover:-translate-x-1" />
          Back to RE:BRAND
        </Link>
      </div>
    </main>
  );
}
