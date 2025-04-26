'use client';

import LinkedInIcon from '@/public/assets/images/icons/linkedin.svg';
import useMediaQuery from '@/src/utils/useMediaQuery';
import Link from 'next/link';
import { AddressInfo } from './AddressInfo';

export const FooterLinksInfo = () => {
  const isMobile = useMediaQuery('<laptop-big');
  return (
    <div className='flex w-full flex-col justify-between'>
      <div className='flex flex-col text-white'>
        <div className='flex items-center justify-between'>
          {isMobile && (
            <Link
              target='_blank'
              rel='noopener'
              href='https://www.linkedin.com/company/thebrightbyte/'
            >
              <LinkedInIcon className='h-[32px] w-[auto]' />
            </Link>
          )}
        </div>
        <div className='mt-[24px] grid w-full grid-cols-1 tablet:mt-[40px] laptop:mt-[80px] laptop:grid-cols-2'>
          <Link
            href='mailto:info@personiway.com'
            className='flex h-full w-full items-center font-proxima text-[18px] font-bold text-white tablet:text-[20px] laptop:order-last laptop:justify-end desktop:text-[26px]'
          >
            info@personiway.com
          </Link>
          <AddressInfo />
        </div>
      </div>
      {!isMobile && (
        <div className='ml-auto flex items-start laptop:items-end'>
          <Link
            target='_blank'
            rel='noopener'
            href='https://www.linkedin.com/company/personiway'
          >
            <LinkedInIcon className='h-[32px] w-[auto]' />
          </Link>
        </div>
      )}
    </div>
  );
};
