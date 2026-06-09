import type { Player } from '@/types';

export function getDisplayPlayers(players: Player[], currentPlayerId: string): Player[] {
  const currentPlayerIndex = players.findIndex((player) => player.id === currentPlayerId);

  if (currentPlayerIndex === -1) {
    return players;
  }

  return [
    ...players.slice(currentPlayerIndex + 1),
    ...players.slice(0, currentPlayerIndex),
    players[currentPlayerIndex],
  ];
}
