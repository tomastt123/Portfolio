"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/demo", label: "Demo" },
  { href: "/match", label: "Match" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

/**
 * Ar naršoma iš Mac — nuo to priklauso, ar rodyti ⌘, ar Ctrl.
 * Serveryje visada `false`, kad hidratacija sutaptų; tikroji reikšmė
 * perskaitoma iškart po jos.
 */
function useMac(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent),
    () => false,
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const mac = useMac();
  const pathname = usePathname();

  return (
    <header
      data-part="nav"
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-film-hi/95 backdrop-blur-sm"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link href="/" className="label flex items-baseline gap-2 text-[13px]">
          <span className="bg-line px-1.5 py-0.5 text-film">TT</span>
          <span className="hidden sm:inline">Tvarijonavičius</span>
        </Link>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center sm:flex">
            {LINKS.map((l) => {
              const aktyvus = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`label px-3 py-1.5 text-[13px] transition-colors ${
                      aktyvus ? "text-blue" : "text-dim hover:text-line"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Užuomina apie komandų juostą — ji ir yra pagrindinė navigacija. */}
          <kbd className="label frame-dim ml-2 hidden px-2 py-1 text-[12px] text-dim sm:block">
            {mac ? "⌘" : "Ctrl"} K
          </kbd>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="label frame-dim px-2 py-1 text-[12px] sm:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-line sm:hidden">
          {LINKS.map((l) => (
            <li key={l.href} className="border-b border-dim/30 last:border-0">
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="label block px-4 py-3 text-[12px]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
