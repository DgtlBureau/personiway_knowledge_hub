import Arrow from '@/public/assets/images/icons/arrow.svg';

interface Props {
  currentPage: number;
  postsPerPage: number;
  postLength: number;
  paginate: (arg: number) => void;
  prevPage: () => void;
  nextPage: () => void;
}

export const Pagination = ({
  currentPage,
  postsPerPage,
  postLength,
  paginate,
  prevPage,
  nextPage,
}: Props) => {
  const postNumbers = [];
  const buttons = Math.ceil(postLength / postsPerPage);

  for (let i = 1; i <= buttons; i++) {
    postNumbers.push(i);
  }

  const isNextDisable = currentPage < postLength / postsPerPage;
  const isPrevtDisable = currentPage !== 1;

  return (
    <div className='laptop-big:ml-[calc(50%_-_30%_-_30px)] laptop-big:justify-normal flex w-full items-center justify-center gap-[4px]'>
      <button
        type='button'
        onClick={prevPage}
        className='paginationBtn flex items-center gap-[4px] text-[18px] leading-[1.3]'
        disabled={!isPrevtDisable}
      >
        <Arrow
          className={`fill-text-dark h-[auto] w-[20px] rotate-[180deg] ${isPrevtDisable ? 'opacity-[100%]' : 'opacity-[40%]'}`}
        />
        <span
          className={`tablet:text-[18px] text-[14px] leading-[1.3] ${isPrevtDisable ? 'opacity-[100%]' : 'opacity-[40%]'}`}
        >
          Back
        </span>
      </button>
      {
        <ul className='flex gap-[4px]'>
          {postNumbers.map((item) => (
            <li key={item}>
              <button
                type='button'
                className={`bg-btn-col text-text-dark tablet:text-[18px] h-[48px] rounded-[8px] px-[16px] py-[12px] text-[14px] ${currentPage === item && 'bg-white'}`}
                onClick={() => paginate(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      }
      <button
        type='button'
        onClick={nextPage}
        className='paginationBtn flex h-[48px] items-center gap-[4px]'
        disabled={!isNextDisable}
      >
        <span
          className={`tablet:text-[18px] text-[14px] leading-[1.3] ${isNextDisable ? 'opacity-[100%]' : 'opacity-[40%]'}`}
        >
          Next
        </span>
        <Arrow
          className={`fill-text-dark w-[20px] ${isNextDisable ? 'opacity-[100%]' : 'opacity-[40%]'}`}
        />
      </button>
    </div>
  );
};
