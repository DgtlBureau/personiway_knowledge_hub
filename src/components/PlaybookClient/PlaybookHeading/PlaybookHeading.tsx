'use client';

import { underscopeReverter } from '@/src/utils/formatter/underscopeFormatter';
import { usePathname, useSearchParams } from 'next/navigation';

export const PlaybookHeading = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const subCategory = searchParams.get('sub-category');
  const tag = searchParams.get('tag');

  const pathnameArr = pathname.split('/').filter((item) => item !== '');
  const pathTitle = pathnameArr.length < 2 ? 'playbook' : pathnameArr[1];

  return (
    <div>
      <h2 className='font-unbound tablet:text-[45px] tablet:leading-[1] laptop-big:text-start laptop-big:text-[45px] w-full text-center text-[24px] leading-[1.16] uppercase'>
        {pathTitle}{' '}
        <span className='text-main-blue tablet:text-[20px] tablet:leading-[1.2] text-[18px] leading-[1.3]'>
          {subCategory && `/ ${underscopeReverter(subCategory)}`}
        </span>{' '}
        <span className='text-main-blue tablet:text-[20px] tablet:leading-[1.2] text-[18px] leading-[1.3]'>
          {tag && `/ ${underscopeReverter(tag)}`}
        </span>
      </h2>
    </div>
  );
};
