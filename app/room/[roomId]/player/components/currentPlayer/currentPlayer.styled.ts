import styled, { css } from 'styled-components';

import { choicePulse } from '@/ui/choicePulse.styled';

import { YourCardProps } from './currentPlayer.types';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-block-start: 1.25rem;
  padding-block-start: 1.5rem;
  border-block-start: 1px solid rgba(255, 255, 255, 0.08);
`;

export const YourCard = styled.div<YourCardProps>`
  display: flex;
  justify-content: center;
  filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.45));
  border-radius: 1rem;
  border: 2px solid transparent;
  padding: 0.5rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  ${({ $isChoosing }) => $isChoosing && css`
    border-color: rgba(255, 213, 79, 0.65);
    animation: ${choicePulse} 2s ease-in-out infinite;
  `}
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
