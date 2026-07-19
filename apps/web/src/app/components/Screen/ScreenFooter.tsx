import type { ReactNode } from 'react';

interface ScreenFooterProps {
  children: ReactNode;
  className?: string;
  transparent?: boolean;
}

export function ScreenFooter({ children, className = '', transparent = false }: ScreenFooterProps) {
  return (
    <footer
      className={`sticky bottom-0 z-20 w-full px-4 py-3 mt-auto transition-colors
        ${transparent ? 'bg-transparent' : 'bg-base-300/80 backdrop-blur-md border-t border-base-content/5'}
        ${className}
      `}
    >
      {children}
    </footer>
  );
}
