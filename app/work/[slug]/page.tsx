import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import LiveEngine from "@/components/LiveEngine";
import { asset } from "@/lib/asset";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      images: project.cover ? [{ url: asset(project.cover) }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
      <Link href="/work" className="label text-[13px] text-dim hover:text-blue">
        ← Work
      </Link>

      <header data-part="header" className="mt-6">
        <span className="label bg-line px-1.5 py-0.5 text-[12px] text-film">
          Sheet {project.numeris}
        </span>
        <h1 className="mt-4 font-cond text-5xl leading-none font-semibold uppercase sm:text-7xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-dim">
          {project.tagline}
        </p>
      </header>

      <dl
        data-part="spec"
        className="frame mt-8 grid grid-cols-2 gap-px bg-line/20 sm:grid-cols-4"
      >
        {[
          ["Year", project.year],
          ["Role", project.role],
          ["Material", project.stack.join(", ")],
          ["Scale", "1:1"],
        ].map(([k, v]) => (
          <div key={k} className="bg-film-hi px-3 py-2.5">
            <dt className="label text-[11px] text-dim">{k}</dt>
            <dd className="mt-0.5 text-[15px] leading-snug">{v}</dd>
          </div>
        ))}
      </dl>

      {(project.live || project.repo) && (
        <div className="mt-5 flex flex-wrap gap-3">
          {project.live && (
            <Link
              href={project.live.href}
              target="_blank"
              rel="noreferrer"
              className="label border border-line bg-line px-5 py-2.5 text-[13px] text-film transition-colors hover:border-blue hover:bg-blue"
            >
              {project.live.label} ↗
            </Link>
          )}
          {project.repo && (
            <Link
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="label border border-line px-5 py-2.5 text-[13px] transition-colors hover:border-blue hover:text-blue"
            >
              Source ↗
            </Link>
          )}
          {project.demo && (
            <Link
              href="/demo"
              className="label border border-blue px-5 py-2.5 text-[13px] text-blue transition-colors hover:bg-blue hover:text-film"
            >
              Run the engine →
            </Link>
          )}
        </div>
      )}

      {project.figures && (
        <div
          data-part="figures"
          className="frame mt-10 grid grid-cols-2 gap-px bg-line/20 sm:grid-cols-4"
        >
          {project.figures.map((f) => (
            <div key={f.label} className="bg-film-hi px-4 py-5">
              <div className="font-cond text-4xl leading-none font-semibold">
                {f.value}
              </div>
              <div className="label mt-2 text-[11px] leading-snug text-dim">
                {f.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {project.context && (
        <Section nr="A" name="Context">
          <p className="max-w-3xl text-lg leading-relaxed">{project.context}</p>
        </Section>
      )}

      {project.constraints && (
        <Section nr="B" name="Constraints">
          <ol className="flex max-w-3xl flex-col">
            {project.constraints.map((c, i) => (
              <li key={i} className="flex gap-4 border-b border-dim/25 py-3 last:border-0">
                <span className="label shrink-0 text-[12px] text-blue">B{i + 1}</span>
                <span className="leading-relaxed">{c}</span>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {project.rejected && (
        <Section nr="C" name="What I turned down">
          <div className="frame grid gap-px bg-line/20 md:grid-cols-2">
            {project.rejected.map((r) => (
              <div key={r.decision} className="bg-film-hi p-5">
                <h3 className="font-cond text-xl font-medium">
                  <span className="mr-2 text-blue">✕</span>
                  {r.decision}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-dim">{r.why}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {project.features && (
        <Section nr="A" name="What it does">
          <p className="mb-5 max-w-3xl text-lg leading-relaxed">{project.summary}</p>
          <ul className="flex max-w-3xl flex-col">
            {project.features.map((f, i) => (
              <li key={f} className="flex gap-4 border-b border-dim/25 py-3 last:border-0">
                <span className="label shrink-0 text-[12px] text-blue">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {project.demo && (
        <Section nr="D" name="The engine, running here">
          <LiveEngine />
        </Section>
      )}

      {project.images.length > 0 && (
        <Section nr={project.demo ? "E" : "B"} name="Views">
          <Gallery images={project.images} title={project.title} />
        </Section>
      )}

      <Link
        href={`/work/${next.slug}`}
        className="frame group mt-16 flex items-center justify-between gap-6 bg-film-hi p-5 transition-colors hover:border-blue sm:p-7"
      >
        <div>
          <span className="label text-[12px] text-dim">Next sheet · {next.numeris}</span>
          <div className="font-cond text-3xl font-semibold uppercase transition-colors group-hover:text-blue sm:text-4xl">
            {next.title}
          </div>
        </div>
        <span className="text-2xl transition-transform group-hover:translate-x-1.5">→</span>
      </Link>
    </article>
  );
}

/** A section lettered the way a drawing numbers its views. */
function Section({
  nr,
  name,
  children,
}: {
  nr: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <section data-part={`section-${nr}`} className="mt-14">
      <h2 className="mb-5 flex items-center gap-3 border-b border-line pb-2">
        <span className="label bg-line px-1.5 py-0.5 text-[12px] text-film">{nr}</span>
        <span className="font-cond text-2xl font-medium uppercase">{name}</span>
      </h2>
      {children}
    </section>
  );
}
