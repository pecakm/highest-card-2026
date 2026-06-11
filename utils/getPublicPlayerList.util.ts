import type { Player, RoundPhase } from '@/types';

import { isPlayerCardVisible } from './isPlayerCardVisible.util';

export function getPublicPlayerList(
  players: Player[],
  viewerPlayerId: string | undefined,
  roundPhase: RoundPhase,
): Player[] {
  return players.map((player) => ({
    ...player,
    card: isPlayerCardVisible(player, viewerPlayerId, roundPhase) ? player.card : null,
  }));
}
