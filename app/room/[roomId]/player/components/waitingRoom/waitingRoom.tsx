import { useTranslations } from 'next-intl';

import {
  RoomContainer,
  StatusBanner,
  Table,
  SectionLabel,
  PlayersGrid,
  SeatName,
} from '@/ui';

import { WaitingRoomProps } from './waitingRoom.types';
import { PlayerCard } from './waitingRoom.styled';

export default function WaitingRoom({ players }: WaitingRoomProps) {
  const t = useTranslations('PlayerPage.WaitingRoom');

  return (
    <RoomContainer>
      <StatusBanner $variant="waiting">{t('waitingForGame')}</StatusBanner>
      <Table>
        <SectionLabel>
          {t('players')} ({players.length})
        </SectionLabel>
        <PlayersGrid>
          {players.map((player) => (
            <PlayerCard key={player.id}>
              <SeatName>{player.name}</SeatName>
            </PlayerCard>
          ))}
        </PlayersGrid>
      </Table>
    </RoomContainer>
  );
}
