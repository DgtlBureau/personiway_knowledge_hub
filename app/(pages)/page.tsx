import { PlaybookClient } from '@/src/components/PlaybookClient/PlaybookClient';
import { getAllArticles } from '@/src/utils/getAllArticles';
import { Suspense } from 'react';

const data = getAllArticles();

export default function PlaybookPage() {
  return (
    <Suspense fallback={<div className='h-screen w-full bg-white'></div>}>
      <PlaybookClient data={data} />
    </Suspense>
  );
}
