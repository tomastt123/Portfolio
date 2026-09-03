import Link from "next/link";

/**
 * Brėžinio kampinis įrašas. Tikrame brėžinyje jis yra apatiniame dešiniajame
 * kampe ir surašo, kas, kada ir kokiu masteliu braižė; čia jis eina per visą
 * puslapio apačią ir atlieka poraštės darbą.
 */

const LAUKAI = [
  { antraste: "Drawn by", reiksme: "T. Tvarijonavičius" },
  { antraste: "Location", reiksme: "Vilnius, LT" },
  { antraste: "Scale", reiksme: "1:1" },
  { antraste: "Rev", reiksme: "B" },
];

const NUORODOS = [
  { href: "https://github.com/tomastt123/", label: "GitHub" },
  { href: "https://www.linkedin.com/in/tomastt/", label: "LinkedIn" },
  { href: "mailto:tomas.tvarijonavicius@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer data-part="footer" className="mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="frame grid grid-cols-2 gap-px bg-line/20 sm:grid-cols-4">
          {LAUKAI.map((l) => (
            <div key={l.antraste} className="bg-film-hi px-3 py-2">
              <div className="label text-[11px] text-dim">{l.antraste}</div>
              <div className="font-cond text-base">{l.reiksme}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="label text-[12px] text-dim">
            © {new Date().getFullYear()} Tomas Tvarijonavičius
          </p>
          <ul className="flex flex-wrap gap-5">
            {NUORODOS.map((n) => (
              <li key={n.label}>
                <Link
                  href={n.href}
                  target={n.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="label text-[12px] text-dim underline decoration-dim/40 underline-offset-4 transition-colors hover:text-blue hover:decoration-blue"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
