import Link from 'next/link';
import styled, { css, keyframes } from 'styled-components';

import { Color } from '@/ui';

import { BadgeProps, PlayerSeatProps } from './page.types';

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(255, 213, 79, 0.45);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(255, 213, 79, 0);
  }
`;

export const PlayerSeat = styled.li<PlayerSeatProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 0.75rem;
  min-width: 5.75rem;
  border-radius: 1rem;
  background: rgba(0, 0, 0, 0.22);
  border: 2px solid rgba(255, 255, 255, 0.06);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  ${({ $isChoosing }) => $isChoosing && css`
    border-color: rgba(255, 213, 79, 0.65);
    animation: ${pulse} 2s ease-in-out infinite;
  `}

  ${({ $isWinner }) => $isWinner && css`
    border-color: rgba(102, 187, 106, 0.55);
    box-shadow: 0 0 16px rgba(102, 187, 106, 0.2);
  `}
`;

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

export const JoinPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-block-start: 0.5rem;
`;

export const QrCode = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
`;

export const JoinUrlRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  text-align: center;
  width: 100%;
  max-width: 28rem;
`;

export const JoinUrlLabel = styled.span`
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(254, 254, 254, 0.45);
`;

export const JoinUrlLink = styled(Link)`
  font-size: 0.8125rem;
  color: rgba(254, 254, 254, 0.85);
  word-break: break-all;
  text-decoration: underline;
  text-underline-offset: 0.15em;

  &:hover {
    color: #fff;
  }
`;

export const CopyButtonRow = styled.div`
  width: 100%;
  max-width: 14rem;
`;
