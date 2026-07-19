import type { ReactNode } from 'react';

interface ScreenProps {
  children: ReactNode;
  className?: string;
}

/**
 * Screen is the root primitive for all feature views.
 * It provides a consistent flex column structure that spans the full height of the viewport minus safe areas.
 */
export function Screen({ children, className = '' }: ScreenProps) {
  return (
    <div
      className={`flex flex-col flex-1 w-full max-w-screen-xl mx-auto h-full min-h-[100dvh] relative ${className}`}
    >
      {children}
    </div>
  );
}
