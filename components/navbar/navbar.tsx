import { useTranslations } from 'next-intl';

import { NavbarProps } from './navbar.types';
import { heroCards } from './navbar.constants';
import { Container, Inner, Title, CardFan, StyledCard } from './navbar.styled';

export default function Navbar({ className }: NavbarProps) {
  const t = useTranslations('Navbar');

  return (
    <Container className={className}>
      <Inner>
        <CardFan aria-hidden>
          {heroCards.map((card) => (
            <StyledCard key={`${card.rank}${card.suit}`} card={card} size="sm" />
          ))}
        </CardFan>
        <Title href="/">{t('title')}</Title>
        <CardFan aria-hidden>
          {heroCards.map((card) => (
            <StyledCard key={`${card.rank}${card.suit}`} card={card} size="sm" />
          ))}
        </CardFan>
      </Inner>
    </Container>
  );
}
