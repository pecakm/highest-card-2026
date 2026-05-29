'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from '@/components';

import { Container } from './createRoom.styled';

export default function CreateRoom() {
  const t = useTranslations('HomePage.createRoom');
  const router = useRouter();

  function createRoom() {
    const roomId = crypto.randomUUID();
    router.push(`/room/${roomId}/host`);
  }

  return (
    <Container>
      <Button onClick={createRoom}>{t('createRoom')}</Button>
    </Container>
  );
}
