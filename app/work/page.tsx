import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A maths problem generator, a conference site, a ticketing tool, systems software and client builds.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
      <h1 className="font-cond text-5xl leading-none font-semibold uppercase sm:text-7xl">
        Work
      </h1>
      <p className="mt-5 max-w-xl text-xl text-dim">
        Seven sheets. The first one comes with the engine attached, so you can
        run it instead of reading about it.
      </p>

      <div className="mt-10 flex flex-col gap-5">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.04}>
            <Link
              href={`/work/${p.slug}`}
              data-part={`sheet-${p.numeris}`}
              className="frame group grid gap-0 bg-film-hi transition-colors hover:border-blue sm:grid-cols-[1fr_15rem]"
            >
              <div className="p-5 sm:p-7">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="label bg-line px-1.5 py-0.5 text-[12px] text-film">
                    {p.numeris}
                  </span>
                  <span className="label text-[12px] text-dim">{p.year}</span>
                  {p.demo && (
                    <span className="label border border-blue px-1.5 text-[11px] text-blue">
                      Live demo
                    </span>
                  )}
                </div>

                <h2 className="font-cond text-3xl font-semibold uppercase transition-colors group-hover:text-blue sm:text-4xl">
                  {p.title}
                </h2>
                <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-dim">
                  {p.tagline}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <li key={s} className="label frame-dim px-2 py-0.5 text-[11px] text-dim">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative min-h-[9rem] border-t border-line sm:border-t-0 sm:border-l">
                {p.cover ? (
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="240px"
                    className="object-cover grayscale transition-all group-hover:grayscale-0"
                  />
                ) : (
                  <div className="hatch flex h-full items-center justify-center">
                    <span className="label bg-film-hi px-2 py-1 text-[11px] text-dim">
                      No image
                    </span>
                  </div>
                )}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
