import type { BadgeVariant, Player, RoundPhase } from '@/types';

export interface PlayerSeatListProps {
  title: string;
  players: Player[];
  roundPhase: RoundPhase;
  choosingPlayerId?: string;
  dealerPlayerId?: string;
}

export interface BadgeProps {
  $variant: BadgeVariant;
}
