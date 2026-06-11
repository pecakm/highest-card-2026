import styled, { css } from 'styled-components';

import { choicePulse } from './choicePulse.styled';
import { PlayerSeatProps } from './playerSeat.types';

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
    animation: ${choicePulse} 2s ease-in-out infinite;
  `}

  ${({ $isWinner }) => $isWinner && css`
    border-color: rgba(102, 187, 106, 0.55);
    box-shadow: 0 0 16px rgba(102, 187, 106, 0.2);
  `}
`;
