import styled, { css } from 'styled-components';

import { Color } from '@/ui';

import type { CardSize, CardBaseProps, FaceProps, CornerProps } from './card.types';

const sizeStyles: Record<
  CardSize,
  {
    width: string;
    height: string;
    cornerRank: string;
    cornerSuit: string;
    centerSuit: string;
    borderRadius: string;
  }
> = {
  sm: {
    width: '2.25rem',
    height: '3.125rem',
    cornerRank: '0.625rem',
    cornerSuit: '0.625rem',
    centerSuit: '1rem',
    borderRadius: '0.3rem',
  },
  md: {
    width: '3.5rem',
    height: '4.875rem',
    cornerRank: '0.875rem',
    cornerSuit: '0.875rem',
    centerSuit: '1.5rem',
    borderRadius: '0.4rem',
  },
  lg: {
    width: 'clamp(4.5rem, 28vw, 7rem)',
    height: 'clamp(6.25rem, 39vw, 9.75rem)',
    cornerRank: 'clamp(1rem, 5vw, 1.375rem)',
    cornerSuit: 'clamp(1rem, 5vw, 1.375rem)',
    centerSuit: 'clamp(1.75rem, 10vw, 2.75rem)',
    borderRadius: '0.5rem',
  },
};

const cardBase = css<CardBaseProps>`
  display: inline-flex;
  flex-shrink: 0;
  width: ${({ $size }) => sizeStyles[$size].width};
  height: ${({ $size }) => sizeStyles[$size].height};
  border-radius: ${({ $size }) => sizeStyles[$size].borderRadius};
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.18),
    inset 0 0 0 1px rgba(255, 255, 255, 0.08);
`;

export const Face = styled.div<FaceProps>`
  ${cardBase}
  position: relative;
  background: #fff;
  color: ${({ $red }) => ($red ? Color.Red : Color.Black)};
`;

export const CornerSpan = styled.span``;

export const Corner = styled.div<CornerProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
  font-weight: 700;
  inset-block-start: ${({ $inverted }) => ($inverted ? 'auto' : '0.3em')};
  inset-block-end: ${({ $inverted }) => ($inverted ? '0.3em' : 'auto')};
  inset-inline-start: ${({ $inverted }) => ($inverted ? 'auto' : '0.35em')};
  inset-inline-end: ${({ $inverted }) => ($inverted ? '0.35em' : 'auto')};
  transform: ${({ $inverted }) => ($inverted ? 'rotate(180deg)' : 'none')};

  ${CornerSpan} {
    font-size: ${({ $size }) => sizeStyles[$size].cornerRank};
  }

  ${CornerSpan}:last-child {
    font-size: ${({ $size }) => sizeStyles[$size].cornerSuit};
    margin-block-start: 0.1em;
  }
`;

export const CenterSuit = styled.span<CardBaseProps>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ $size }) => sizeStyles[$size].centerSuit};
  line-height: 1;
`;

export const Back = styled.div<CardBaseProps>`
  ${cardBase}
  background:
    repeating-linear-gradient(
      45deg,
      ${Color.BackStripes} 0,
      ${Color.BackStripes} 0.4em,
      ${Color.BackStripesAlt} 0.4em,
      ${Color.BackStripesAlt} 0.8em
    );
  position: relative;
  overflow: hidden;

  &::after {
    content: '♠';
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.18);
    font-size: ${({ $size }) => sizeStyles[$size].centerSuit};
    line-height: 1;
  }
`;

export const Empty = styled.div<CardBaseProps>`
  ${cardBase}
  align-items: center;
  justify-content: center;
  border-style: dashed;
  border-color: rgba(254, 254, 254, 0.25);
  background: rgba(254, 254, 254, 0.04);
  color: rgba(254, 254, 254, 0.45);
  font-size: ${({ $size }) => sizeStyles[$size].cornerRank};
  font-weight: 700;
`;
