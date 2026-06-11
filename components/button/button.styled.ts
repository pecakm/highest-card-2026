import styled, { css } from 'styled-components';
import { Button as MuiButton } from '@mui/material';

import { ButtonVariant, ContainerProps } from './button.types';

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    && {
      background: linear-gradient(180deg, #4caf50 0%, #2e7d32 100%);
      color: #fff;

      &:not(:disabled):hover {
        background: linear-gradient(180deg, #66bb6a 0%, #388e3c 100%);
      }
    }
  `,
  secondary: css`
    && {
      background: rgba(255, 255, 255, 0.08);
      color: rgba(254, 254, 254, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.2);

      &:not(:disabled):hover {
        background: rgba(255, 255, 255, 0.14);
      }
    }
  `,
};

export const Container = styled(MuiButton)<ContainerProps>`
  && {
    padding-block: 0.875rem;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    border-radius: 0.75rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease,
      opacity 0.15s ease;

    &:not(:disabled):hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
    }

    &:not(:disabled):active {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.45;
      box-shadow: none;
    }
  }

  ${({ $variant }) => variantStyles[$variant]}
`;
