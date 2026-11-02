import { useEffect, useState } from 'react';
import Background from '../components/Background';
import Icon from '../components/Icon';
import { COUNTRIES, LEVELS, type Country } from '../data/countries';
import { sfx } from '../game/sound';
import type { Progress } from '../game/storage';

type Props = {
  progress: Progress;
  onBack: () => void;
  onReset: () => void;
};

export default function AlbumScreen({ progress, onBack, onReset }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [poppedCode, setPoppedCode] = useState<string | null>(null);
  const found = COUNTRIES.filter((c) => progress.discovered[c.code]).length;

  // O pedido de confirmação some depois de alguns segundos.
  useEffect(() => {
    if (!confirming) return;
    const t = window.setTimeout(() => setConfirming(false), 4000);
    return () => window.clearTimeout(t);
  }, [confirming]);

  const tapSticker = (c: Country) => {
    sfx.tap();
    setPoppedCode(c.code);
  };

  const tapReset = () => {
    if (confirming) {
      setConfirming(false);
      onReset();
    } else {
      setConfirming(true);
    }
  };

  return (
    <div className="screen album">
      <Background />

      <header className="album-header">
        <button type="button" className="icon-btn" onClick={onBack} aria-label="Voltar">
          <Icon name="arrow-left" />
        </button>
        <h1>
          <span aria-hidden="true">📒</span> Meu Álbum
        </h1>
        <div className="album-count" aria-label={`${found} de ${COUNTRIES.length} bandeiras descobertas`}>
          {found}/{COUNTRIES.length}
        </div>
      </header>

      <div className="album-scroll">
        {found === 0 && (
          <p className="album-empty">Acerte bandeiras no jogo para ganhar figurinhas! 🌟</p>
        )}

        {LEVELS.map((level) => {
          const unlocked = progress.master || level.id <= progress.level;
          return (
            <section key={level.id} className="album-level">
              <h2>
                {level.emoji} Nível {level.id} · {level.title}
                {!unlocked && <span className="lock-tag">🔒 bloqueado</span>}
              </h2>
              <div className="album-grid">
                {COUNTRIES.filter((c) => c.level === level.id).map((c) => {
                  const times = progress.discovered[c.code] ?? 0;
                  if (times > 0) {
                    return (
                      <button
                        key={c.code}
                        type="button"
                        className={`sticker ${poppedCode === c.code ? 'is-popped' : ''}`}
                        onClick={() => tapSticker(c)}
                        onAnimationEnd={() => setPoppedCode(null)}
                      >
                        <img src={c.flag} alt="" draggable={false} />
                        <span className="sticker-name">{c.name}</span>
                        {times > 1 && <span className="sticker-times">×{times}</span>}
                      </button>
                    );
                  }
                  return (
                    <div key={c.code} className={`sticker is-empty ${unlocked ? '' : 'is-locked'}`}>
                      <span className="sticker-mystery" aria-hidden="true">
                        {unlocked ? '?' : '🔒'}
                      </span>
                      <span className="sticker-name">{unlocked ? '???' : 'Bloqueada'}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        <div className="album-footer">
          <button type="button" className={`reset-btn ${confirming ? 'is-confirming' : ''}`} onClick={tapReset}>
            {confirming ? 'Toque de novo para apagar tudo' : 'Recomeçar do zero'}
          </button>
        </div>
      </div>
    </div>
  );
}
