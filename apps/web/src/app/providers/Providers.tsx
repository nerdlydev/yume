import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { BottomSheetProvider } from '../overlays/BottomSheetProvider';
import { DialogProvider } from '../overlays/DialogProvider';

import { ToastProvider } from '../overlays/ToastProvider';
import { PWAProvider } from '../pwa';
import { AuthProvider } from './AuthProvider';

// We can extract this if we want to share the client
const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Global application providers.
 * This component acts as the single composition root for all context providers.
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PWAProvider>
          <ToastProvider>
            <DialogProvider>
              <BottomSheetProvider>{children}</BottomSheetProvider>
            </DialogProvider>
          </ToastProvider>
        </PWAProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
