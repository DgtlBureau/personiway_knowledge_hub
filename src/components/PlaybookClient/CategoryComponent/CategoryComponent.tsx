'use client';

import SearchImage from '@/public/assets/images/icons/search.svg';
import { Post } from '@/src/utils/types';
import useMediaQuery from '@/src/utils/useMediaQuery';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { PlaybookCategory } from '../PlaybookCategory/PlaybookCategory';
import { PlaybookCategoryDropDown } from '../PlaybookCategoryDropDown/PlaybookCategoryDropDown';

// const getUniqueArticlesSubCategory = (array: Post[], word: string) => {
//   const category = array.filter((item) => item.category.toLowerCase() === word);
//   const subCategory = category.map((item) => item.subCategory);
//   const uniqueSubCategory = subCategory.filter(
//     (value, idx, arr) => arr.indexOf(value) === idx,
//   );

//   return {
//     category: uniqueSubCategory.length > 0 ? word : '',
//     subCategory: uniqueSubCategory.length > 0 ? uniqueSubCategory : [],
//   };
// };

const getUniqueArticlesSubCategory = (array: Post[], word: string) => {
  const category = array.map((item) => item.category.toLowerCase());
  const subCategory = array.map((item) => item.subCategory);
  const uniqueCategory = category.filter(
    (value, idx, arr) => arr.indexOf(value) === idx,
  );
  const uniqueSubCategory = subCategory.filter(
    (value, idx, arr) => arr.indexOf(value) === idx,
  );

  return {
    category: uniqueCategory,
    subCategory: uniqueSubCategory.length > 0 ? uniqueSubCategory : [],
  };
};

interface ICategory {
  category: Post[];
  path: string;
}

export const CategoryComponent = ({ category, path }: ICategory) => {
  const isLaptop = useMediaQuery('>=laptop-big');
  const router = useRouter();
  const pathname = usePathname();
  const [inputValue, setInputValue] = useState('');
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search-query');

  console.log('array', category);

  // const insightsCategory = useMemo(
  //   () => getUniqueArticlesSubCategory(category, 'hvac'),
  //   [category],
  // );
  // const softwaresoftwareCategory = useMemo(
  //   () => getUniqueArticlesSubCategory(category, 'software'),
  //   [category],
  // );
  const allCategory = useMemo(
    () => getUniqueArticlesSubCategory(category, path),
    [category],
  );

  console.log('allCategory', allCategory);

  // const articlesCategory = [insightsCategory, softwaresoftwareCategory];
  const articlesCategory = [allCategory];

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (inputValue === '') {
      query.delete('search-query');
    } else {
      query.set('search-query', inputValue);
    }

    // router.push(`/?${query.toString()}`, { scroll: false });
    router.push(`/${path}?${query.toString()}`, { scroll: false });
  }, [inputValue, router]);

  useEffect(() => {
    if (!searchQuery) {
      setInputValue('');
      return;
    }
    setInputValue(searchQuery);
  }, [pathname, searchQuery]);

  return (
    <div className='flex w-full flex-col gap-[12px] tablet:flex-row tablet:items-end tablet:gap-[64px] laptop-big:w-[30%] laptop-big:flex-col laptop-big:items-start laptop-big:gap-[10px]'>
      <div className='relative w-full laptop-big:w-full'>
        <input
          placeholder='Search article'
          value={inputValue}
          className='w-full border-b-[1px] border-main-blue py-[10px] text-[12px] outline-none tablet:text-[16px]'
          onChange={(e) => setInputValue(e.target.value)}
        />
        <SearchImage className='absolute right-0 top-[50%] w-[16px] translate-y-[-50%] fill-main-blue' />
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
                {/* <PlaybookCategoryDropDown categories={articlesCategory} /> */}
              </Suspense>
            )}
          </>
        )}
      </div>
    </div>
  );
};
