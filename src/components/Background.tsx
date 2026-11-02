import { countryByCode } from '../data/countries';

const STAR_PATH = 'M12 2.8l2.8 5.8 6.4.9-4.6 4.5 1.1 6.3L12 17.3l-5.7 3 1.1-6.3-4.6-4.5 6.4-.9z';

const STARS = [
  { x: '6%', y: '14%', s: 26, d: '0s' },
  { x: '88%', y: '10%', s: 32, d: '0.8s' },
  { x: '94%', y: '46%', s: 20, d: '1.6s' },
  { x: '3%', y: '58%', s: 22, d: '2.2s' },
  { x: '48%', y: '5%', s: 18, d: '1.1s' },
  { x: '78%', y: '88%', s: 24, d: '0.4s' },
  { x: '14%', y: '90%', s: 18, d: '1.9s' },
];

const FLOATING_FLAGS = [
  { code: 'br', x: '4%', y: '8%', r: -12, d: '0s' },
  { code: 'jp', x: '88%', y: '28%', r: 10, d: '1.2s' },
  { code: 'fr', x: '90%', y: '72%', r: -8, d: '0.6s' },
  { code: 'it', x: '2%', y: '78%', r: 9, d: '1.8s' },
  { code: 'ar', x: '72%', y: '88%', r: 6, d: '2.4s' },
  { code: 'de', x: '18%', y: '92%', r: -6, d: '3s' },
];

export default function Background({ flags = false }: { flags?: boolean }) {
  return (
    <div className="bg" aria-hidden="true">
      <div className="sun" />
      <div className="cloud cloud-1" />
      <div className="cloud cloud-2" />
      <div className="cloud cloud-3" />
      {STARS.map((st, i) => (
        <svg
          key={i}
          className="twinkle"
          viewBox="0 0 24 24"
          style={{ left: st.x, top: st.y, width: st.s, height: st.s, animationDelay: st.d }}
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
      {flags &&
        FLOATING_FLAGS.map((f) => (
          <div
            key={f.code}
            className="float-flag"
            style={{ left: f.x, top: f.y, ['--r' as string]: `${f.r}deg`, animationDelay: f.d }}
          >
            <img src={countryByCode(f.code).flag} alt="" draggable={false} />
          </div>
        ))}
    </div>
  );
}
