import type { ReactNode } from 'react';

interface DialogProviderProps {
  children: ReactNode;
}

export function DialogProvider({ children }: DialogProviderProps) {
  return (
    <>
      {children}
      {/* Dialog mounting container will go here */}
      <div id="dialog-root" className="fixed inset-0 pointer-events-none z-[70]" />
    </>
  );
}
