import Image from 'next/image';

interface Props {
  image: string;
  name: string;
  date: string;
}

export const AuthorInfo = ({ image, name, date }: Props) => {
  return (
    <div className='tablet:gap-[20px] flex items-center gap-[12px]'>
      <Image
        src={image}
        width={49}
        height={49}
        alt={name}
        className='tablet:h-[80px] tablet:w-[80px] w-[49px] rounded-full'
      />
      <div className='flex w-full flex-col'>
        <span className='font-proxima text-text-dark tablet:min-w-[309px] tablet:max-w-[309px] text-[18px] leading-[1.33] font-bold'>
          Written by {name}
        </span>
        <span className='font-proxima text-text-dark text-[18px] leading-[1.33]'>
          {date}
        </span>
      </div>
    </div>
  );
};
