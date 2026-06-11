import styled, { css } from 'styled-components';

import { Color } from './color.enum';
import { BadgeProps } from './badge.types';

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
