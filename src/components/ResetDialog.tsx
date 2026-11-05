import { useEffect, useRef } from 'react';
import Icon from './Icon';

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

/** Pede confirmação antes de apagar estrelas, níveis e figurinhas. */
export default function ResetDialog({ onConfirm, onCancel }: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  // O foco começa no "Não": um toque sem querer não apaga nada.
  useEffect(() => {
    cancelRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onCancel]);

  return (
    <div
      className="overlay"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="reset-title"
      aria-describedby="reset-desc"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="reset-card">
        <span className="reset-emoji" aria-hidden="true">
          🔄
        </span>
        <h2 id="reset-title" className="reset-title">
          Começar do zero?
        </h2>
        <p id="reset-desc" className="reset-desc">
          As estrelas, os níveis e as figurinhas do álbum vão ser apagados, e o jogo volta para o Nível 1.
        </p>
        <div className="reset-actions">
          <button ref={cancelRef} type="button" className="btn3d btn-keep" onClick={onCancel}>
            <Icon name="arrow-left" />
            Não, continuar
          </button>
          <button type="button" className="btn3d btn-erase" onClick={onConfirm}>
            <Icon name="restart" />
            Sim, recomeçar
          </button>
        </div>
      </div>
    </div>
  );
}
