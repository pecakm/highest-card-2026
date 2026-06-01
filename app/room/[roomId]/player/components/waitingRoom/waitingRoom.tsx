import { useTranslations } from 'next-intl';

import { WaitingRoomProps } from './waitingRoom.types';
import {
  Container,
  PlayersTitle,
  PlayersList,
  PlayerItem,
} from './waitingRoom.styled';

export default function WaitingRoom({ players }: WaitingRoomProps) {
  const t = useTranslations('PlayerPage.WaitingRoom');

  return (
    <Container>
      <PlayersTitle>{t('players')} ({players.length})</PlayersTitle>
      <PlayersList>
        {players.map((player) => (
          <PlayerItem key={player.id}>
            {player.name}
          </PlayerItem>
        ))}
      </PlayersList>
    </Container>
  );
}
