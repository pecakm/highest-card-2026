import { useTranslations } from 'next-intl';

import { CreateRoom } from './components';
import { Container, Title } from './page.styled';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <Container>
      <Title>{t('title')}</Title>
      <CreateRoom />
    </Container>
  );
}
