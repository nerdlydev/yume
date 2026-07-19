import type { ReactNode } from 'react';

interface ScreenHeaderProps {
  children: ReactNode;
  className?: string;
  transparent?: boolean;
}

export function ScreenHeader({ children, className = '', transparent = false }: ScreenHeaderProps) {
  return (
    <header
      className={`sticky top-0 z-20 w-full px-4 py-3 flex items-center justify-between transition-colors
        ${transparent ? 'bg-transparent' : 'bg-base-300/80 backdrop-blur-md border-b border-base-content/5'}
        ${className}
      `}
    >
      {children}
    </header>
  );
}
