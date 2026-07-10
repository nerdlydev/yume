import { useEffect } from 'react';
import { InstallPrompt } from './components/InstallPrompt';
import { OfflineBanner } from './components/OfflineBanner';
import { registerServiceWorker } from './services/service-worker';

interface PWAProviderProps {
  children: React.ReactNode;
}

export function PWAProvider({ children }: PWAProviderProps) {
  useEffect(() => {
    // Register the service worker only in production or if explicitly configured
    registerServiceWorker();
  }, []);

  return (
    <>
      <OfflineBanner />
      {children}
      <InstallPrompt />
    </>
  );
}
