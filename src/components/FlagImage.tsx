import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  onReady: () => void;
  onFail: () => void;
};

/** Quantas vezes tenta de novo antes de desistir desta bandeira. */
const MAX_RETRIES = 2;

/**
 * Mostra a bandeira só depois que ela carregou de verdade.
 * Enquanto carrega, aparece um globinho girando (nunca um texto ou ícone de imagem quebrada).
 * Se falhar, tenta de novo; se continuar falhando, avisa o jogo para trocar de bandeira.
 */
export default function FlagImage({ src, onReady, onFail }: Props) {
  const [attempt, setAttempt] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const done = useRef(false);

  const url = attempt === 0 ? src : `${src}${src.includes('?') ? '&' : '?'}tentativa=${attempt}`;

  const markLoaded = () => {
    if (done.current) return;
    done.current = true;
    setLoaded(true);
    onReady();
  };

  // A imagem pode já estar no cache e terminar de carregar antes do React ligar o onLoad.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) markLoaded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const handleError = () => {
    if (done.current) return;
    if (attempt < MAX_RETRIES) {
      window.setTimeout(() => setAttempt((a) => a + 1), 400 * (attempt + 1));
    } else {
      done.current = true;
      onFail();
    }
  };

  return (
    <div className={`flag-img ${loaded ? 'is-loaded' : 'is-loading'}`}>
      {!loaded && (
        <div className="flag-loading" aria-label="Carregando a bandeira" role="status">
          <span className="flag-loading-globe" aria-hidden="true">🌎</span>
        </div>
      )}
      <img
        ref={imgRef}
        key={url}
        src={url}
        alt=""
        draggable={false}
        decoding="async"
        onLoad={markLoaded}
        onError={handleError}
      />
    </div>
  );
}
