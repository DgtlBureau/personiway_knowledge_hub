import { Section } from '@/src/components/shared/Section/Section';

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Section id='categoty' className='pb-[0] pt-[0] tablet:p-0 desktop:p-0'>
      {children}
    </Section>
  );
}
