import { Player, RoundChoice, RoundPhase } from '@/types';

export interface GameRoomProps {
  playerName: string;
  round: number;
  roundPhase: RoundPhase;
  choosingPlayerIndex: number;
  dealerPlayerIndex: number;
  players: Player[];
  onRoundChoice: (choice: RoundChoice) => void;
}
