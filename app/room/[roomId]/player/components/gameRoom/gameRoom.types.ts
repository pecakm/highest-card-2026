import { Player, RoundChoice, RoundPhase } from '@/types';

export interface GameRoomProps {
  playerId: string;
  roundPhase: RoundPhase;
  choosingPlayerIndex: number;
  dealerPlayerIndex: number;
  players: Player[];
  onRoundChoice: (choice: RoundChoice) => void;
}
