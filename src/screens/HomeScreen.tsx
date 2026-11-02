import { useEffect, useState } from 'react';
import Background from '../components/Background';
import Icon from '../components/Icon';
import Mascot from '../components/Mascot';
import SoundButton from '../components/SoundButton';
import WavyText from '../components/WavyText';
import { COUNTRIES, LEVELS } from '../data/countries';
import type { Progress } from '../game/storage';

type Props = {
  progress: Progress;
  soundOn: boolean;
  onToggleSound: () => void;
  onPlay: () => void;
  onAlbum: () => void;
};

const canFullscreen = typeof document !== 'undefined' && document.fullscreenEnabled === true;

function useIsFullscreen(): boolean {
  const [full, setFull] = useState(() => typeof document !== 'undefined' && !!document.fullscreenElement);
  useEffect(() => {
    const onChange = () => setFull(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);
  return full;
}

export default function HomeScreen({ progress, soundOn, onToggleSound, onPlay, onAlbum }: Props) {
  const isFullscreen = useIsFullscreen();
  const found = COUNTRIES.filter((c) => progress.discovered[c.code]).length;
  const level = LEVELS[progress.level - 1];

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
    else void document.documentElement.requestFullscreen({ navigationUI: 'hide' }).catch(() => {});
  };

  return (
    <div className="screen home">
      <Background flags />

      <div className="corner-actions">
        {canFullscreen && (
          <button
            type="button"
            className="icon-btn"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
          >
            <Icon name={isFullscreen ? 'fullscreen-exit' : 'fullscreen'} />
          </button>
        )}
        <SoundButton on={soundOn} onToggle={onToggleSound} />
      </div>

      <main className="home-main">
        <div className="home-mascot">
          <Mascot />
        </div>

        <div className="home-content">
          <h1 className="title">
            <span className="title-top">Adivinhe a</span>
            <span className="title-mid">Bandeira</span>
            <span className="title-name">
              <span className="title-do">do</span> <WavyText text="NIKOLASSSS!" />
            </span>
          </h1>

          <div className="home-buttons">
            <button type="button" className="btn3d btn-play" onClick={onPlay}>
              <Icon name="play" />
              Jogar!
            </button>
            <button type="button" className="btn3d btn-album" onClick={onAlbum}>
              <span aria-hidden="true">📒</span> Meu Álbum
              <span className="badge">
                {found}/{COUNTRIES.length}
              </span>
            </button>
          </div>

          <p className="home-stats">
            <span>⭐ {progress.stars} {progress.stars === 1 ? 'estrela' : 'estrelas'}</span>
            <span className="dot-sep" aria-hidden="true">•</span>
            <span>{progress.master ? '👑 Mestre das Bandeiras' : `${level.emoji} Nível ${progress.level}`}</span>
          </p>
        </div>
      </main>
    </div>
  );
}
