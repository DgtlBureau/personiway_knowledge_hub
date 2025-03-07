import classNames from 'classnames';
import { HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export const Section = ({
  children,
  className,
  light,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLElement> & { light?: boolean }>) => {
  return (
    <section
      className={twMerge(
        classNames(
          'tablet:py-[60px] desktop:py-[80px] relative py-[40px]',
          className,
          {
            'text-dark bg-white': light,
          },
        ),
      )}
      {...rest}
    >
      {children}
    </section>
  );
};
