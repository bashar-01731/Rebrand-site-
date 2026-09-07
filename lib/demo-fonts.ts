import { Bodoni_Moda, Oswald, Space_Grotesk } from "next/font/google";

/**
 * Extra families used only by the concept demos.
 *
 * Imported from the concept route alone, never from the root layout, so the
 * landing page never pays for fonts it does not render. Weights are pinned to
 * exactly what each demo uses.
 */

/** ÉLAN — high-contrast didone. Jewelry, quiet and precious. */
export const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-bodoni",
});

/** VOID — condensed grotesque. Barbershop, hard and loud. */
export const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-oswald",
});

/** ARC — technical grotesque. Real estate, structured and measured. */
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-grotesk",
});

export const demoFontVariables = [
  bodoni.variable,
  oswald.variable,
  spaceGrotesk.variable,
].join(" ");
