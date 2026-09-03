"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { match } from "@/lib/match";

const SAMPLE = `We are looking for a mid-level full-stack engineer.

Requirements:
- Strong TypeScript and React, ideally Next.js
- Experience with SQL databases
- Comfortable writing tests and caring about performance
- Bonus: experience with a CMS, or with AI features in production
- Nice to have: Docker, AWS`;

export default function RoleMatch() {
  const [ad, setAd] = useState("");
  const result = useMemo(() => match(ad), [ad]);

  return (
    <div data-part="match" className="frame bg-film-hi">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-line px-3 py-1.5">
        <span className="label text-[12px] text-film">Role match</span>
        <span className="label text-[12px] text-film/70">
          runs locally · nothing is sent
        </span>
      </div>

      <div className="border-b border-line p-3">
        <label className="label mb-1.5 block text-[11px] text-dim">
          Paste a job ad
        </label>
        <textarea
          value={ad}
          onChange={(e) => setAd(e.target.value)}
          rows={7}
          placeholder="Paste the requirements section and the table fills in as you type."
          className="frame-dim w-full resize-y bg-film px-3 py-2 text-[15px] leading-relaxed outline-none placeholder:text-dim focus:border-blue"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            onClick={() => setAd(SAMPLE)}
            className="label border border-line px-3 py-1.5 text-[12px] transition-colors hover:border-blue hover:text-blue"
          >
            Use an example
          </button>
          {ad !== "" && (
            <button
              onClick={() => setAd("")}
              className="label border border-line px-3 py-1.5 text-[12px] transition-colors hover:border-blue hover:text-blue"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="min-h-[10rem] p-4">
        {!result.ready && (
          <p className="text-[15px] text-dim">
            Nothing yet. Paste at least a couple of lines.
          </p>
        )}

        {result.ready && result.hits.length === 0 && result.gaps.length === 0 && (
          <p className="text-[15px] text-dim">
            No overlap found. Either the ad is for something I have not done, or
            it is written in words my list does not know yet.
          </p>
        )}

        {result.hits.length > 0 && (
          <>
            <h3 className="label mb-3 text-[11px] text-dim">
              Covered · {result.hits.length}
            </h3>
            <ul className="flex flex-col">
              {result.hits.map(({ skill, phrases }) => (
                <li
                  key={skill.id}
                  className="border-b border-dim/25 py-3.5 last:border-0"
                >
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-cond text-xl font-medium">{skill.name}</span>
                    <span className="label text-[11px] text-dim">
                      matched: {phrases.map((p) => p.trim()).join(", ")}
                    </span>
                  </div>
                  <ul className="mt-2 flex flex-col gap-2">
                    {skill.evidence.map((e) => (
                      <li key={e.text} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 bg-blue" />
                        <span className="text-[15px] leading-relaxed text-dim">
                          {e.text}
                          {e.project && (
                            <Link
                              href={`/work/${e.project}`}
                              className="label ml-2 text-[11px] text-blue underline underline-offset-4"
                            >
                              open
                            </Link>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </>
        )}

        {result.gaps.length > 0 && (
          <div className="mt-6">
            <h3 className="label mb-3 text-[11px] text-dim">
              Asked for, and I do not have it
            </h3>
            <ul className="flex flex-wrap gap-2">
              {result.gaps.map((g) => (
                <li
                  key={g}
                  className="label border border-blue px-2.5 py-1 text-[12px] text-blue"
                >
                  {g}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[15px] text-dim">
              Listed rather than hidden. If one of these is a hard requirement,
              you have saved yourself an interview.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
