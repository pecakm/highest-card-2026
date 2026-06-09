import { formatCard } from '@/utils';

import { isRedSuit } from './card.utils';
import { CardProps } from './card.types';
import {
  Back,
  CenterSuit,
  Corner,
  CornerSpan,
  Empty,
  Face,
} from './card.styled';

export default function Card({
  card,
  faceDown = false,
  size = 'md',
  className,
}: CardProps) {
  if (faceDown) {
    return (
      <Back
        className={className}
        $size={size}
        role="img"
        aria-label="Hidden card"
      />
    );
  }

  if (!card) {
    return (
      <Empty className={className} $size={size} role="img" aria-label="No card">
        —
      </Empty>
    );
  }

  const red = isRedSuit(card.suit);
  const resolvedSize = size ?? 'md';

  return (
    <Face
      className={className}
      $size={resolvedSize}
      $red={red}
      role="img"
      aria-label={formatCard(card)}
    >
      <Corner $size={resolvedSize}>
        <CornerSpan>{card.rank}</CornerSpan>
        <CornerSpan>{card.suit}</CornerSpan>
      </Corner>
      <CenterSuit $size={resolvedSize}>{card.suit}</CenterSuit>
      <Corner $size={resolvedSize} $inverted>
        <CornerSpan>{card.rank}</CornerSpan>
        <CornerSpan>{card.suit}</CornerSpan>
      </Corner>
    </Face>
  );
}
