'use client';

import { Logo } from '@/src/ui-kit/LogoIcon/Logo';
import { menuListLayer } from '@/src/utils/menuListLayer';
import { useState } from 'react';

import { MainList } from '../NavList/MainList';
import { Container } from '../shared/Container/Container';

export const Header = () => {
  const [activeSubmenu, setActiveSubmenu] = useState(false);

  const handleChangeActiveMenu = (isActive: boolean) => {
    setActiveSubmenu(isActive);
  };

  return (
    <header className={`sticky top-0 z-50 mx-auto h-[100px] w-full bg-main-bg`}>
      <Container
        className={`relative flex h-full items-center overflow-hidden bg-main-bg`}
      >
        <Logo />
        <nav className='mx-[auto] w-fit pr-[30px] laptop:pr-[100px]'>
          <MainList
            list={menuListLayer}
            activeSubmenu={activeSubmenu}
            onMenuItemHover={handleChangeActiveMenu}
          />
        </nav>
      </Container>
    </header>
  );
};
