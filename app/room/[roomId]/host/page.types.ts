import { BadgeVariant } from '@/types';

export interface BadgeProps {
  $variant: BadgeVariant;
}

export interface PlayerSeatProps {
  $isChoosing?: boolean;
  $isWinner?: boolean;
}
