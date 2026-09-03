/**
 * Auditas — tos pačios taisyklės, kurias sukanti `npm run patikra` neįleidžia
 * blogo uždavinio į Vardiklį. Portas iš `scripts/patikrink-generatorius.ts`,
 * pritaikytas suktis naršyklėje: vietoj proceso išėjimo kodo grąžinamas
 * struktūrizuotas rezultatas, kurį galima nupiešti.
 */

import katex from 'katex'
import { sablonas } from './bendra'
import { normalizuok } from './matematika'
import type { Uzdavinys } from './tipai'

export type Patikra = {
  vardas: string
  aprasas: string
  praejo: boolean
  detale?: string
}

export type Ataskaita = {
  patikros: Patikra[]
  klaidu: number
}

/** Racionalusis skaičius iš normalizuoto atsakymo, jei tai skaičius. */
function kaipTrupmena(normalizuotas: string): { sk: number; vd: number } | null {
  const t = normalizuotas.match(/^(-?\d+)\/(\d+)$/)
  if (t) return { sk: Number(t[1]), vd: Number(t[2]) }
  if (/^-?\d+$/.test(normalizuotas)) return { sk: Number(normalizuotas), vd: 1 }
  return null
}

/** Ar visi `$...$` fragmentai surenkami KaTeX'u. */
function katexPatikra(u: Uzdavinys): { gerai: boolean; detale?: string } {
  for (const tekstas of [u.klausimas, u.atsakymasRodymui, u.sprendimas ?? '']) {
    const dalys = tekstas.split('$')
    if (dalys.length % 2 === 0) {
      return { gerai: false, detale: `neporinis $ tekste „${tekstas}"` }
    }
    for (let i = 1; i < dalys.length; i += 2) {
      try {
        katex.renderToString(dalys[i], { throwOnError: true, displayMode: false })
      } catch (e) {
        return { gerai: false, detale: `nesurenka „${dalys[i]}" — ${(e as Error).message}` }
      }
    }
  }
  return { gerai: true }
}

/** Vieno uždavinio auditas. */
export function auditas(u: Uzdavinys): Ataskaita {
  const laukai: [string, string][] = [
    ['klausimas', u.klausimas],
    ['atsakymasRodymui', u.atsakymasRodymui],
    ['sprendimas', u.sprendimas ?? ''],
  ]

  const siuksles = laukai.find(([, v]) => /undefined|NaN|Infinity/.test(v))
  const zenklai = laukai.find(([, v]) => /[+\-]\s+-\d/.test(v))
  const skaicius = kaipTrupmena(u.atsakymas)
  const desimtaine = skaicius ? 1000 % skaicius.vd === 0 : false
  const tex = katexPatikra(u)

  const patikros: Patikra[] = [
    {
      vardas: 'siuksles',
      aprasas: 'Tekste nėra undefined / NaN / Infinity',
      praejo: !siuksles,
      detale: siuksles && `${siuksles[0]}: „${siuksles[1]}"`,
    },
    {
      vardas: 'zenklai',
      aprasas: 'Nėra nesutvarkytos ženklų poros (− −, + −)',
      praejo: !zenklai,
      detale: zenklai && `${zenklai[0]}: „${zenklai[1]}"`,
    },
    {
      vardas: 'atsakymas',
      aprasas: 'Atsakymas netuščias',
      praejo: u.atsakymas !== '',
    },
    {
      vardas: 'normalizuotas',
      aprasas: 'Atsakymas jau kanoninio pavidalo',
      praejo: normalizuok(u.atsakymas) === u.atsakymas,
      detale:
        normalizuok(u.atsakymas) !== u.atsakymas
          ? `„${u.atsakymas}" → „${normalizuok(u.atsakymas)}"`
          : undefined,
    },
    {
      vardas: 'vardiklis',
      aprasas: 'Vardiklis nebjaurus (≤ 20 arba dešimtainis)',
      praejo: !skaicius || desimtaine || skaicius.vd <= 20,
      detale: skaicius && !desimtaine && skaicius.vd > 20 ? `vardiklis ${skaicius.vd}` : undefined,
    },
    {
      vardas: 'mastas',
      aprasas: 'Skaičius telpa į mokyklinį mastą (≤ 10⁶)',
      praejo: !skaicius || Math.abs(skaicius.sk) <= 1_000_000,
    },
    {
      vardas: 'katex',
      aprasas: 'KaTeX surenka visas formules',
      praejo: tex.gerai,
      detale: tex.detale,
    },
    {
      vardas: 'brezinys',
      aprasas: 'Brėžinys yra pilnas SVG (jei yra)',
      praejo: !u.brezinys || (u.brezinys.startsWith('<svg') && u.brezinys.endsWith('</svg>')),
    },
  ]

  return { patikros, klaidu: patikros.filter((p) => !p.praejo).length }
}

/**
 * Rinkinio įvairovė. Du uždaviniai, kurių šablonai sutampa, mokiniui yra tas
 * pats uždavinys — tikslus eilučių lyginimas to nemato, todėl lyginami
 * šablonai.
 */
export function ivairove(rinkinys: Uzdavinys[]): {
  unikalus: number;
  visi: number;
  dazniausias: number;
} {
  const skaitliai = new Map<string, number>()
  for (const u of rinkinys) {
    const s = sablonas(u.klausimas)
    skaitliai.set(s, (skaitliai.get(s) ?? 0) + 1)
  }
  return {
    unikalus: skaitliai.size,
    visi: rinkinys.length,
    dazniausias: Math.max(...skaitliai.values()),
  }
}
