import { Section } from '@/src/components/shared/Section/Section';

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Section id='categoty'>{children}</Section>;
}
