const PALETTE = ['var(--pink-d)', 'var(--orange-d)', 'var(--green-d)', 'var(--blue-d)', 'var(--purple-d)'];

/** Texto com cada letra de uma cor, pulando como uma onda. */
export default function WavyText({ text, className = '' }: { text: string; className?: string }) {
  let index = 0;
  const words = text.split(' ');

  return (
    <span className={`wavy ${className}`}>
      <span className="sr-only">{text}</span>
      {words.map((word, w) => (
        <span key={w} aria-hidden="true">
          {w > 0 && ' '}
          <span className="wavy-word">
            {Array.from(word).map((ch) => {
              const i = index++;
              return (
                <span
                  key={i}
                  className="wavy-letter"
                  style={{ color: PALETTE[i % PALETTE.length], animationDelay: `${i * 0.06}s` }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        </span>
      ))}
    </span>
  );
}
