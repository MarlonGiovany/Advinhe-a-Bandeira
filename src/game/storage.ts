import { COUNTRIES, MAX_LEVEL } from '../data/countries';

export type Progress = {
  stars: number;
  level: number;
  /** Acertos dentro do nível atual (zera ao passar de nível). */
  levelCorrect: number;
  /** Concluiu todos os níveis: todas as bandeiras aparecem misturadas. */
  master: boolean;
  /** Quantas vezes cada bandeira foi acertada (é o "álbum de figurinhas"). */
  discovered: Record<string, number>;
};

export const DEFAULT_PROGRESS: Progress = {
  stars: 0,
  level: 1,
  levelCorrect: 0,
  master: false,
  discovered: {},
};

const PROGRESS_KEY = 'nikolas-bandeiras:progresso:v1';
const SOUND_KEY = 'nikolas-bandeiras:som:v1';

const KNOWN = new Set(COUNTRIES.map((c) => c.code));

function toInt(value: unknown, min: number, max: number, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.min(max, Math.max(min, Math.floor(value)))
    : fallback;
}

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const data = JSON.parse(raw) as Partial<Progress>;
    const discovered: Record<string, number> = {};
    if (data.discovered && typeof data.discovered === 'object') {
      for (const [code, n] of Object.entries(data.discovered)) {
        if (KNOWN.has(code)) discovered[code] = toInt(n, 0, 1e6, 0);
      }
    }
    return {
      stars: toInt(data.stars, 0, 1e6, 0),
      level: toInt(data.level, 1, MAX_LEVEL, 1),
      levelCorrect: toInt(data.levelCorrect, 0, 1e6, 0),
      master: data.master === true,
      discovered,
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: Progress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // Sem armazenamento (aba anônima, por exemplo): o jogo continua funcionando normalmente.
  }
}

export function loadSoundOn(): boolean {
  try {
    return localStorage.getItem(SOUND_KEY) !== 'off';
  } catch {
    return true;
  }
}

export function saveSoundOn(on: boolean): void {
  try {
    localStorage.setItem(SOUND_KEY, on ? 'on' : 'off');
  } catch {
    // ignorado
  }
}
