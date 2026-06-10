import { Player, RoundChoice, RoundPhase } from '@/types';

export type BadgeVariant = 'dealer' | 'choice' | 'winner' | 'turn';

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
