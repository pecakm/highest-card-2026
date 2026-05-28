import { useTranslations } from 'next-intl';

import { Container } from './page.styled';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <Container>
      {t('title')}
    </Container>
  );
}
