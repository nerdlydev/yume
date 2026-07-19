# Yume App Shell Architecture

The App Shell is the permanent UI infrastructure of Yume. It ensures that the installed PWA feels like a native application while providing a consistent foundation for all feature modules.

## Responsibilities

The App Shell **owns**:
- Global Navigation (The Floating Dock)
- Global Overlays (Dialogs, Toasts, Bottom Sheets, Loading)
- Top-level Providers (Theme, Query, Router, Motion, Auth)
- The global Route `<Outlet />`
- Safe-area handling (`env(safe-area-inset-*)`)
- Centralized motion and theme tokens

The App Shell **does NOT own**:
- Feature-specific UI
- Business logic or state
- API calls
- Authentication logic
- Screen headers (each Screen provides its own contextual header)

## Directory Structure

```text
src/
└── app/
    ├── layout/
    │   ├── AppShell.tsx       # Root layout wrapping the Outlet and Overlays
    │   ├── Navigation/        # The adaptive Navigation Dock
    │   │   ├── Navigation.tsx
    │   │   ├── Dock.tsx
    │   │   └── DockItem.tsx
    │   └── SafeArea.tsx       # Containers for padding insets (Top, Bottom, Left, Right)
    │
    ├── components/
    │   └── Screen/            # Reusable structural primitives for feature views
    │       ├── Screen.tsx
    │       ├── ScreenHeader.tsx
    │       ├── ScreenBody.tsx
    │       └── ScreenFooter.tsx
    │
    ├── overlays/              # Global UI overlays
    │   ├── DialogProvider.tsx
    │   ├── ToastProvider.tsx
    │   └── BottomSheetProvider.tsx
    │
    ├── providers/             # Top-level context wrappers
    │   └── Providers.tsx      # Composes Theme, Query, Router, etc.
    │
    ├── router/                # TanStack Router configuration
    │
    ├── motion/                # Centralized animation logic (springs, transitions)
    │
    ├── theme/                 # Design tokens (colors, spacing, radius, breakpoints)
    │
    └── pwa/                   # Install prompts and service worker logic
```
