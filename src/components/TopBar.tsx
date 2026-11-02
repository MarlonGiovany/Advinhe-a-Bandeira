import { CORRECT_TO_LEVEL_UP } from '../data/countries';
import type { Progress } from '../game/storage';
import Icon from './Icon';
import SoundButton from './SoundButton';

type Props = {
  progress: Progress;
  soundOn: boolean;
  onToggleSound: () => void;
  onHome: () => void;
};

export default function TopBar({ progress, soundOn, onToggleSound, onHome }: Props) {
  const { level, levelCorrect, master, stars } = progress;

  return (
    <header className="topbar">
      <button type="button" className="icon-btn" onClick={onHome} aria-label="Voltar para o início">
        <Icon name="home" />
      </button>

      <div className="level-pill" aria-label={master ? 'Mestre das bandeiras' : `Nível ${level}: ${levelCorrect} de ${CORRECT_TO_LEVEL_UP} estrelas`}>
        {master ? (
          <span className="level-name">👑 Mestre</span>
        ) : (
          <>
            <span className="level-name">
              <span className="level-word">Nível </span>
              {level}
            </span>
            <span className="level-track" aria-hidden="true">
              {Array.from({ length: CORRECT_TO_LEVEL_UP }, (_, i) => (
                <Icon key={i} name="star" className={`track-star ${i < levelCorrect ? 'is-on' : ''}`} />
              ))}
            </span>
          </>
        )}
      </div>

      <div className="topbar-right">
        <div className="star-count" key={stars} aria-label={`${stars} estrelas`}>
          <Icon name="star" className="star-count-icon" />
          <span>{stars}</span>
        </div>
        <SoundButton on={soundOn} onToggle={onToggleSound} />
      </div>
    </header>
  );
}
