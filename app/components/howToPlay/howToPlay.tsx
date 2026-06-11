import { useTranslations } from 'next-intl';

import { SectionLabel } from '@/ui';

import { stepKeys } from './howToPlay.constants';
import {
  Container,
  StepList,
  StepItem,
  StepNumber,
  StepContent,
  StepTitle,
  StepDescription,
  ScoringNote,
} from './howToPlay.styled';

export default function HowToPlay() {
  const t = useTranslations('HomePage.howToPlay');

  return (
    <Container>
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
    </Container>
  );
}
