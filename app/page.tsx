import { PageContainer, Table } from '@/ui';

import { Hero, GetStarted, HowToPlay } from './components';

export default async function HomePage() {
  return (
    <PageContainer>
      <Hero />
      <Table>
        <GetStarted />
        <HowToPlay />
      </Table>
    </PageContainer>
  );
}
