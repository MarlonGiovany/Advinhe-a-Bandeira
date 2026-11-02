import {
  COUNTRIES,
  CORRECT_TO_LEVEL_UP,
  MAX_LEVEL,
  countryByCode,
  type Country,
} from '../data/countries';
import type { Progress } from './storage';

export type Round = {
  id: number;
  answer: Country;
  /** Sempre exatamente três alternativas, já embaralhadas. */
  options: Country[];
};

export function shuffle<T>(items: readonly T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Quanto duas bandeiras se parecem: cores em comum + desenho igual ou parecido (listras, cruz, etc.). */
function similarity(a: Country, b: Country): number {
  const sharedColors = a.colors.filter((c) => b.colors.includes(c)).length;
  let shape = 0;
  if (a.pattern === b.pattern) shape = 3;
  // "union-jack" x "union-jack-stars", "disc" x "disc-symbols"...
  else if (a.pattern.startsWith(b.pattern) || b.pattern.startsWith(a.pattern)) shape = 2;
  return sharedColors + shape;
}

function availableCountries(level: number, master: boolean): readonly Country[] {
  return master ? COUNTRIES : COUNTRIES.filter((c) => c.level <= level);
}

/**
 * Escolhe as duas alternativas erradas.
 * Nos primeiros níveis, só bandeiras bem diferentes da certa; depois, a dificuldade sobe aos poucos.
 */
function pickDistractors(answer: Country, level: number, master: boolean): Country[] {
  const pool = availableCountries(level, master).filter((c) => c.code !== answer.code);
  // Embaralhar antes de ordenar garante desempates aleatórios.
  const scored = shuffle(pool).map((c) => ({ c, s: similarity(answer, c) }));
  const difficulty = master ? MAX_LEVEL : level;

  if (difficulty <= 1) {
    const mostDifferent = [...scored].sort((x, y) => x.s - y.s).slice(0, 4);
    return shuffle(mostDifferent).slice(0, 2).map((x) => x.c);
  }

  if (difficulty === 2) {
    const easy = scored.filter((x) => x.s <= 3);
    const source = easy.length >= 2 ? easy : [...scored].sort((x, y) => x.s - y.s);
    return source.slice(0, 2).map((x) => x.c);
  }

  if (difficulty === 3) {
    return scored.slice(0, 2).map((x) => x.c);
  }

  // Níveis 4+: uma bandeira parecida (desafio) e uma qualquer.
  const lookAlikes = [...scored].sort((x, y) => y.s - x.s).slice(0, 3);
  const tricky = shuffle(lookAlikes)[0];
  const other = scored.find((x) => x !== tricky)!;
  return [tricky.c, other.c];
}

/** Monta um "baralho" de bandeiras para evitar repetições na mesma sessão. */
function buildDeck(level: number, master: boolean, recent: readonly string[]): string[] {
  let cards: Country[];
  if (master) {
    cards = shuffle(COUNTRIES);
  } else {
    const fresh = COUNTRIES.filter((c) => c.level === level);
    const review = shuffle(COUNTRIES.filter((c) => c.level < level)).slice(0, 4);
    cards = shuffle([...fresh, ...review]);
  }
  const codes = cards.map((c) => c.code);
  // A primeira carta do baralho novo não pode ser uma das que acabaram de aparecer.
  const firstFresh = codes.findIndex((c) => !recent.includes(c));
  if (firstFresh > 0) [codes[0], codes[firstFresh]] = [codes[firstFresh], codes[0]];
  return codes;
}

function createRound(id: number, answer: Country, level: number, master: boolean, recentSpots: number[]): Round {
  const options = shuffle([answer, ...pickDistractors(answer, level, master)]);

  // A resposta certa não fica no mesmo lugar três vezes seguidas.
  const [a, b] = recentSpots.slice(-2);
  const spot = options.indexOf(answer);
  if (a !== undefined && a === b && spot === a) {
    const target = (spot + 1 + Math.floor(Math.random() * 2)) % 3;
    [options[spot], options[target]] = [options[target], options[spot]];
  }

  return { id, answer, options };
}

export class GameSession {
  private deck: string[] = [];
  private deckKey = '';
  private recent: string[] = [];
  private spots: number[] = [];
  private count = 0;

  next(level: number, master: boolean): Round {
    const key = master ? 'master' : `level-${level}`;
    if (key !== this.deckKey) {
      this.deck = [];
      this.deckKey = key;
    }
    if (this.deck.length === 0) this.deck = buildDeck(level, master, this.recent);

    const code = this.deck.shift()!;
    this.recent = [...this.recent, code].slice(-2);
    this.count += 1;
    const round = createRound(this.count, countryByCode(code), level, master, this.spots);
    this.spots = [...this.spots, round.options.indexOf(round.answer)].slice(-3);
    return round;
  }

  /** Próxima bandeira do baralho (para pré-carregar a imagem). */
  peek(): string | undefined {
    return this.deck[0];
  }
}

export type CorrectResult = {
  progress: Progress;
  leveledUp: boolean;
  becameMaster: boolean;
  /** Primeira vez que acertou esta bandeira: figurinha nova no álbum. */
  firstTime: boolean;
  /** A cada 5 estrelas, uma comemoração extra. */
  milestone: number | null;
};

export function applyCorrect(p: Progress, code: string): CorrectResult {
  const stars = p.stars + 1;
  const firstTime = !p.discovered[code];
  const discovered = { ...p.discovered, [code]: (p.discovered[code] ?? 0) + 1 };

  let { level, levelCorrect, master } = p;
  let leveledUp = false;
  let becameMaster = false;

  if (!master) {
    levelCorrect += 1;
    if (levelCorrect >= CORRECT_TO_LEVEL_UP) {
      levelCorrect = 0;
      if (level < MAX_LEVEL) {
        level += 1;
        leveledUp = true;
      } else {
        master = true;
        becameMaster = true;
      }
    }
  }

  const milestone = !leveledUp && !becameMaster && stars % 5 === 0 ? stars : null;

  return {
    progress: { stars, level, levelCorrect, master, discovered },
    leveledUp,
    becameMaster,
    firstTime,
    milestone,
  };
}
