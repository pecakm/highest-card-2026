import { useTranslations } from 'next-intl';

import { HeroCards } from './hero.constants';
import { Container, Tagline, CardFan, StyledCard } from './hero.styled';

export default function Hero() {
  const t = useTranslations('HomePage.hero');

  return (
    <Container>
      <Tagline>{t('tagline')}</Tagline>
      <CardFan aria-hidden>
        {HeroCards.map((card) => (
          <StyledCard key={`${card.rank}${card.suit}`} card={card} size="md" />
        ))}
      </CardFan>
    </Container>
  );
}
