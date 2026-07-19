import type { ReactNode } from 'react';

interface BottomSheetProviderProps {
  children: ReactNode;
}

export function BottomSheetProvider({ children }: BottomSheetProviderProps) {
  return (
    <>
      {children}
      {/* Bottom sheet mounting container will go here */}
      <div id="bottom-sheet-root" className="fixed inset-0 pointer-events-none z-[60]" />
    </>
  );
}
