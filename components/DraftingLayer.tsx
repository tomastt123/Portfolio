"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

type Matmenys = {
  x: number;
  y: number;
  w: number;
  h: number;
  vardas: string;
};

/** Ar pelė tiksli. Skaitoma per matchMedia, kad planšetėse sluoksnio nebūtų. */
function useSmulkusZymeklis(): boolean {
  return useSyncExternalStore(
    (praneska) => {
      const mq = window.matchMedia("(pointer: fine)");
      mq.addEventListener("change", praneska);
      return () => mq.removeEventListener("change", praneska);
    },
    () => window.matchMedia("(pointer: fine)").matches,
    () => false, // serveryje pelės nėra
  );
}

/**
 * Braižytojo sluoksnis: kryželis su gyvomis koordinatėmis ir apžiūros režimas,
 * kuriame užvedus ant bet kurios pažymėtos dalies aplink ją nubrėžiamos
 * matmenų linijos su tikrais px dydžiais.
 *
 * Kryželio pozicija rašoma tiesiai į DOM per `transform`, o ne per React
 * būseną: pelė siunčia šimtus įvykių per sekundę, ir kiekvieno jų perpiešimas
 * per React būtų matomas kaip vėlavimas.
 */
export default function DraftingLayer() {
  const veikia = useSmulkusZymeklis();
  const [apziura, setApziura] = useState(false);
  const [dalis, setDalis] = useState<Matmenys | null>(null);

  const vertRef = useRef<HTMLDivElement>(null);
  const horRef = useRef<HTMLDivElement>(null);
  const skaitiklisRef = useRef<HTMLDivElement>(null);

  const perjunk = useCallback(() => {
    setApziura((v) => !v);
    setDalis(null);
  }, []);

  // Kryželis ir koordinatės
  useEffect(() => {
    if (!veikia) return;

    document.documentElement.classList.add("crosshair");

    let laukia = false;
    let px = 0;
    let py = 0;

    const piesk = () => {
      laukia = false;
      if (vertRef.current) vertRef.current.style.transform = `translateX(${px}px)`;
      if (horRef.current) horRef.current.style.transform = `translateY(${py}px)`;
      if (skaitiklisRef.current) {
        // Prie krašto skaitliukas verčiamas į kitą pusę, kad neliptų už ekrano.
        const dx = px > window.innerWidth - 140 ? -128 : 14;
        const dy = py > window.innerHeight - 60 ? -34 : 14;
        skaitiklisRef.current.style.transform = `translate(${px + dx}px, ${py + dy}px)`;
        skaitiklisRef.current.textContent = `X ${Math.round(px)}  Y ${Math.round(
          py + window.scrollY,
        )}`;
      }
    };

    const move = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!laukia) {
        laukia = true;
        requestAnimationFrame(piesk);
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("crosshair");
    };
  }, [veikia]);

  // „i" įjungia ir išjungia apžiūrą
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "i" || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      perjunk();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [perjunk]);

  // Matuojama dalis po pele
  useEffect(() => {
    if (!apziura) return;

    const move = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-part]");
      if (!el) {
        setDalis(null);
        return;
      }
      const r = el.getBoundingClientRect();
      setDalis({
        x: Math.round(r.left),
        y: Math.round(r.top),
        w: Math.round(r.width),
        h: Math.round(r.height),
        vardas: el.getAttribute("data-part") ?? "",
      });
    };

    // Slenkant matmenys nustoja atitikti tikrovę, tad jie tiesiog nuimami.
    const nuslinko = () => setDalis(null);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", nuslinko, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", nuslinko);
    };
  }, [apziura]);

  if (!veikia) return null;

  return (
    <>
      {/* Kryželis */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[80]">
        <div ref={vertRef} className="absolute top-0 left-0 h-full w-px bg-dim/40" />
        <div ref={horRef} className="absolute top-0 left-0 h-px w-full bg-dim/40" />
        <div
          ref={skaitiklisRef}
          className="label absolute top-0 left-0 bg-line px-1.5 py-0.5 text-[12px] text-film tabular-nums"
        />
      </div>

      {/* Matmenų linijos */}
      {apziura && dalis && <Matavimas d={dalis} />}

      {/* Instrumentų juostelė */}
      <button
        onClick={perjunk}
        className={`label fixed right-4 bottom-4 z-[85] flex items-center gap-2 border px-3 py-2 text-[12px] transition-colors ${
          apziura
            ? "border-blue bg-blue text-film"
            : "border-line bg-film-hi text-line hover:border-blue hover:text-blue"
        }`}
      >
        <span className={`inline-block h-1.5 w-1.5 ${apziura ? "bg-film" : "bg-dim"}`} />
        Inspect
        <span className="frame-dim px-1 opacity-60">I</span>
      </button>
    </>
  );
}

