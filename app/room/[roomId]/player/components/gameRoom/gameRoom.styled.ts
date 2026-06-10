import styled, { css } from 'styled-components';

import { Color } from '@/ui';

import { BadgeProps } from './gameRoom.types';

export const PlayerCardSlot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Score = styled.span`
  font-size: 0.8125rem;
  font-weight: 500;
  color: rgba(254, 254, 254, 0.65);
  font-variant-numeric: tabular-nums;
`;

export const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.35rem;
`;

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.3;

  ${({ $variant }) => {
    switch ($variant) {
      case 'dealer':
        return css`
          background: ${Color.WaitingBg};
          color: ${Color.Waiting};
          border: 1px solid ${Color.WaitingBorder};
        `;
      case 'choice':
        return css`
          background: ${Color.ChoiceBg};
          color: ${Color.Choice};
          border: 1px solid ${Color.ChoiceBorder};
        `;
      case 'winner':
        return css`
          background: ${Color.SuccessBg};
          color: ${Color.Success};
          border: 1px solid ${Color.SuccessBorder};
        `;
      case 'turn':
        return css`
          background: ${Color.WaitingBg};
          color: ${Color.Waiting};
          border: 1px solid ${Color.WaitingBorder};
        `;
    }
  }}
`;

export const PlayerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-block-start: 1.25rem;
  padding-block-start: 1.5rem;
  border-block-start: 1px solid rgba(255, 255, 255, 0.08);
`;

export const YourCard = styled.div`
  display: flex;
  justify-content: center;
  filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.45));
`;

export const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  text-align: center;
`;

export const PlayerName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 100%;
  max-width: 22rem;
  margin-block-start: 0.25rem;

  & > * {
    flex: 1;
  }
`;
