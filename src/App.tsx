import { useEffect, useState } from 'react';
import { COUNTRIES } from './data/countries';
import { applyCorrect } from './game/engine';
import { setSoundEnabled, sfx } from './game/sound';
import {
  DEFAULT_PROGRESS,
  loadProgress,
  loadSoundOn,
  saveProgress,
  saveSoundOn,
  type Progress,
} from './game/storage';
import AlbumScreen from './screens/AlbumScreen';
import GameScreen from './screens/GameScreen';
import HomeScreen from './screens/HomeScreen';

type Screen = 'home' | 'play' | 'album';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [progress, setProgress] = useState<Progress>(loadProgress);
  const [soundOn, setSoundOn] = useState<boolean>(() => {
    const on = loadSoundOn();
    setSoundEnabled(on);
    return on;
  });

  useEffect(() => saveProgress(progress), [progress]);

  useEffect(() => {
    setSoundEnabled(soundOn);
    saveSoundOn(soundOn);
  }, [soundOn]);

  // Carrega todas as bandeiras em segundo plano para que nenhuma demore a aparecer.
  useEffect(() => {
    const t = window.setTimeout(() => {
      for (const c of COUNTRIES) new Image().src = c.flag;
    }, 1200);
    return () => window.clearTimeout(t);
  }, []);

  const go = (next: Screen) => {
    sfx.tap();
    setScreen(next);
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundEnabled(next);
    setSoundOn(next);
    if (next) sfx.tap();
  };

  const resetProgress = () => {
    sfx.tap();
    setProgress(DEFAULT_PROGRESS);
  };

  const registerCorrect = (code: string) => {
    const result = applyCorrect(progress, code);
    setProgress(result.progress);
    return result;
  };

  if (screen === 'play') {
    return (
      <GameScreen
        progress={progress}
        soundOn={soundOn}
        onToggleSound={toggleSound}
        onHome={() => go('home')}
        onCorrect={registerCorrect}
      />
    );
  }

  if (screen === 'album') {
    return (
      <AlbumScreen
        progress={progress}
        onBack={() => go('home')}
        onReset={resetProgress}
      />
    );
  }

  return (
    <HomeScreen
      progress={progress}
      soundOn={soundOn}
      onToggleSound={toggleSound}
      onPlay={() => go('play')}
      onAlbum={() => go('album')}
      onReset={resetProgress}
    />
  );
}