/** Matmenų linijos aplink vieną dalį — kaip brėžinyje: išnašos, galai, dydis. */
function Matavimas({ d }: { d: Matmenys }) {
  const T = 9; // kiek matmenų linija atitraukta nuo detalės

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[75]">
      {/* Pačios detalės kontūras */}
      <div
        className="absolute border border-blue"
        style={{ left: d.x, top: d.y, width: d.w, height: d.h }}
      />

      {/* Horizontalus matmuo po detale */}
      <Isnasa x={d.x} y={d.y + d.h} ilgis={T + 10} vertikali />
      <Isnasa x={d.x + d.w} y={d.y + d.h} ilgis={T + 10} vertikali />
      <div
        className="absolute h-px bg-blue"
        style={{ left: d.x, top: d.y + d.h + T + 6, width: d.w }}
      />
      <Galas x={d.x} y={d.y + d.h + T + 6} />
      <Galas x={d.x + d.w} y={d.y + d.h + T + 6} />
      <div
        className="label absolute -translate-x-1/2 bg-blue px-1 text-[12px] text-film tabular-nums"
        style={{ left: d.x + d.w / 2, top: d.y + d.h + T + 10 }}
      >
        {d.w} px
      </div>

      {/* Vertikalus matmuo dešinėje */}
      <Isnasa x={d.x + d.w} y={d.y} ilgis={T + 10} />
      <Isnasa x={d.x + d.w} y={d.y + d.h} ilgis={T + 10} />
      <div
        className="absolute w-px bg-blue"
        style={{ left: d.x + d.w + T + 6, top: d.y, height: d.h }}
      />
      <Galas x={d.x + d.w + T + 6} y={d.y} />
      <Galas x={d.x + d.w + T + 6} y={d.y + d.h} />
      <div
        className="label absolute -translate-y-1/2 bg-blue px-1 text-[12px] text-film tabular-nums"
        style={{ left: d.x + d.w + T + 10, top: d.y + d.h / 2 }}
      >
        {d.h} px
      </div>

      {/* Detalės vardas — pozicijos išnaša viršuje kairėje */}
      <div
        className="label absolute bg-line px-1.5 py-0.5 text-[12px] text-film"
        style={{ left: d.x, top: d.y - 19 }}
      >
        {d.vardas}
      </div>
    </div>
  );
}

/** Pagalbinė išnašos linija nuo detalės krašto iki matmenų linijos. */
function Isnasa({
  x,
  y,
  ilgis,
  vertikali = false,
}: {
  x: number;
  y: number;
  ilgis: number;
  vertikali?: boolean;
}) {
  return (
    <div
      className="absolute bg-blue/50"
      style={
        vertikali
          ? { left: x, top: y, width: 1, height: ilgis }
          : { left: x, top: y, width: ilgis, height: 1 }
      }
    />
  );
}

/** Matmenų linijos galas — brėžinyje tai pasvirasis brūkšnelis, ne rodyklė. */
function Galas({ x, y }: { x: number; y: number }) {
  return (
    <div
      className="absolute h-[9px] w-px origin-center bg-blue"
      style={{ left: x, top: y - 4, transform: "rotate(45deg)" }}
    />
  );
}
