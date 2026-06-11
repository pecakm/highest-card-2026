import { getTranslations } from 'next-intl/server';

import { PageContainer, Table, SectionLabel } from '@/ui';

import { Hero, GetStarted } from './components';
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
} from './page.styled';

export default async function HomePage() {
  const t = await getTranslations('HomePage');

  return (
    <PageContainer>
      <Hero />
      <Table>
        <GetStarted />
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
