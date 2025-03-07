'use client';

import { Post } from '@/src/types/types';
import useMediaQuery from '@/src/utils/useMediaQuery';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { PlaybookCategory } from '../PlaybookCategory/PlaybookCategory';
import { PlaybookCategoryDropDown } from '../PlaybookCategoryDropDown/PlaybookCategoryDropDown';

const getUniqueArticlesSubCategory = (array: Post[], word: string) => {
  const category = array.filter((item) => item.category.toLowerCase() === word);
  const subCategory = category.map((item) => item.subCategory);
  const uniqueSubCategory = subCategory.filter(
    (value, idx, arr) => arr.indexOf(value) === idx,
  );

  return {
    category: word,
    subCategory: uniqueSubCategory,
  };
};

interface ICategory {
  category: Post[];
}

export const CategoryComponent = ({ category }: ICategory) => {
  const isLaptop = useMediaQuery('>=laptop-big');
  const router = useRouter();
  const pathname = usePathname();
  const [inputValue, setInputValue] = useState('');
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search-query');

  const expertiseCategory = useMemo(
    () => getUniqueArticlesSubCategory(category, 'expertise'),
    [category],
  );
  const insightsCategory = useMemo(
    () => getUniqueArticlesSubCategory(category, 'hvac'),
    [category],
  );

  const articlesCategory = [expertiseCategory, insightsCategory];

  useEffect(() => {
    const query = new URLSearchParams();
    if (inputValue === '') {
      query.set('search-query', '');
      return;
    }
    query.set('search-query', inputValue);
    router.push(`/?${query.toString()}`);
  }, [inputValue, router]);

  useEffect(() => {
    if (!searchQuery) {
      setInputValue('');
      return;
    }
    setInputValue(searchQuery);
  }, [pathname, searchQuery]);

  return (
    <div className='tablet:flex-row tablet:items-end tablet:gap-[64px] laptop-big:w-[30%] laptop-big:flex-col laptop-big:items-start laptop-big:gap-[10px] flex w-full flex-col gap-[12px]'>
      <div className='laptop-big:w-full relative w-full'>
        <input
          placeholder='Search article'
          value={inputValue}
          className='border-main-blue tablet:text-[16px] w-full border-b-[1px] py-[10px] text-[12px] outline-none'
          onChange={(e) => setInputValue(e.target.value)}
        />
        {/* <SearchImage className='absolute right-0 top-[50%] w-[16px] translate-y-[-50%] fill-main-blue' /> */}
      </div>
      <div className='flex flex-col items-start'>
        {articlesCategory && articlesCategory.length !== 0 && (
          <>
            {isLaptop ? (
              <div>
                <Suspense fallback={<div>Loading category....</div>}>
                  <PlaybookCategory category={articlesCategory} />
                </Suspense>
              </div>
            ) : (
              <Suspense fallback={<div>Loading category....</div>}>
                <PlaybookCategoryDropDown categories={articlesCategory} />
              </Suspense>
            )}
          </>
        )}
      </div>
    </div>
  );
};
