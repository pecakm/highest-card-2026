import { useTranslations } from 'next-intl';

import { Badge, SectionLabel, Score, BadgeRow } from '@/ui';
import { Button, Card } from '@/components';

import { CurrentPlayerProps } from './currentPlayer.types';
import {
  Container,
  YourCard,
  PlayerInfo,
  PlayerName,
  ActionButtons,
} from './currentPlayer.styled';

export default function CurrentPlayer({
  player,
  roundPhase,
  isDealer,
  isMyTurn,
  isWinner,
  onRoundChoice,
}: CurrentPlayerProps) {
  const t = useTranslations('PlayerPage.currentPlayer');
  const buttonsDisabled =
    roundPhase !== 'choosing' || !isMyTurn || player?.choice !== null;

  return (
    <Container>
      <SectionLabel>{t('yourHand')}</SectionLabel>
      <YourCard>
        <Card card={player.card} size="lg" />
      </YourCard>
      <PlayerInfo>
        <PlayerName>{player.name}</PlayerName>
        <Score>
          {player.score} {t('points')}
        </Score>
        <BadgeRow>
          {isDealer && <Badge $variant="dealer">{t('dealer')}</Badge>}
          {isMyTurn && <Badge $variant="turn">{t('yourTurn')}</Badge>}
          {roundPhase === 'choosing' && player.choice && (
            <Badge $variant="choice">{t(player.choice)}</Badge>
          )}
          {isWinner && <Badge $variant="winner">{t('winner')}</Badge>}
        </BadgeRow>
      </PlayerInfo>
      <ActionButtons>
        <Button disabled={buttonsDisabled} onClick={() => onRoundChoice('in')}>
          {t('in')}
        </Button>
        <Button
          variant="secondary"
          disabled={buttonsDisabled}
          onClick={() => onRoundChoice('pass')}
        >
          {t('pass')}
        </Button>
      </ActionButtons>
    </Container>
  );
}
