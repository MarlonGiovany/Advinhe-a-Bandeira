// Efeitos sonoros curtos, sintetizados com Web Audio (nenhum arquivo de áudio para baixar).

let enabled = true;
let ctx: AudioContext | null = null;

export function setSoundEnabled(on: boolean): void {
  enabled = on;
}

function audio(): AudioContext | null {
  if (!enabled) return null;
  try {
    if (!ctx) {
      const AC =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

type NoteOptions = { type?: OscillatorType; volume?: number; slideTo?: number };

function note(ac: AudioContext, freq: number, at: number, dur: number, opts: NoteOptions = {}): void {
  const { type = 'sine', volume = 0.18, slideTo } = opts;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, at);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, at + dur);
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(volume, at + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  osc.connect(gain).connect(ac.destination);
  osc.start(at);
  osc.stop(at + dur + 0.05);
}

export const sfx = {
  tap(): void {
    const ac = audio();
    if (!ac) return;
    note(ac, 520, ac.currentTime, 0.09, { type: 'triangle', volume: 0.12, slideTo: 820 });
  },

  correct(): void {
    const ac = audio();
    if (!ac) return;
    const t = ac.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
      note(ac, f, t + i * 0.09, 0.28, { type: 'triangle', volume: 0.2 }),
    );
    [1568, 2093, 2637].forEach((f, i) => note(ac, f, t + 0.38 + i * 0.07, 0.18, { volume: 0.07 }));
  },

  /** Som suave e engraçadinho, nada de "buzina de erro". */
  oops(): void {
    const ac = audio();
    if (!ac) return;
    const t = ac.currentTime;
    note(ac, 440, t, 0.16, { type: 'sine', volume: 0.16, slideTo: 330 });
    note(ac, 392, t + 0.17, 0.22, { type: 'sine', volume: 0.14, slideTo: 300 });
  },

  levelUp(): void {
    const ac = audio();
    if (!ac) return;
    const t = ac.currentTime;
    [392, 523.25, 659.25, 783.99].forEach((f, i) =>
      note(ac, f, t + i * 0.12, 0.2, { type: 'square', volume: 0.07 }),
    );
    note(ac, 1046.5, t + 0.5, 0.7, { type: 'triangle', volume: 0.2 });
    note(ac, 783.99, t + 0.5, 0.7, { type: 'triangle', volume: 0.12 });
  },
};
