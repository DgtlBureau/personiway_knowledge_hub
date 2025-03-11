import logoImg from '@/public/assets/images/logo/logo.webp';
import mobileLogoImg from '@/public/assets/images/logo/mobileLogo.webp';
import useMediaQuery from '@/src/utils/useMediaQuery';
import Image from 'next/image';

export const Logo = () => {
  const isMobile = useMediaQuery('<laptop');

  return (
    <a className='' aria-label='Go to the main page' href='/'>
      <Image
        height={80}
        width={80}
        src={isMobile ? mobileLogoImg : logoImg}
        quality={100}
        alt='logo'
        className='h-auto w-[30px] laptop:h-auto laptop:w-[100px]'
      />
    </a>
  );
};
