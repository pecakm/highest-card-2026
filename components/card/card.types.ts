import type { CardData } from '@/types';

export type CardSize = 'sm' | 'md' | 'lg';

export interface CardProps {
  card?: CardData | null;
  faceDown?: boolean;
  size?: CardSize;
  className?: string;
}

export interface CardBaseProps {
  $size: CardSize;
}

export interface FaceProps extends CardBaseProps {
  $red: boolean;
}

export interface CornerProps extends CardBaseProps {
  $inverted?: boolean;
}
