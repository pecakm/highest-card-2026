import styled, { css, keyframes } from 'styled-components';

import { Color, tableSurface } from '@/ui';

import { StatusVariant, StatusBannerProps, OpponentCardProps, BadgeProps } from './gameRoom.types';

const statusStyles: Record<StatusVariant, ReturnType<typeof css>> = {
  info: css`
    background: ${Color.InfoBg};
    border-color: ${Color.InfoBorder};
    color: ${Color.Info};
  `,
  success: css`
    background: ${Color.SuccessBg};
    border-color: ${Color.SuccessBorder};
    color: ${Color.Success};
  `,
  waiting: css`
    background: ${Color.WaitingBg};
    border-color: ${Color.WaitingBorder};
    color: ${Color.Waiting};
  `,
};

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(255, 213, 79, 0.45);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(255, 213, 79, 0);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;

export const StatusBanner = styled.div<StatusBannerProps>`
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid transparent;
  text-align: center;
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.4;

  ${({ $variant }) => statusStyles[$variant]}
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  ${tableSurface}
`;

export const SectionLabel = styled.h2`
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(254, 254, 254, 0.45);
  text-align: center;
  margin-block-end: 0.25rem;
`;

export const OpponentsGrid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  list-style: none;
  padding: 0;
`;

export const OpponentCard = styled.li<OpponentCardProps>`
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

export const OpponentName = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  max-width: 6.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
