import confetti from 'canvas-confetti';

const COLORS = ['#FFD23F', '#FF5D8F', '#4D96FF', '#22C285', '#9B5DE5', '#FF9F1C'];
const GOLD = ['#FFD23F', '#FFB703', '#FFE58A'];

const base: confetti.Options = {
  colors: COLORS,
  zIndex: 200,
  disableForReducedMotion: true,
};

export function celebrateCorrect(): void {
  confetti({ ...base, particleCount: 90, spread: 85, startVelocity: 48, origin: { y: 0.7 } });
  confetti({ ...base, particleCount: 26, spread: 110, shapes: ['star'], colors: GOLD, scalar: 1.7, origin: { y: 0.65 } });
  confetti({ ...base, particleCount: 40, angle: 60, spread: 60, origin: { x: 0, y: 0.85 } });
  confetti({ ...base, particleCount: 40, angle: 120, spread: 60, origin: { x: 1, y: 0.85 } });
}

/** Chuva de confetes e estrelas por quase 2 segundos (passou de nível!). */
export function celebrateLevelUp(): void {
  const end = Date.now() + 1800;
  const timer = window.setInterval(() => {
    if (Date.now() > end) {
      window.clearInterval(timer);
      return;
    }
    confetti({ ...base, particleCount: 14, angle: 60, spread: 70, origin: { x: 0, y: 0.7 } });
    confetti({ ...base, particleCount: 14, angle: 120, spread: 70, origin: { x: 1, y: 0.7 } });
    confetti({
      ...base,
      particleCount: 6,
      shapes: ['star'],
      colors: GOLD,
      scalar: 1.8,
      spread: 160,
      startVelocity: 30,
      origin: { x: Math.random(), y: 0.2 },
    });
  }, 160);
}
