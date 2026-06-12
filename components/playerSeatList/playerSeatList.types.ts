import type { Player, RoundPhase } from '@/types';

export interface PlayerSeatListProps {
  title: string;
  players: Player[];
  roundPhase: RoundPhase;
  choosingPlayerId?: string;
  dealerPlayerId?: string;
  winnerPlayerIds?: string[];
}
