"use client";

import "katex/dist/katex.min.css";
import { useCallback, useState } from "react";
import MathText from "./MathText";
import { aprasai, generatoriai, suSekla } from "@/lib/vardiklis";
import { auditas, ivairove, type Ataskaita } from "@/lib/vardiklis/auditas";
import type { Lygis, Uzdavinys } from "@/lib/vardiklis/tipai";

type Tab = "problem" | "json" | "audit";

const BATCH = 100;

type Batch = {
  errors: number;
  unique: number;
  total: number;
  worst: number;
  ms: number;
};

type Result = { u: Uzdavinys; report: Ataskaita };

/**
 * The first problem is seeded rather than random, so the server and the
 * browser draw the same one and hydration matches without any tricks. It is
 * the same function Vardiklis uses to reproduce "variant 7" in a PDF.
 */
function initial(): Result {
  const u = suSekla("initial", () => generatoriai.dalumas(2, 7));
  return { u, report: auditas(u) };
}

/**
 * Vardiklis running in the page. The generators, the seeded randomness and the
 * audit are the real thing, lifted from the project with only the import paths
 * changed. The only difference is that here they run in the browser.
 */
export default function LiveEngine() {
  const [key, setKey] = useState("dalumas");
  const [level, setLevel] = useState<Lygis>(2);
  const [year, setYear] = useState(7);
  const [seed, setSeed] = useState("");
  const [result, setResult] = useState<Result>(initial);
  const [tab, setTab] = useState<Tab>("problem");
  const [batch, setBatch] = useState<Batch | null>(null);

  const { u, report } = result;

  const generate = useCallback(() => {
    const g = generatoriai[key];
    const make = () => g(level, year);
    const next = seed.trim() ? suSekla(seed.trim(), make) : make();
    setResult({ u: next, report: auditas(next) });
    setBatch(null);
  }, [key, level, year, seed]);

  /** What `npm run patikra` does in the project, run here instead. */
  const runBatch = () => {
    const g = generatoriai[key];
    const started = performance.now();
    const set: Uzdavinys[] = [];
    let errors = 0;
    for (let i = 0; i < BATCH; i += 1) {
      const n = g(level, year);
      set.push(n);
      errors += auditas(n).klaidu;
    }
    const div = ivairove(set);
    setBatch({
      errors,
      unique: div.unikalus,
      total: div.visi,
      worst: div.dazniausias,
      ms: Math.round(performance.now() - started),
    });
    setTab("audit");
  };

  const meta = aprasai.find((a) => a.raktas === key);

  return (
    <div data-part="engine" className="frame bg-film-hi">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-line px-3 py-1.5">
        <span className="label text-[12px] text-film">Vardiklis engine, live</span>
        <span className="label text-[12px] text-film/70">
          year {meta ? meta.klase : "?"} / level {level}
        </span>
      </div>

      <div
        data-part="controls"
        className="grid gap-3 border-b border-line p-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        <label className="flex flex-col gap-1">
          <span className="label text-[11px] text-dim">Generator</span>
          <select
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="frame-dim bg-film px-2 py-1.5 text-[15px] outline-none focus:border-blue"
          >
            {aprasai.map((a) => (
              <option key={a.raktas} value={a.raktas}>
                {a.pavadinimas}: {a.tema}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-col gap-1">
          <span className="label text-[11px] text-dim">Level</span>
          <div className="frame-dim flex bg-film">
            {([1, 2] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`flex-1 py-1.5 text-[15px] transition-colors ${
                  level === l ? "bg-line text-film" : "hover:bg-film-lo"
                }`}
              >
                {l === 1 ? "Standard" : "Harder"}
              </button>
            ))}
          </div>
        </div>

        <label className="flex flex-col gap-1">
          <span className="label text-[11px] text-dim">School year: {year}</span>
          <input
            type="range"
            min={1}
            max={10}
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="accent-blue"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="label text-[11px] text-dim">Seed, optional</span>
          <input
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            placeholder="e.g. variant-7"
            className="frame-dim bg-film px-2 py-1.5 text-[15px] outline-none placeholder:text-dim focus:border-blue"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-line p-3">
        <button
          onClick={generate}
          className="label border border-line bg-line px-4 py-2 text-[13px] text-film transition-colors hover:border-blue hover:bg-blue"
        >
          Generate
        </button>
        <button
          onClick={runBatch}
          className="label border border-line px-4 py-2 text-[13px] transition-colors hover:border-blue hover:text-blue"
        >
          Audit &times;{BATCH}
        </button>
        {seed.trim() !== "" && (
          <span className="label self-center text-[12px] text-dim">
            Seeded. The same seed always returns the same problem.
          </span>
        )}
      </div>

      <div className="flex border-b border-line">
        {(
          [
            ["problem", "Problem"],
            ["json", "JSON profile"],
            ["audit", "Audit"],
          ] as const
        ).map(([k, name]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`label border-r border-line px-4 py-2 text-[12px] transition-colors ${
              tab === k ? "bg-film-lo text-line" : "text-dim hover:text-line"
            }`}
          >
            {name}
            {k === "audit" && report.klaidu > 0 && (
              <span className="ml-1.5 bg-blue px-1 text-film">{report.klaidu}</span>
            )}
          </button>
        ))}
      </div>

      <div className="min-h-[13rem] p-4">
        {tab === "problem" && (
          <div className="flex flex-col gap-4">
            <p className="text-xl leading-relaxed">
              <MathText text={u.klausimas} />
            </p>
            {u.brezinys && (
              <div
                className="max-w-sm [&_svg]:h-auto [&_svg]:w-full"
                dangerouslySetInnerHTML={{ __html: u.brezinys }}
              />
            )}
            <dl className="grid gap-3 border-t border-dim/40 pt-3 sm:grid-cols-[8rem_1fr]">
              <dt className="label text-[12px] text-dim">Answer</dt>
              <dd className="text-[15px]">
                <MathText text={u.atsakymasRodymui} />
                <span className="ml-2 text-dim">
                  normalised: <code className="font-mono text-[13px]">{u.atsakymas}</code>
                </span>
              </dd>
              {u.sprendimas && (
                <>
                  <dt className="label text-[12px] text-dim">Working</dt>
                  <dd className="text-[15px] text-dim">
                    <MathText text={u.sprendimas} />
                  </dd>
                </>
              )}
            </dl>
          </div>
        )}

        {tab === "json" && (
          <pre className="overflow-x-auto font-mono text-[13px] leading-relaxed text-dim">
            {JSON.stringify(u, null, 2)}
          </pre>
        )}

        {tab === "audit" && (
          <div className="flex flex-col gap-4">
            {batch && (
              <div
                data-part="batch"
                className="frame-dim grid grid-cols-2 gap-px bg-dim/30 sm:grid-cols-4"
              >
                {[
                  ["Errors", String(batch.errors)],
                  ["Unique shapes", `${batch.unique} / ${batch.total}`],
                  ["Most repeated", `${batch.worst}×`],
                  ["Took", `${batch.ms} ms`],
                ].map(([k, v]) => (
                  <div key={k} className="bg-film-hi px-3 py-2">
                    <div className="label text-[11px] text-dim">{k}</div>
                    <div className="font-cond text-2xl">{v}</div>
                  </div>
                ))}
              </div>
            )}

            <ul className="flex flex-col">
              {report.patikros.map((c) => (
                <li
                  key={c.vardas}
                  className="flex items-start gap-3 border-b border-dim/25 py-2.5 last:border-0"
                >
                  <span
                    className={`label mt-0.5 px-1 text-[11px] ${
                      c.praejo ? "bg-line text-film" : "bg-blue text-film"
                    }`}
                  >
                    {c.praejo ? "PASS" : "FAIL"}
                  </span>
                  <span className="flex-1 text-[15px]">
                    {CHECKS[c.vardas] ?? c.aprasas}
                    {c.detale && (
                      <span className="block font-mono text-[13px] text-blue">
                        {c.detale}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

/** English wording for the audit rules. The engine itself stays Lithuanian. */
const CHECKS: Record<string, string> = {
  siuksles: "No undefined, NaN or Infinity anywhere in the text",
  zenklai: "No unhandled sign pair such as 5 − −3",
  atsakymas: "Answer is not empty",
  normalizuotas: "Answer is already in canonical form",
  vardiklis: "Denominator is reasonable (≤ 20, or a decimal one)",
  mastas: "Number stays within school scale (≤ 10⁶)",
  katex: "KaTeX compiles every formula",
  brezinys: "Diagram is a complete SVG, where there is one",
};
