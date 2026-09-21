import Section from './Section';
import Concepts from './Concepts';

interface ScrollExperienceProps {
  onStart: () => void;
}

/**
 * The seven stages of the experience, in the order the timeline moves through
 * them. Each one sits opposite where the 3D object travels at that progress,
 * so the copy always has clean ground under it.
 */
export default function ScrollExperience({ onStart }: ScrollExperienceProps) {
  return (
    <>
      <Section
        id="discover"
        num="02"
        eyebrow="Discover"
        align="left"
        heading={
          <>
            We start with
            <br />
            what you sell.
          </>
        }
        body="Before a single frame is drawn we work out how the business actually wins work, and what a stranger has to understand in the first ten seconds."
      />

      <Section
        id="detail"
        num="03"
        eyebrow="Detail"
        align="right"
        heading={
          <>
            Then the
            <br />
            small decisions.
          </>
        }
        body="Type scale, spacing rhythm, the weight of a rule, how a button answers the cursor. The work reads as considered because every one of these was."
      />

      <Section
        id="transformation"
        num="04"
        eyebrow="Transformation"
        align="left"
        heading={
          <>
            The shape
            <br />
            turns over.
          </>
        }
        body="Positioning becomes identity, identity becomes interface, interface becomes a build. Nothing is handed off and reinterpreted — it is the same argument the whole way down."
      />

      <Section
        id="close-up"
        num="05"
        eyebrow="Close-up"
        align="right"
        heading={
          <>
            Look at it
            <br />
            up close.
          </>
        }
        body="Hand-written front-end, no page builder underneath. It holds its edge at any zoom, on any device, on a bad connection."
      />

      <Section
        id="reveal"
        num="06"
        eyebrow="Reveal"
        align="center"
        heading={
          <>
            And it comes back
            <br />
            as one thing.
          </>
        }
        body="A brand that behaves the same everywhere it lands, because it was never assembled from parts that had not met."
      />

      <Concepts />

      <Section
        id="final"
        num="07"
        eyebrow="Final"
        align="center"
        heading={
          <>
            Your business
            <br />
            deserves better.
          </>
        }
      >
        <button
          type="button"
          onClick={onStart}
          className="group mt-4 flex h-14 items-center gap-3 rounded-full bg-ink px-9 text-[15px] text-bone transition-colors duration-300 hover:bg-ink/85"
        >
          Start a project
          <i
            className="bi bi-arrow-right text-[17px] leading-none transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>

        <p className="mt-2 text-[13px] text-ink/40">
          Tell us what you are launching. We will say plainly whether we are the right studio.
        </p>
      </Section>
    </>
  );
}
