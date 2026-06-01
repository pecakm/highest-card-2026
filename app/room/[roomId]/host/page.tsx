'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import PartySocket from 'partysocket';
import { QRCodeCanvas } from 'qrcode.react';

import { Button } from '@/components';
import { getPlayerCardDisplay, getRoundWinners } from '@/utils';
import { Player, RoundPhase, ServerMessage } from '@/types';

import { Container, Title, Text, PlayersTitle, PlayersList, PlayerItem } from './page.styled';

export default function HostPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const t = useTranslations('HostPage');
  const [players, setPlayers] = useState<Player[]>([]);
  const [round, setRound] = useState(0);
  const [roundPhase, setRoundPhase] = useState<RoundPhase>('resolved');
  const [choosingPlayerIndex, setChoosingPlayerIndex] = useState(0);
  const [dealerPlayerIndex, setDealerPlayerIndex] = useState(-1);
  const socketRef = useRef<PartySocket | null>(null);
  const hasStartedRef = useRef(false);
  const joinUrl = typeof window !== 'undefined' ? `${window.location.origin}/room/${roomId}/join` : '';
  const choosingPlayer = players[choosingPlayerIndex];
  const winners = getRoundWinners(players, roundPhase);

  useEffect(() => {
    const socket = new PartySocket({
      host: process.env.NEXT_PUBLIC_PARTYKIT_HOST!,
      room: roomId,
    });

    socketRef.current = socket;

    const startGame = () => {
      if (hasStartedRef.current) {
        return;
      }

      hasStartedRef.current = true;
      socket.send(JSON.stringify({ type: 'startGame' }));
    };

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data) as ServerMessage;

      if (data.type === 'roomState') {
        setPlayers(data.players);
        setRound(data.round);
        setRoundPhase(data.roundPhase);
        setChoosingPlayerIndex(data.choosingPlayerIndex);
        setDealerPlayerIndex(data.dealerPlayerIndex);
      }
    });

    if (socket.readyState === WebSocket.OPEN) {
      startGame();
    } else {
      socket.addEventListener('open', startGame, { once: true });
    }

    return () => {
      socketRef.current = null;
      socket.close();
    };
  }, [roomId]);

  function nextRound() {
    socketRef.current?.send(JSON.stringify({ type: 'nextRound' }));
  }

  function copyJoinUrl() {
    navigator.clipboard.writeText(joinUrl);
  }

  return (
    <Container>
      <Title>{t('roomId', { roomId })}</Title>
      <Title>{t('round', { round })}</Title>
      {roundPhase === 'choosing' && choosingPlayer && (
        <Text>{t('waitingForPlayer', { name: choosingPlayer.name })}</Text>
      )}
      <PlayersTitle>{t('players')}</PlayersTitle>
      <PlayersList>
        {players.map((player, index) => (
          <PlayerItem key={player.id}>
            {player.name}
            {index === dealerPlayerIndex && ` ${t('dealer')}`}:{' '}
            {getPlayerCardDisplay(player, undefined, roundPhase)} — {player.score}{t('points')}
            {roundPhase === 'choosing' && player.choice && ` (${t(player.choice)})`}
            {winners.some((winner) => winner.id === player.id) ? ` ${t('winner')}` : ''}
          </PlayerItem>
        ))}
      </PlayersList>
      {winners.length > 0 && (
        <Text>
          {t('winners')} {winners.map((winner) => winner.name).join(', ')}
        </Text>
      )}
      <Button onClick={nextRound} disabled={roundPhase === 'choosing'}>
        {t('nextRound')}
      </Button>
      {joinUrl && (
        <>
          <QRCodeCanvas value={joinUrl} />
          <Text>
            {t('joinUrl')} <Link href={joinUrl}>{joinUrl}</Link>
          </Text>
          <Button onClick={copyJoinUrl}>{t('copyLink')}</Button>
        </>
      )}
    </Container>
  );
}
