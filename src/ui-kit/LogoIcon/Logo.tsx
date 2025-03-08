// import LightLogoIcon from '@/public/assets/images/icons/logo_dark.svg';
import LightLogoIcon from '@/public/assets/images/favicon/favicon.png';
import Image from 'next/image';

export const Logo = () => {
  return (
    <a aria-label='Go to the main page' href='/'>
      {/* <LightLogoIcon className='h-[36px] w-[auto] desktop:h-[41px]' /> */}
      <Image
        height={80}
        width={80}
        src={LightLogoIcon}
        quality={100}
        alt='logo'
      />
    </a>
  );
};
