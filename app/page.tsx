import { getTranslations } from 'next-intl/server';

import { PageContainer, Table, SectionLabel } from '@/ui';

import { CreateRoom } from './components';
import { heroCards, stepKeys } from './page.constants';
import {
  Hero,
  Title,
  Tagline,
  CardFan,
  StyledCard,
  HowToPlaySection,
  StepList,
  StepItem,
  StepNumber,
  StepContent,
  StepTitle,
  StepDescription,
  ScoringNote,
  CtaDescription,
  CtaActions,
} from './page.styled';

export default async function HomePage() {
  const t = await getTranslations('HomePage');

  return (
    <PageContainer>
      <Hero>
        <Title>{t('title')}</Title>
        <Tagline>{t('tagline')}</Tagline>
        <CardFan aria-hidden>
          {heroCards.map((card) => (
            <StyledCard key={`${card.rank}${card.suit}`} card={card} size="md" />
          ))}
        </CardFan>
      </Hero>
      <Table>
        <SectionLabel>{t('getStarted')}</SectionLabel>
        <CtaDescription>{t('getStartedDescription')}</CtaDescription>
        <CtaActions>
          <CreateRoom />
        </CtaActions>
        <HowToPlaySection>
          <SectionLabel>{t('howToPlay')}</SectionLabel>
          <StepList>
            {stepKeys.map((key, index) => (
              <StepItem key={key}>
                <StepNumber>{index + 1}</StepNumber>
                <StepContent>
                  <StepTitle>{t(`steps.${key}.title`)}</StepTitle>
                  <StepDescription>{t(`steps.${key}.description`)}</StepDescription>
                </StepContent>
              </StepItem>
            ))}
          </StepList>
          <ScoringNote>{t('scoring')}</ScoringNote>
        </HowToPlaySection>
      </Table>
    </PageContainer>
  );
}
