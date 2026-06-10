import styled, { css } from 'styled-components';

import { StatusVariant } from '@/types';

import { Color } from './color.enum';
import { tableSurface } from './tableSurface.styled';
import { StatusBannerProps } from './roomLayout.types';

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

export const RoomContainer = styled.div`
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

export const PlayersGrid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SeatName = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  max-width: 6.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
