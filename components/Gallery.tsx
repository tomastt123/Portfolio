"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

/**
 * Vaizdų lapas su padidinimu. Atidarius: rodyklės perverčia, Esc uždaro.
 */
export default function Gallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [atviras, setAtviras] = useState(false);
  const [i, setI] = useState(0);

  const zingsnis = useCallback(
    (kryptis: number) =>
      setI((pr) => (pr + kryptis + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (!atviras) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAtviras(false);
      if (e.key === "ArrowRight") zingsnis(1);
      if (e.key === "ArrowLeft") zingsnis(-1);
    };

    // Fonas neturi slinkti, kol atidarytas padidinimas.
    const buves = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = buves;
    };
  }, [atviras, zingsnis]);

  return (
    <>
      <div className="frame grid gap-px bg-line/20 sm:grid-cols-2">
        {images.map((src, idx) => (
          <button
            key={src}
            onClick={() => {
              setI(idx);
              setAtviras(true);
            }}
            aria-label={`Open image ${idx + 1} of ${images.length}`}
            className="group relative aspect-[16/10] bg-film-hi"
          >
            <Image
              src={src}
              alt={`${title} — view ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
            />
            <span className="label absolute top-2 left-2 bg-line px-1.5 py-0.5 text-[11px] text-film">
              {String(idx + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      {atviras && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — views`}
          onClick={() => setAtviras(false)}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-line/90 p-4 sm:p-10"
        >
          <button
            onClick={() => setAtviras(false)}
            aria-label="Close"
            className="label absolute top-4 right-4 border border-film/40 px-2.5 py-1.5 text-[12px] text-film hover:border-film"
          >
            Esc
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              zingsnis(-1);
            }}
            aria-label="Previous"
            className="label absolute left-3 border border-film/40 px-3 py-2 text-film hover:border-film sm:left-6"
          >
            ←
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-[74vh] w-full max-w-5xl"
          >
            <Image
              src={images[i]}
              alt={`${title} — view ${i + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              zingsnis(1);
            }}
            aria-label="Next"
            className="label absolute right-3 border border-film/40 px-3 py-2 text-film hover:border-film sm:right-6"
          >
            →
          </button>

          <span className="label absolute bottom-5 text-[12px] text-film/70 tabular-nums">
            {i + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
