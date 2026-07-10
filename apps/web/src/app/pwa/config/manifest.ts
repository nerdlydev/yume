import type { VitePWAOptions } from 'vite-plugin-pwa';

export const manifest: Partial<VitePWAOptions['manifest']> = {
  id: '/',
  scope: '/',
  start_url: '/',
  name: 'Yume',
  short_name: 'Yume',
  description: 'A mobile-first consumer social platform',
  display: 'standalone',
  orientation: 'portrait',
  theme_color: '#000000',
  background_color: '#ffffff',
  categories: ['social', 'lifestyle'],
  icons: [
    {
      src: 'icon-192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: 'icon-512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
};
