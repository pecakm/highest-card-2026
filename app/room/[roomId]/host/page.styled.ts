import Link from 'next/link';
import styled, { css } from 'styled-components';

import { Color } from '@/ui';

import { BadgeProps } from './page.types';

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

export const InviteSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-block-start: 1.25rem;
  padding-block-start: 1.5rem;
  border-block-start: 1px solid rgba(255, 255, 255, 0.08);
`;

export const JoinPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
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
