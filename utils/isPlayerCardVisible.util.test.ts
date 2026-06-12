import { describe, expect, it } from 'vitest';

import type { CardData, Player } from '@/types';

import { isPlayerCardVisible } from './isPlayerCardVisible.util';

const testCard: CardData = { suit: '♠', rank: 'A', value: 14 };

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
    card: options.card !== undefined ? options.card : testCard,
    choice: options.choice ?? null,
  };
}

describe('isPlayerCardVisible', () => {
  it('lets the viewer see their own card during choosing', () => {
    const subject = player('alice', { choice: null });

    expect(isPlayerCardVisible(subject, 'alice', 'choosing')).toBe(true);
  });

  it('hides an opponent card during choosing', () => {
    const subject = player('bob', { choice: 'in' });

    expect(isPlayerCardVisible(subject, 'alice', 'choosing')).toBe(false);
  });

  it('reveals an opponent card after the round resolves when they stayed in', () => {
    const subject = player('bob', { choice: 'in' });

    expect(isPlayerCardVisible(subject, 'alice', 'resolved')).toBe(true);
  });

  it('hides a passed hand from everyone, including the viewer', () => {
    const subject = player('alice', { choice: 'pass' });

    expect(isPlayerCardVisible(subject, 'alice', 'choosing')).toBe(false);
    expect(isPlayerCardVisible(subject, 'alice', 'resolved')).toBe(false);
    expect(isPlayerCardVisible(subject, 'bob', 'resolved')).toBe(false);
  });

  it('returns false when the player has no card', () => {
    const subject = player('alice', { card: null, choice: null });

    expect(isPlayerCardVisible(subject, 'alice', 'choosing')).toBe(false);
  });
});
