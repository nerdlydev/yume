import type { ReactNode } from 'react';

interface ScreenBodyProps {
  children: ReactNode;
  className?: string;
  scrollable?: boolean;
}

export function ScreenBody({ children, className = '', scrollable = true }: ScreenBodyProps) {
  return (
    <main
      className={`flex-1 flex flex-col w-full relative
        ${scrollable ? 'overflow-y-auto overflow-x-hidden' : 'overflow-hidden'}
        ${className}
      `}
    >
      {children}
    </main>
  );
}
