/// <reference types="vite-plugin-pwa/client" />
import { registerSW } from 'virtual:pwa-register';
import { handleUpdate } from './update-manager';

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    const updateSW = registerSW({
      onNeedRefresh() {
        handleUpdate(updateSW);
      },
      onOfflineReady() {
        console.log('PWA is ready to work offline');
      },
      onRegistered(r: ServiceWorkerRegistration | undefined) {
        console.log('SW Registered:', r);
      },
      onRegisterError(error: unknown) {
        console.error('SW Registration Error:', error);
      },
    });
  }
}
