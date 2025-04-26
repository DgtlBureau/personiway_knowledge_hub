import { Container } from '../shared/Container/Container';
import { FooterLinksInfo } from './FooterLinksInfo/FooterLinksInfo';

export const Footer = () => {
  return (
    <footer className='w-full bg-main-bg py-[40px] text-[14px] leading-[1.2] tablet:py-[60px] desktop:text-[18px] desktop:leading-[1.1]'>
      <Container className='flex flex-col gap-[40px]'>
        <div className='flex w-full flex-col gap-[40px] tablet:gap-[60px] laptop:flex-row laptop:justify-between desktop:justify-between'>
          <FooterLinksInfo />
        </div>
      </Container>
    </footer>
  );
};
