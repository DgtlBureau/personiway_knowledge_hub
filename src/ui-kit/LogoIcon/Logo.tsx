import LightLogoIcon from '@/public/assets/images/logo/logo.png';
import Image from 'next/image';

export const Logo = () => {
  return (
    <a aria-label='Go to the main page' href='/'>
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
