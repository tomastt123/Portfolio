/**
 * Vardiklio variklio išpjova, paleista šiame portfolio.
 *
 * Failai `sekla.ts`, `matematika.ts`, `bendra.ts`, `mastas.ts`, `tipai.ts` ir
 * trys generatoriai perkelti iš github.com/Vardiklis/vardiklis be pakeitimų —
 * pakeisti tik importų keliai, nes čia jie guli viename kataloge. Tikrojoje
 * svetainėje tokių generatorių yra per šimtą; čia jų trys, kad puslapis liktų
 * lengvas.
 */

import { dalumas } from './dalumas'
import { laipsniai } from './laipsniai'
import { neigiami } from './neigiami'
import type { Generatorius } from './tipai'

export const generatoriai: Record<string, Generatorius> = {
  dalumas,
  neigiami,
  laipsniai,
}

export type GeneratoriausAprasas = {
  raktas: string
  pavadinimas: string
  tema: string
  klase: number
}

/** Kas rodoma pasirinkimo sąraše. Angliškai, nes portfolio angliškas. */
export const aprasai: GeneratoriausAprasas[] = [
  { raktas: 'dalumas', pavadinimas: 'Divisibility', tema: 'factors, GCD, LCM', klase: 5 },
  { raktas: 'neigiami', pavadinimas: 'Negative numbers', tema: 'add, subtract, multiply', klase: 6 },
  { raktas: 'laipsniai', pavadinimas: 'Powers', tema: 'laws of exponents', klase: 7 },
]

export { suSekla } from './sekla'
export { normalizuok, arTeisingas } from './matematika'
export { sablonas } from './bendra'
export type { Uzdavinys, Lygis, Generatorius } from './tipai'
