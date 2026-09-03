import type { Metadata } from "next";
import Link from "next/link";
import LiveEngine from "@/components/LiveEngine";

export const metadata: Metadata = {
  title: "Live engine",
  description:
    "The Vardiklis problem generator, its audit and its seeded randomness, running in the browser.",
};

const LAYERS = [
  {
    nr: "1",
    name: "Seed",
    text: "Five lines of mulberry32 behind a switchable stream. The site runs on real randomness. Give it a seed and the same code turns deterministic, so a link to variant 7 returns the same sheet a year later.",
  },
  {
    nr: "2",
    name: "Generator",
    text: "Each topic holds several shapes of problem, not just changing numbers. A shape that produces something ugly gets thrown away and retried, up to fifty times, and only then does a fallback problem come out.",
  },
  {
    nr: "3",
    name: "Audit",
    text: "The rules that npm run patikra applies in the project: rubbish in the text, unhandled sign pairs, an answer that is not canonical, a denominator no child would meet, KaTeX that will not compile, an incomplete SVG.",
  },
];

export default function DemoPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-24 pb-8 sm:px-6">
      <div className="mb-6">
        <Link href="/work/vardiklis" className="label text-[13px] text-dim hover:text-blue">
          ← Vardiklis
        </Link>
      </div>

      <h1 className="font-cond text-5xl leading-none font-semibold uppercase sm:text-7xl">
        Live engine
      </h1>
      <p className="mt-5 max-w-2xl text-xl leading-relaxed text-dim">
        Real Vardiklis code runs below. The generators, the seeded randomness
        and the audit came across from the project untouched, with only the
        import paths rewritten. There are over a hundred generators in the
        product; three are here so the page stays light.
      </p>
      <p className="mt-3 max-w-2xl text-[15px] text-dim">
        The problems come out in Lithuanian, because that is the language the
        product is in.
      </p>

      <div className="mt-8">
        <LiveEngine />
      </div>

      <section data-part="layers" className="mt-12">
        <h2 className="label mb-4 text-[13px] text-dim">Three layers</h2>
        <div className="frame grid gap-px bg-line/20 md:grid-cols-3">
          {LAYERS.map((l) => (
            <div key={l.nr} className="bg-film-hi p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="label bg-line px-1.5 py-0.5 text-[12px] text-film">
                  {l.nr}
                </span>
                <span className="font-cond text-xl font-medium uppercase">{l.name}</span>
              </div>
              <p className="text-[15px] leading-relaxed text-dim">{l.text}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="label mt-6 text-[12px] leading-relaxed text-dim">
        Source:{" "}
        <Link
          href="https://github.com/Vardiklis/vardiklis"
          target="_blank"
          rel="noreferrer"
          className="text-blue underline underline-offset-4"
        >
          github.com/Vardiklis/vardiklis
        </Link>
      </p>
    </div>
  );
}
