import type { Player, RoundPhase } from '@/types';

import { isPlayerCardVisible } from './isPlayerCardVisible.util';

export function getPublicPlayerList(
  players: Player[],
  viewerPlayerId: string | undefined,
  roundPhase: RoundPhase,
): Player[] {
  return players.map((player) => {
    const cardVisible = isPlayerCardVisible(player, viewerPlayerId, roundPhase);

    return {
      ...player,
      card: cardVisible ? player.card : null,
      cardFaceDown: Boolean(player.card) && player.choice !== 'pass' && !cardVisible,
      hasCardThisRound: Boolean(player.card),
    };
  });
}
