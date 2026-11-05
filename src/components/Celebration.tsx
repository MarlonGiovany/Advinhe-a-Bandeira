import { useEffect, useRef } from 'react';
import { COUNTRIES, LEVELS, type Country } from '../data/countries';
import type { CorrectResult } from '../game/engine';
import Icon from './Icon';
import Mascot from './Mascot';
import WavyText from './WavyText';

type Props = {
  result: CorrectResult;
  country: Country;
  onNext: () => void;
};

export default function Celebration({ result, country, onNext }: Props) {
  const nextRef = useRef<HTMLButtonElement>(null);
  const big = result.leveledUp || result.becameMaster;
  const level = LEVELS[result.progress.level - 1];

  useEffect(() => {
    nextRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="celebrate-title">
      <div className={`celebrate-card ${big ? 'is-big' : ''}`}>
        <div className="celebrate-hero" aria-hidden="true">
          <Mascot className="is-jumping" />
          {big && <span className="trophy">{result.becameMaster ? '👑' : '🏆'}</span>}
        </div>

        <h2 id="celebrate-title" className="celebrate-title">
          <WavyText text="Parabéns Nicolas!!!!" /> <span className="emoji">🥳🎉🏆</span>
        </h2>
        <p className="celebrate-sub">Você acertou a bandeira e a capital!</p>

        <div className="answer-chip">
          <img src={country.flag} alt="" draggable={false} />
          <span>
            É a bandeira {country.de} <strong>{country.name}</strong>!
          </span>
        </div>

        <p className="capital-chip">
          <span aria-hidden="true">🏛️</span> A capital é <strong>{country.capital}</strong>!
        </p>

        <p className="fact">
          <span aria-hidden="true">💡 </span>
          {country.fact}
        </p>

        <div className="rewards">
          <span className="reward reward-star">+1 ⭐</span>
          {result.firstTime && <span className="reward reward-sticker">📒 Figurinha nova!</span>}
          {result.milestone && <span className="reward reward-milestone">🌟 Já são {result.milestone} estrelas!</span>}
        </div>

        {result.leveledUp && (
          <div className="levelup-banner">
            <strong>🏆 NÍVEL {result.progress.level}!</strong>
            <span>
              {level.emoji} {level.title}: bandeiras novas chegando!
            </span>
          </div>
        )}
        {result.becameMaster && (
          <div className="levelup-banner is-master">
            <strong>👑 MESTRE DAS BANDEIRAS!</strong>
            <span>Agora as {COUNTRIES.length} bandeiras vão aparecer misturadas!</span>
          </div>
        )}

        <button ref={nextRef} type="button" className="btn3d btn-next" onClick={onNext}>
          Próxima bandeira
          <Icon name="arrow-right" />
        </button>
      </div>
    </div>
  );
}
