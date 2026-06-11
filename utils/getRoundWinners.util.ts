import type { Player, RoundPhase } from '@/types';

export function getRoundWinners(players: Player[], roundPhase: RoundPhase): Player[] {
  if (roundPhase !== 'resolved') {
    return [];
  }

  const inPlayers = players.filter((player) => player.choice === 'in' && player.card);

  if (inPlayers.length === 0) {
    return [];
  }

  const highestValue = Math.max(...inPlayers.map((player) => player.card!.value));

  return inPlayers.filter((player) => player.card!.value === highestValue);
}
