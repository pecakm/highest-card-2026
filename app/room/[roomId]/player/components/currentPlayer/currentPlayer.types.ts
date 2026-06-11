import { RoundChoice, Player, RoundPhase } from '@/types';

export interface CurrentPlayerProps {
  player: Player;
  isDealer: boolean;
  isWinner: boolean;
  isMyTurn: boolean;
  roundPhase: RoundPhase;
  onRoundChoice: (choice: RoundChoice) => void;
}
