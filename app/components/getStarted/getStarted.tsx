'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { SectionLabel } from '@/ui';
import { Button } from '@/components';

import { Container, CtaDescription, CtaActions } from './getStarted.styled';

export default function GetStarted() {
  const t = useTranslations('HomePage.getStarted');
  const router = useRouter();

  function createRoom() {
    const roomId = crypto.randomUUID();
    router.push(`/room/${roomId}/lobby`);
  }

  return (
    <Container>
      <SectionLabel>{t('getStarted')}</SectionLabel>
      <CtaDescription>{t('getStartedDescription')}</CtaDescription>
      <CtaActions>
        <Button onClick={createRoom}>{t('createRoom')}</Button>
      </CtaActions>
    </Container>
  );
}
