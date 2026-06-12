import { describe, expect, it } from 'vitest';

import type { CardData, Player } from '@/types';

import { getRoundWinners } from './getRoundWinners.util';

function card(value: number): CardData {
  return { suit: '♠', rank: 'A', value };
}

function player(
  id: string,
  options: {
    card?: CardData | null;
    choice?: Player['choice'];
  } = {},
): Player {
  return {
    id,
    name: id,
    score: 0,
    card: options.card !== undefined ? options.card : card(10),
    choice: options.choice ?? null,
  };
}

describe('getRoundWinners', () => {
  it('returns an empty list while the round is still choosing', () => {
    const players = [
      player('alice', { card: card(14), choice: 'in' }),
      player('bob', { card: card(5), choice: 'in' }),
    ];

    expect(getRoundWinners(players, 'choosing')).toEqual([]);
  });

  it('returns the player with the highest card among those who stayed in', () => {
    const players = [
      player('alice', { card: card(10), choice: 'in' }),
      player('bob', { card: card(14), choice: 'in' }),
      player('carol', { card: card(7), choice: 'in' }),
    ];

    const winners = getRoundWinners(players, 'resolved');

    expect(winners).toHaveLength(1);
    expect(winners[0].id).toBe('bob');
  });

  it('returns every player tied for the highest card', () => {
    const players = [
      player('alice', { card: card(14), choice: 'in' }),
      player('bob', { card: card(14), choice: 'in' }),
      player('carol', { card: card(9), choice: 'in' }),
    ];

    const winners = getRoundWinners(players, 'resolved');

    expect(winners.map((winner) => winner.id)).toEqual(['alice', 'bob']);
  });

  it('returns an empty list when every player passed', () => {
    const players = [
      player('alice', { card: card(14), choice: 'pass' }),
      player('bob', { card: card(5), choice: 'pass' }),
    ];

    expect(getRoundWinners(players, 'resolved')).toEqual([]);
  });

  it('ignores players without a card', () => {
    const players = [
      player('alice', { card: null, choice: 'in' }),
      player('bob', { card: card(8), choice: 'in' }),
    ];

    const winners = getRoundWinners(players, 'resolved');

    expect(winners).toHaveLength(1);
    expect(winners[0].id).toBe('bob');
  });
});
