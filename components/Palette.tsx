"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/projects";

type Irasas = {
  id: string;
  pavadinimas: string;
  grupe: string;
  klavisas?: string;
  veiksmas: () => void;
};

/**
 * Komandų juosta. ⌘K arba Ctrl+K atidaro, rodyklės renka, Enter vykdo.
 * Visa navigacija pasiekiama neatitraukiant rankų nuo klaviatūros.
 */
export default function Palette() {
  const [atviras, setAtviras] = useState(false);
  const [uzklausa, setUzklausa] = useState("");
  const [zymeklis, setZymeklis] = useState(0);
  const router = useRouter();
  const laukasRef = useRef<HTMLInputElement>(null);
  const sarasasRef = useRef<HTMLUListElement>(null);

  const irasai = useMemo<Irasas[]>(() => {
    const eik = (kelias: string) => () => router.push(kelias);
    return [
      { id: "home", pavadinimas: "Home", grupe: "Navigation", veiksmas: eik("/") },
      { id: "work", pavadinimas: "Work", grupe: "Navigation", veiksmas: eik("/work") },
      { id: "demo", pavadinimas: "Live engine", grupe: "Navigation", veiksmas: eik("/demo") },
      { id: "match", pavadinimas: "Role match", grupe: "Navigation", veiksmas: eik("/match") },
      ...projects.map((p) => ({
        id: p.slug,
        pavadinimas: p.title,
        grupe: "Projects",
        veiksmas: eik(`/work/${p.slug}`),
      })),
      {
        id: "inspect",
        pavadinimas: "Toggle inspect mode",
        grupe: "Actions",
        klavisas: "I",
        veiksmas: () =>
          window.dispatchEvent(new KeyboardEvent("keydown", { key: "i" })),
      },
      {
        id: "email",
        pavadinimas: "Copy email address",
        grupe: "Actions",
        veiksmas: () =>
          navigator.clipboard?.writeText("tomas.tvarijonavicius@gmail.com"),
      },
      {
        id: "github",
        pavadinimas: "GitHub",
        grupe: "Links",
        veiksmas: () => window.open("https://github.com/tomastt123/", "_blank"),
      },
      {
        id: "linkedin",
        pavadinimas: "LinkedIn",
        grupe: "Links",
        veiksmas: () => window.open("https://www.linkedin.com/in/tomastt/", "_blank"),
      },
    ];
  }, [router]);

  const rasti = useMemo(() => {
    const u = uzklausa.trim().toLowerCase();
    if (!u) return irasai;
    // Paprasta neištisinė paieška: raidės turi eiti ta pačia tvarka.
    return irasai.filter((i) => {
      const t = i.pavadinimas.toLowerCase();
      let j = 0;
      for (const r of u) {
        j = t.indexOf(r, j);
        if (j === -1) return false;
        j += 1;
      }
      return true;
    });
  }, [uzklausa, irasai]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setAtviras((v) => !v);
        setUzklausa("");
        setZymeklis(0);
      }
      if (e.key === "Escape") setAtviras(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (atviras) laukasRef.current?.focus();
  }, [atviras]);

  // Žymeklis visada turi likti matomas sąraše.
  useEffect(() => {
    sarasasRef.current?.children[zymeklis]?.scrollIntoView({ block: "nearest" });
  }, [zymeklis]);

  if (!atviras) return null;

  const vykdyk = (i: Irasas) => {
    setAtviras(false);
    i.veiksmas();
  };

  const navigacija = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setZymeklis((z) => (z + 1) % Math.max(rasti.length, 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setZymeklis((z) => (z - 1 + rasti.length) % Math.max(rasti.length, 1));
    }
    if (e.key === "Enter" && rasti[zymeklis]) {
      e.preventDefault();
      vykdyk(rasti[zymeklis]);
    }
  };

  let paskutineGrupe = "";

  return (
    <div
      className="fixed inset-0 z-[95] flex items-start justify-center bg-line/25 px-4 pt-[14vh]"
      onClick={() => setAtviras(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command bar"
        className="frame w-full max-w-lg bg-film-hi shadow-[6px_6px_0_0_var(--color-line)]"
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="label text-[12px] text-dim">CMD</span>
          <input
            ref={laukasRef}
            value={uzklausa}
            onChange={(e) => {
              // Pasikeitus užklausai sąrašas kitas, tad žymeklis grįžta į viršų.
              setUzklausa(e.target.value);
              setZymeklis(0);
            }}
            onKeyDown={navigacija}
            placeholder="Search…"
            className="w-full bg-transparent text-[15px] outline-none placeholder:text-dim"
          />
          <kbd className="label frame-dim px-1.5 py-0.5 text-[12px] text-dim">ESC</kbd>
        </div>

        <ul ref={sarasasRef} className="max-h-[46vh] overflow-y-auto py-1">
          {rasti.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-dim">Nothing found</li>
          )}
          {rasti.map((i, idx) => {
            const naujaGrupe = i.grupe !== paskutineGrupe;
            paskutineGrupe = i.grupe;
            return (
              <li key={i.id}>
                {naujaGrupe && (
                  <div className="label px-4 pt-3 pb-1 text-[11px] text-dim">
                    {i.grupe}
                  </div>
                )}
                <button
                  onMouseEnter={() => setZymeklis(idx)}
                  onClick={() => vykdyk(i)}
                  className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm ${
                    idx === zymeklis ? "bg-blue text-film" : "hover:bg-film-lo"
                  }`}
                >
                  {i.pavadinimas}
                  {i.klavisas && (
                    <kbd
                      className={`label border px-1.5 text-[12px] ${
                        idx === zymeklis ? "border-film/50" : "border-dim/50 text-dim"
                      }`}
                    >
                      {i.klavisas}
                    </kbd>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
