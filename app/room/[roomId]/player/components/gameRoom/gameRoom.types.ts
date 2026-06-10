import { Player, RoundChoice, RoundPhase, BadgeVariant } from '@/types';

export interface GameRoomProps {
  playerId: string;
  roundPhase: RoundPhase;
  choosingPlayerIndex: number;
  dealerPlayerIndex: number;
  players: Player[];
  onRoundChoice: (choice: RoundChoice) => void;
}

export interface OpponentCardProps {
  $isChoosing?: boolean;
  $isWinner?: boolean;
}

export interface BadgeProps {
  $variant: BadgeVariant;
}
