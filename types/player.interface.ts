import type { Card } from './card.type';
import type { RoundChoice } from './roundChoice.type';

export interface Player {
  id: string;
  name: string;
  score: number;
  card: Card | null;
  choice: RoundChoice | null;
}
