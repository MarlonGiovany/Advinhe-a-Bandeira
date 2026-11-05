import type { ReactNode } from 'react';

export type IconName =
  | 'home'
  | 'sound-on'
  | 'sound-off'
  | 'fullscreen'
  | 'fullscreen-exit'
  | 'arrow-left'
  | 'arrow-right'
  | 'play'
  | 'restart'
  | 'star';

const SPEAKER = <path d="M4 9.2h3.6L12.4 5v14l-4.8-4.2H4z" fill="currentColor" />;

const ICONS: Record<IconName, ReactNode> = {
  home: <path d="M3.5 11.2 12 3.8l8.5 7.4M6 9.6V20h4.5v-5.5h3V20H18V9.6" />,
  'sound-on': (
    <>
      {SPEAKER}
      <path d="M15.6 9.2a4 4 0 0 1 0 5.6M18.2 6.6a7.6 7.6 0 0 1 0 10.8" />
    </>
  ),
  'sound-off': (
    <>
      {SPEAKER}
      <path d="m16 9.5 5 5m0-5-5 5" />
    </>
  ),
  fullscreen: <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />,
  'fullscreen-exit': <path d="M9 4v5H4M15 4v5h5M20 15h-5v5M4 15h5v5" />,
  'arrow-left': <path d="M19 12H5.5M11 5.5 4.5 12l6.5 6.5" />,
  'arrow-right': <path d="M5 12h13.5M13 5.5l6.5 6.5-6.5 6.5" />,
  play: <path d="M8 5.2v13.6L19 12z" fill="currentColor" />,
  restart: <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4v4.5H9" />,
  star: (
    <path
      d="M12 2.8l2.8 5.8 6.4.9-4.6 4.5 1.1 6.3L12 17.3l-5.7 3 1.1-6.3-4.6-4.5 6.4-.9z"
      fill="currentColor"
    />
  ),
};

export default function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      className={`icon ${className ?? ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name]}
    </svg>
  );
}
