'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input, Button } from '@/components';
import { joinSchema, JoinFormValues } from '@/validations';

import { Container, Title, Form } from './page.styled';

export default function JoinPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const t = useTranslations('JoinPage');
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JoinFormValues>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      username: '',
    },
  });

  const onSubmit = (data: JoinFormValues) => {
    const username = data.username.trim();

    if (!username) return;

    sessionStorage.setItem(`room:${roomId}:playerName`, username);
    router.push(`/room/${roomId}/player`);
  };

  return (
    <Container>
      <Title>{t('roomId', { roomId })}</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              id="username"
              placeholder={t('yourName')}
              error={!!errors.username}
              helperText={
                errors.username?.message
                  ? t(errors.username.message)
                  : undefined
              }
              {...field}
            />
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {t('joinRoom')}
        </Button>
      </Form>
    </Container>
  );
}
