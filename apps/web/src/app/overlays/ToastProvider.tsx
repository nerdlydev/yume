import type { ReactNode } from 'react';

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      {/* Toast mounting container will go here */}
      <div id="toast-root" className="toast toast-top toast-center z-[80]" />
    </>
  );
}
