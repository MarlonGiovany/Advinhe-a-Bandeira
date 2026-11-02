import Icon from './Icon';

export default function SoundButton({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className={`icon-btn ${on ? '' : 'is-off'}`}
      onClick={onToggle}
      aria-label={on ? 'Desligar o som' : 'Ligar o som'}
      aria-pressed={on}
    >
      <Icon name={on ? 'sound-on' : 'sound-off'} />
    </button>
  );
}
