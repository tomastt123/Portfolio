import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { clients, projects } from "@/lib/projects";

export default function Home() {
  return (
    <>
      {/* Sheet 01. The name is drawn like a part: annotated, dimensioned,
          with a title block in the corner. */}
      <section data-part="header" className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="frame bg-film-hi/60">
          <div className="flex items-center justify-between border-b border-line px-3 py-1.5">
            <span className="label text-[12px] text-dim">Sheet 01 — general view</span>
            <span className="label text-[12px] text-dim">Dwg. TT-2026</span>
          </div>

          <div className="grid gap-8 p-5 sm:p-10 lg:grid-cols-[1.35fr_1fr]">
            <div>
              <p className="label mb-5 text-[13px] text-blue">
                Software engineer · Vilnius
              </p>

              <h1
                data-part="name"
                className="font-cond text-[15vw] leading-[0.85] font-semibold tracking-tight uppercase sm:text-[9vw] lg:text-[6.6rem]"
              >
                Tomas
                <br />
                Tvarijonavičius
              </h1>

              <p className="mt-7 max-w-lg text-xl leading-relaxed text-dim">
                Most of what I build is the unglamorous kind. A maths problem
                generator that has to be right a hundred times out of a hundred.
                A ticketing tool. Client sites the clients can edit without me.
                Press <Kbd>I</Kbd> and this page will draw its own construction.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/demo"
                  className="label border border-line bg-line px-5 py-2.5 text-[13px] text-film transition-colors hover:border-blue hover:bg-blue"
                >
                  Run the engine
                </Link>
                <Link
                  href="/work"
                  className="label border border-line px-5 py-2.5 text-[13px] transition-colors hover:border-blue hover:text-blue"
                >
                  See the work
                </Link>
              </div>
            </div>

            <div data-part="title-block" className="self-end">
              <div className="frame grid grid-cols-2 gap-px bg-line/20">
                {[
                  ["Drawn by", "T. Tvarijonavičius"],
                  ["Location", "Vilnius, LT"],
                  ["Scale", "1:1"],
                  ["Rev", "B"],
                  ["Material", "TypeScript"],
                  ["Sheets", `0${projects.length}`],
                ].map(([k, v]) => (
                  <div key={k} className="bg-film-hi px-3 py-2">
                    <div className="label text-[11px] text-dim">{k}</div>
                    <div className="font-cond text-lg">{v}</div>
                  </div>
                ))}
              </div>
              <p className="label mt-3 text-[12px] leading-relaxed text-dim">
                Command bar: ⌘K / Ctrl K
                <br />
                Inspect mode: I
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The work list is a drawing register, not a wall of cards. */}
      <section data-part="register" className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <Reveal className="mb-5 flex items-end justify-between gap-4">
          <h2 className="font-cond text-3xl font-semibold uppercase sm:text-4xl">
            Sheet index
          </h2>
          <Link
            href="/work"
            className="label text-[13px] text-dim transition-colors hover:text-blue"
          >
            All →
          </Link>
        </Reveal>

        <div className="frame overflow-x-auto bg-film-hi">
          <table className="w-full min-w-[38rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-line bg-line text-film">
                <th className="label px-3 py-2 text-[11px] font-medium">No.</th>
                <th className="label px-3 py-2 text-[11px] font-medium">Title</th>
                <th className="label px-3 py-2 text-[11px] font-medium">Material</th>
                <th className="label px-3 py-2 text-[11px] font-medium">Year</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr
                  key={p.slug}
                  data-part={`row-${p.numeris}`}
                  className="group border-b border-dim/25 last:border-0 hover:bg-blue hover:text-film"
                >
                  <td className="label px-3 py-3 align-top text-[13px] text-dim group-hover:text-film/80">
                    {p.numeris}
                  </td>
                  <td className="px-3 py-3 align-top">
                    <Link href={`/work/${p.slug}`} className="block">
                      <span className="font-cond text-2xl font-medium">{p.title}</span>
                      {p.demo && (
                        <span className="label ml-2 border border-blue px-1 text-[11px] text-blue group-hover:border-film group-hover:text-film">
                          Live demo
                        </span>
                      )}
                      <span className="mt-0.5 block max-w-xl text-[15px] text-dim group-hover:text-film/85">
                        {p.summary}
                      </span>
                    </Link>
                  </td>
                  <td className="px-3 py-3 align-top">
                    <span className="label text-[12px] text-dim group-hover:text-film/80">
                      {p.stack.slice(0, 3).join(" · ")}
                    </span>
                  </td>
                  <td className="label px-3 py-3 align-top text-[12px] text-dim group-hover:text-film/80">
                    {p.year}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section data-part="clients" className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <Reveal>
          <h2 className="label mb-5 text-[13px] text-dim">Clients</h2>
          <div className="frame flex flex-wrap items-center justify-around gap-8 bg-film-hi px-6 py-8">
            {clients.map((c) => (
              <div key={c.name} className="relative h-10 w-28 sm:h-12 sm:w-36">
                <Image
                  src={c.logo}
                  alt={c.name}
                  fill
                  sizes="150px"
                  className="object-contain opacity-50 mix-blend-multiply grayscale transition-opacity hover:opacity-95"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section
        id="about"
        data-part="about"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-20 sm:px-6"
      >
        <div className="frame grid gap-0 bg-film-hi md:grid-cols-[1.4fr_1fr]">
          <div className="border-b border-line p-6 sm:p-8 md:border-r md:border-b-0">
            <h2 className="label mb-5 text-[13px] text-dim">About</h2>
            <div className="flex flex-col gap-4 text-xl leading-relaxed">
              <p>
                Self-taught. I came to programming through digital marketing,
                which is an odd route, but a useful one. It got me used to
                caring whether the words on a page work, not only whether the
                component renders.
              </p>
              <p>
                Now I write the whole chain: TypeScript and Next.js at the
                front, C# and SQL behind it. The latest thing I have built is{" "}
                <Link
                  href="/work/vardiklis"
                  className="text-blue underline decoration-blue/40 underline-offset-4 hover:decoration-blue"
                >
                  Vardiklis
                </Link>
                , and its engine runs on this site rather than sitting in a
                screenshot.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="https://www.linkedin.com/in/tomastt/"
                target="_blank"
                rel="noreferrer"
                className="label border border-line px-4 py-2 text-[13px] transition-colors hover:border-blue hover:text-blue"
              >
                LinkedIn
              </Link>
              <Link
                href="https://github.com/tomastt123/"
                target="_blank"
                rel="noreferrer"
                className="label border border-line px-4 py-2 text-[13px] transition-colors hover:border-blue hover:text-blue"
              >
                GitHub
              </Link>
            </div>
          </div>

          <div className="relative min-h-[18rem]">
            <Image
              src="/images/Tomas_photo.jpg"
              alt="Tomas Tvarijonavičius"
              fill
              sizes="(max-width: 768px) 100vw, 34vw"
              className="object-cover grayscale"
            />
          </div>
        </div>
      </section>

      <section
        id="contact"
        data-part="contact"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-20 sm:px-6"
      >
        <Reveal>
          <div className="frame hatch">
            <div className="m-px bg-film-hi p-8 text-center sm:p-14">
              <h2 className="font-cond text-4xl font-semibold uppercase sm:text-6xl">
                Let&apos;s build something
              </h2>
              <p className="mx-auto mt-4 max-w-md text-lg text-dim">
                Email gets to me fastest, and I answer everything.
              </p>
              <Link
                href="mailto:tomas.tvarijonavicius@gmail.com"
                className="label mt-7 inline-block border border-line bg-line px-6 py-3 text-[13px] text-film transition-colors hover:border-blue hover:bg-blue"
              >
                tomas.tvarijonavicius@gmail.com
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="label frame-dim bg-film px-1.5 py-0.5 text-[12px] text-line">
      {children}
    </kbd>
  );
}
