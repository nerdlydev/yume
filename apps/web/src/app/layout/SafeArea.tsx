import type { ReactNode } from 'react';

interface SafeAreaProps {
  children: ReactNode;
  className?: string;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}

/**
 * SafeArea provides padding to ensure content is not obscured by device notches or home indicators.
 * It uses CSS environment variables to adapt to the installed PWA context on mobile devices.
 */
export function SafeArea({
  children,
  className = '',
  top = false,
  bottom = false,
  left = false,
  right = false,
}: SafeAreaProps) {
  // We use inline styles to map CSS env variables directly, as Tailwind doesn't have these by default
  // though we could add them to the index.css. Inline is safe here for the structural primitives.
  return (
    <div
      className={className}
      style={{
        paddingTop: top ? 'env(safe-area-inset-top)' : undefined,
        paddingBottom: bottom ? 'env(safe-area-inset-bottom)' : undefined,
        paddingLeft: left ? 'env(safe-area-inset-left)' : undefined,
        paddingRight: right ? 'env(safe-area-inset-right)' : undefined,
      }}
    >
      {children}
    </div>
  );
}
