# Yume PWA Strategy

This document outlines the Progressive Web App (PWA) strategy for Yume, explaining why we chose this path, our caching strategies, and the roadmap for native-like features.

## 1. Purpose
Yume is a mobile-first consumer social platform. Our users open the app multiple times a day to receive messages, upload Journey memories, and browse communities. A PWA fits this behavior perfectly by providing a native-like experience (installable, standalone display, fast) across Desktop, Android, iOS, and Tablets from a single React codebase.

## 2. Goals
The PWA implementation prioritizes:
- **Installability**
- **Fast startup**
- **Native-like UX**
- **Offline resilience** (shell only)
- **Future push notifications**

## 3. Design Principles
**Mobile-First, Always.**
Yume must feel like an app, not a website. Design for the mobile form factor first—utilizing bottom tabs, gesture-friendly targets, and native-feeling transitions. Desktop layouts should naturally adapt from the mobile core, not the opposite.

## 4. Feature Ownership
The PWA module owns:
- Manifest registration
- Service worker registration
- Install flow
- Online/offline detection
- Update notifications
- Browser capability detection

It does NOT own:
- Push notification business logic
- Offline data synchronization
- Cached API responses

## 5. Architecture
PWA is an **application capability**, not a business domain. Therefore, it lives in the application infrastructure layer, outside of `features/`. PWAs do not require changing our backend architecture (Hono RPC + Postgres).

## 6. Feature Structure
The PWA logic is structured as follows:
```text
src/app/pwa/
├── components/   # InstallPrompt.tsx, OfflineBanner.tsx
├── hooks/        # useInstallPrompt.ts, useOnlineStatus.ts
├── config/       # manifest.ts, workbox.ts
├── services/     # service-worker.ts, update management
├── types/        # BeforeInstallPromptEvent, etc.
└── index.ts      # Public API
```

## 7. Manifest Strategy
The Web App Manifest (`manifest.ts`) defines how Yume appears when installed. It must specify:
- `name` & `short_name`
- `display`: "standalone"
- `orientation`: "portrait" (or any if responsive)
- `theme_color` & `background_color`
- `icons`: 192x192, 512x512, apple-touch-icon, favicon.svg
- `scope` & `start_url`
- `categories`, `screenshots`, `shortcuts`

## 8. Service Worker Strategy
We use **`vite-plugin-pwa`** for service worker generation, but configuration must remain explicit in `src/app/pwa/config/`. The service worker handles caching and update lifecycle events.

## 9. Cache Strategy
Our caching policy prioritizes speed and reliability:
- **App Shell (HTML/CSS/JS)**: Cache First
- **Fonts**: Cache First
- **Images**: Stale While Revalidate
- **API Responses**: Network First (eventually; strictly online for MVP)

## 10. Offline UX
The offline experience is designed to keep the app usable without complex state synchronization:
1. Show the `OfflineBanner`.
2. Disable actions that require network requests.
3. Queue nothing (for now).
4. Keep the app shell responsive.

## 11. Install Flow
- Native browser install prompts are caught via the `beforeinstallprompt` event.
- An `InstallPrompt` UI component is displayed inside `src/app/providers/` or `src/app/layout/`.
- On iOS/Safari (where the native prompt is unsupported), we display a manual "Add to Home Screen" instruction.

## 12. Update Flow
PWAs must update gracefully. The strategy:
1. New Version Detected
2. Service Worker Installed in background
3. Notify User (e.g., "A new version of Yume is available")
4. User clicks Refresh
5. New Service Worker Activates

## 13. Browser Support
- **Supported fully**: Chrome, Edge, Android.
- **Partial Support**: Safari (iOS). Install prompts must be manual; Push Notifications require specific iOS versions and settings.
- **Supported**: Firefox.

## 14. Verification
A successful PWA implementation must pass these checks:
- Manifest is generated.
- Service worker is registered.
- Install prompt appears.
- Lighthouse PWA score ≥ 90.
- Offline shell loads (app launches without internet).
- App launches standalone.
- Update flow works.

## 15. Future Roadmap & Native Strategy

### Phase 1 (MVP)
- Installable
- Offline shell
- Static caching

### Phase 2 (v1.5)
- Push Notifications
- Background Sync
- Notification Click Actions

### Phase 3 (v2)
- Offline Feed & Journey
- Offline Chat
- Image Upload Queue

### Future Native Strategy
Today: PWA
Tomorrow: Capacitor wrapper for App Store and Google Play distribution.

## Non-Goals (MVP)
To prevent scope creep, the MVP explicitly excludes:
- No offline authentication
- No offline chat
- No IndexedDB
- No API response caching
- No background sync
- No offline mutations
