import type { CardData } from './cardData.interface';
import type { RoundChoice } from './roundChoice.type';

export interface Player {
  id: string;
  name: string;
  score: number;
  card: CardData | null;
  choice: RoundChoice | null;
  cardFaceDown?: boolean;
  hasCardThisRound?: boolean;
}
