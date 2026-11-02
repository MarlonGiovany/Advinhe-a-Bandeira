import { useId } from 'react';

/** "Globinho": o mascote do jogo, um planeta sorridente segurando uma bandeirinha. */
export default function Mascot({ className = '' }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const ocean = `${id}-ocean`;
  const clip = `${id}-clip`;

  return (
    <svg className={`mascot ${className}`} viewBox="0 0 224 224" role="img" aria-label="Globinho, o mascote">
      <defs>
        <radialGradient id={ocean} cx="36%" cy="30%" r="78%">
          <stop offset="0" stopColor="#8FDBFF" />
          <stop offset="1" stopColor="#2F80ED" />
        </radialGradient>
        <clipPath id={clip}>
          <circle cx="100" cy="116" r="78" />
        </clipPath>
      </defs>

      <ellipse className="mascot-shadow" cx="100" cy="212" rx="60" ry="8" fill="#1F2A44" opacity="0.14" />

      <g className="mascot-body">
        {/* pezinhos e bracinhos (atrás do planeta) */}
        <ellipse cx="76" cy="198" rx="17" ry="9" fill="#2266C9" />
        <ellipse cx="124" cy="198" rx="17" ry="9" fill="#2266C9" />
        <g className="mascot-wave-arm">
          <path d="M34 138 Q18 130 14 112" stroke="#2266C9" strokeWidth="10" strokeLinecap="round" fill="none" />
          <circle cx="14" cy="110" r="9" fill="#5AB0FF" />
        </g>

        {/* bandeirinha */}
        <g className="mascot-flag">
          <line x1="181" y1="128" x2="189" y2="30" stroke="#8D5A2B" strokeWidth="5" strokeLinecap="round" />
          <g className="mascot-flag-cloth">
            <path d="M189 32 C198 26 208 38 218 32 L216 62 C206 68 197 56 187 62 Z" fill="#9B5DE5" />
            {/* "N" de Nikolas: uma bandeira inventada, para não confundir com país de verdade */}
            <path d="M196.5 55 V39 L209.5 55 V39" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
        <path d="M166 140 Q180 136 181 124" stroke="#2266C9" strokeWidth="10" strokeLinecap="round" fill="none" />
        <circle cx="181" cy="122" r="9" fill="#5AB0FF" />

        {/* planeta */}
        <circle cx="100" cy="116" r="78" fill={`url(#${ocean})`} />
        <g clipPath={`url(#${clip})`} fill="#7ED957" stroke="#4CAF50" strokeWidth="3" strokeLinejoin="round">
          <path d="M40 64 C56 50 80 54 84 70 C88 84 74 90 76 104 C78 116 90 120 86 134 C82 150 68 166 60 176 C56 162 58 146 50 134 C42 122 26 114 28 96 C30 82 32 72 40 64 Z" />
          <path d="M120 48 C138 42 162 54 170 72 C176 86 164 92 154 90 C146 88 144 100 150 110 C156 122 150 138 138 148 C128 156 120 146 122 132 C124 120 114 114 116 100 C118 88 108 80 110 68 C112 58 114 50 120 48 Z" />
          <path d="M146 166 C158 156 176 160 178 172 C170 184 152 184 146 176 Z" />
        </g>
        <ellipse cx="70" cy="70" rx="24" ry="12" fill="#fff" opacity="0.35" transform="rotate(-28 70 70)" />

        {/* rostinho */}
        <g className="mascot-eyes">
          <ellipse cx="78" cy="112" rx="11" ry="13.5" fill="#fff" />
          <ellipse cx="122" cy="112" rx="11" ry="13.5" fill="#fff" />
          <circle cx="80" cy="114" r="7" fill="#1F2A44" />
          <circle cx="124" cy="114" r="7" fill="#1F2A44" />
          <circle cx="83" cy="110.5" r="2.4" fill="#fff" />
          <circle cx="127" cy="110.5" r="2.4" fill="#fff" />
        </g>
        <ellipse cx="60" cy="134" rx="10" ry="6.5" fill="#FF8FB1" opacity="0.8" />
        <ellipse cx="140" cy="134" rx="10" ry="6.5" fill="#FF8FB1" opacity="0.8" />
        <path d="M83 132 Q100 156 117 132 Z" fill="#7A2E46" stroke="#7A2E46" strokeWidth="4" strokeLinejoin="round" />
        <path d="M91 143 Q100 138 109 143 Q105 150 100 150 Q95 150 91 143 Z" fill="#FF7A9C" />
      </g>
    </svg>
  );
}
