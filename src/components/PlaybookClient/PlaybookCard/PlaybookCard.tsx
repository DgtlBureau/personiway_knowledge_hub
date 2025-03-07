'use client';

import defaultImg from '@/public/assets/images/banner/default_insights.webp';
import { formattedDate } from '@/src/utils/formattedDate';
import {
  underscopeFormatter,
  underscopeReverter,
} from '@/src/utils/formatter/underscopeFormatter';
import { Post } from '@/src/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface IArticleProps {
  data: Post;
}

export const PlaybookCard = ({ data }: IArticleProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const subCategory = searchParams.get('sub-category');
  const tag = searchParams.get('tag');
  const allSearchParams = `${subCategory ? `sub-category=${subCategory}&` : ''}`;

  const formatedDate = formattedDate(data.date);
  const tags = data.tag;
  // ? data.tag.split(',').filter((tag) => tag.trim() !== '')
  // : [];

  return (
    <div className='group laptop:flex-row flex flex-col gap-[40px]'>
      <Link
        href={`/${data.category.toLowerCase()}/${data.slug}`}
        className='laptop-big:max-h-[210px] relative aspect-[16/9] min-w-[360px] flex-1 overflow-hidden duration-300 group-hover:shadow-2xl'
      >
        <Image
          src={data.image || defaultImg}
          width={1098}
          height={616}
          alt={data.title}
          className='h-full w-full object-cover object-center duration-300'
          quality={80}
          priority
        />
        <div className='bg-text-dark absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-30' />
      </Link>
      <div className='laptop-big:w-[70%] flex w-full flex-col gap-[20px]'>
        <h2 className='font-unbound text-text-dark laptop-big:text-[24px] w-full text-[18px] leading-[1.2] font-bold duration-300 group-hover:underline'>
          <Link href={`/${data.category.toLowerCase()}/${data.slug}`}>
            {data.title}
          </Link>
        </h2>
        <p className='font-proxima text-text-dark w-full text-[16px] leading-[1.2]'>
          <Link href={`/${data.category.toLowerCase()}/${data.slug}`}>
            {data.description}
          </Link>
        </p>
        <div className='flex w-full flex-col-reverse items-start gap-[20px]'>
          <span className='font-proxima text-text-dark/60 text-[14px] whitespace-nowrap'>
            {formatedDate.toUpperCase()}
          </span>
          {tags && tags.length !== 0 && (
            <ul className='desktop:gap-[24px] flex flex-wrap gap-[8px]'>
              {tags.map((item) => (
                <li key={item} className='h-fit w-fit'>
                  <Link
                    href={`${pathname}?${allSearchParams}tag=${underscopeFormatter(item.trim())}`}
                    className={`border-text-text-dark/60 font-proxima tablet:text-[16px] block rounded-[4px] border-[1px] p-[10px] text-[12px] font-bold capitalize transition-transform duration-300 ease-in-out hover:bg-gray-300 focus:outline-none active:scale-95 ${underscopeReverter(tag).toLowerCase() === item.trim().toLowerCase() ? 'bg-gray-300' : 'bg-gray-200'}`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
