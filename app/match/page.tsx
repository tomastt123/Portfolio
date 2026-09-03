import type { Metadata } from "next";
import RoleMatch from "@/components/RoleMatch";

export const metadata: Metadata = {
  title: "Role match",
  description:
    "Paste a job ad and get back the specific work that covers each requirement, plus the gaps.",
};

export default function MatchPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-24 pb-8 sm:px-6">
      <h1 className="font-cond text-5xl leading-none font-semibold uppercase sm:text-7xl">
        Role match
      </h1>
      <p className="mt-5 text-xl leading-relaxed text-dim">
        Paste a job ad. The page reads it against what I have actually built and
        gives you a requirement-by-requirement answer, with the gaps listed too.
      </p>

      <div className="mt-8">
        <RoleMatch />
      </div>

      <section data-part="note" className="frame mt-10 bg-film-hi p-5 sm:p-6">
        <h2 className="label mb-3 text-[12px] text-dim">Why there is no model in this</h2>
        <div className="flex flex-col gap-3 text-[15px] leading-relaxed text-dim">
          <p>
            An LLM would need an API key, a server to hold it, and a cost per
            visit. For this job it would land in the same place. Job ads reuse a
            small vocabulary, so a synonym map covers them, and the whole thing
            runs in your browser.
          </p>
          <p>
            That has a second benefit. Whatever you paste stays on your machine.
            No request goes out, so an unpublished ad does not end up in
            anyone&apos;s logs.
          </p>
          <p>
            The honest limitation: it matches words, so it will miss a
            requirement phrased in a way the list has not seen. It also cannot
            weigh a requirement or judge how much of it I have. If you want that
            conversation, email me.
          </p>
        </div>
      </section>
    </div>
  );
}
