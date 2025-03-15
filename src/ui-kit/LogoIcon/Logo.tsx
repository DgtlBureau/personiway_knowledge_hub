import LogoImg from '@/public/assets/images/logo/logo.svg';
import MobileLogoImg from '@/public/assets/images/logo/mobile_logo.svg';
import useMediaQuery from '@/src/utils/useMediaQuery';

export const Logo = () => {
  const isMobile = useMediaQuery('<laptop');

  return (
    <a className='' aria-label='Go to the main page' href='/'>
      {!isMobile ? (
        <LogoImg className='h-[60px] w-[auto]' />
      ) : (
        <MobileLogoImg className='h-[60px] w-[auto]' />
      )}
    </a>
  );
};
