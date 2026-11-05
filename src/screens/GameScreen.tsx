import { useEffect, useRef, useState } from 'react';
import FlagImage from '../components/FlagImage';
import Background from '../components/Background';
import Celebration from '../components/Celebration';
import TopBar from '../components/TopBar';
import { countryByCode, type Country } from '../data/countries';
import { celebrateCorrect, celebrateLevelUp } from '../game/confetti';
import { GameSession, shuffle, type CorrectResult, type Round } from '../game/engine';
import { sfx } from '../game/sound';
import type { Progress } from '../game/storage';

type Props = {
  progress: Progress;
  soundOn: boolean;
  onToggleSound: () => void;
  onHome: () => void;
  onCorrect: (code: string) => CorrectResult;
};

export default function GameScreen({ progress, soundOn, onToggleSound, onHome, onCorrect }: Props) {
  const [session] = useState(() => new GameSession());
  const [round, setRound] = useState<Round>(() => session.next(progress.level, progress.master));
  const [wrong, setWrong] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [celebration, setCelebration] = useState<CorrectResult | null>(null);
  // Depois de acertar a bandeira, ele precisa acertar a capital do mesmo país.
  const [stage, setStage] = useState<'flag' | 'capital'>('flag');
  const [capitalOptions, setCapitalOptions] = useState<Country[]>([]);
  const [pending, setPending] = useState<CorrectResult | null>(null);
  const [oopsId, setOopsId] = useState(0);
  // Os botões só aparecem depois que a bandeira terminou de carregar.
  const [flagReady, setFlagReady] = useState(false);
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  // Limpa os timers ao sair da tela.
  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
    },
    [],
  );

  // Pré-carrega a próxima bandeira para a troca ser instantânea.
  useEffect(() => {
    const code = session.peek();
    if (code) new Image().src = countryByCode(code).flag;
  }, [round, session]);

  // A mensagem de "quase" some sozinha.
  useEffect(() => {
    if (!oopsId) return;
    const t = window.setTimeout(() => setOopsId(0), 2600);
    return () => window.clearTimeout(t);
  }, [oopsId]);

  const pick = (country: Country) => {
    if (!flagReady || solved || wrong.includes(country.code)) return;

    if (country.code === round.answer.code) {
      setSolved(true);
      setOopsId(0);
      sfx.correct();
      celebrateCorrect();
      navigator.vibrate?.([30, 40, 30]);

      if (stage === 'flag') {
        // A estrela já fica guardada; agora vem a pergunta da capital.
        setPending(onCorrect(country.code));
        later(() => {
          setCapitalOptions(shuffle(round.options));
          setWrong([]);
          setSolved(false);
          setStage('capital');
        }, 900);
        return;
      }

      later(() => {
        if (!pending) return;
        setCelebration(pending);
        if (pending.leveledUp || pending.becameMaster) {
          sfx.levelUp();
          celebrateLevelUp();
        }
      }, 750);
    } else {
      setWrong((w) => [...w, country.code]);
      setOopsId((n) => n + 1);
      sfx.oops();
    }
  };

  const next = () => {
    sfx.tap();
    setFlagReady(false);
    setRound(session.next(progress.level, progress.master));
    setWrong([]);
    setSolved(false);
    setCelebration(null);
    setStage('flag');
    setCapitalOptions([]);
    setPending(null);
  };

  // Se uma bandeira não carregar de jeito nenhum, troca por outra sem a criança perceber.
  const skipBrokenFlag = () => {
    setFlagReady(false);
    setRound(session.next(progress.level, progress.master));
    setWrong([]);
  };

  return (
    <div className="screen game">
      <Background />
      <TopBar progress={progress} soundOn={soundOn} onToggleSound={onToggleSound} onHome={onHome} />

      <main className="stage">
        <div className="question">
          {stage === 'flag' ? (
            <h1>
              Que país é esse? <span aria-hidden="true">🤔</span>
            </h1>
          ) : (
            <h1 key="capital" className="question-capital">
              Qual é a capital {round.answer.de} {round.answer.name}? <span aria-hidden="true">🏛️</span>
            </h1>
          )}
          {oopsId !== 0 && (
            <div className="oops" key={oopsId} role="status">
              <strong>Quaseeem! 😁</strong>
              <span>{stage === 'flag' ? 'Tente novamente, outro país!' : 'Tente novamente, outra capital!'}</span>
            </div>
          )}
        </div>

        <div className="flag-area">
          <div className={`flag-frame ${solved ? 'is-solved' : ''}`} key={round.id}>
            <FlagImage
              key={round.id}
              src={round.answer.flag}
              onReady={() => setFlagReady(true)}
              onFail={skipBrokenFlag}
            />
          </div>
        </div>

        <div className={`options ${flagReady ? '' : 'is-waiting'}`} role="group" aria-label={stage === 'flag' ? 'Escolha o país' : 'Escolha a capital'}>
          {(stage === 'flag' ? round.options : capitalOptions).map((c, i) => {
            const isWrong = wrong.includes(c.code);
            const isRight = solved && c.code === round.answer.code;
            const classes = ['btn3d', 'option', `opt-${i}`];
            if (isWrong) classes.push('is-wrong');
            if (isRight) classes.push('is-right');
            if (solved && !isRight) classes.push('is-faded');
            return (
              <button
                key={`${round.id}-${stage}-${c.code}`}
                type="button"
                className={classes.join(' ')}
                style={{ animationDelay: `${i * 80}ms` }}
                disabled={!flagReady || isWrong || solved}
                onClick={() => pick(c)}
              >
                {isRight && <span className="option-badge" aria-hidden="true">✅</span>}
                <span className="option-label">{stage === 'flag' ? c.name : c.capital}</span>
              </button>
            );
          })}
        </div>
      </main>

      {celebration && <Celebration result={celebration} country={round.answer} onNext={next} />}
    </div>
  );
}
