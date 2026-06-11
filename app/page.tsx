import { getTranslations } from 'next-intl/server';

import { PageContainer, Table, SectionLabel } from '@/ui';

import { CreateRoom, Hero } from './components';
import { stepKeys } from './page.constants';
import {
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
      <Hero />
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
