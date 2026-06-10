'use client';

import { useTranslations } from 'next-intl';
import { QRCodeCanvas } from 'qrcode.react';

import { SectionLabel } from '@/ui';

import Button from '../button/button';
import {
  InviteSection,
  JoinPanel,
  QrCode,
  JoinUrlRow,
  JoinUrlLabel,
  JoinUrlLink,
} from './invitePlayers.styled';

type InvitePlayersProps = {
  joinUrl: string;
};

export default function InvitePlayers({ joinUrl }: InvitePlayersProps) {
  const t = useTranslations('InvitePlayers');

  function copyJoinUrl() {
    navigator.clipboard.writeText(joinUrl);
  }

  if (!joinUrl) {
    return null;
  }

  return (
    <InviteSection>
      <SectionLabel>{t('invitePlayers')}</SectionLabel>
      <JoinPanel>
        <QrCode>
          <QRCodeCanvas value={joinUrl} size={148} level="M" includeMargin={false} />
        </QrCode>
        <JoinUrlRow>
          <JoinUrlLabel>{t('joinUrl')}</JoinUrlLabel>
          <JoinUrlLink href={joinUrl} target="_blank" rel="noopener noreferrer">
            {joinUrl}
          </JoinUrlLink>
        </JoinUrlRow>
        <Button onClick={copyJoinUrl} variant="secondary">
          {t('copyLink')}
        </Button>
      </JoinPanel>
    </InviteSection>
  );
}
