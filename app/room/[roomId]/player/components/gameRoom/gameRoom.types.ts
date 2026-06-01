import { Player, RoundChoice, RoundPhase } from '@/types';

export interface GameRoomProps {
  round: number;
  roundPhase: RoundPhase;
  choosingPlayerIndex: number;
  players: Player[];
  onRoundChoice: (choice: RoundChoice) => void;
}
