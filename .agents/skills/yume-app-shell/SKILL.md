---
name: yume-app-shell
description: Enforces Yume's App Shell, Adaptive Navigation System, and Layout Primitives. Use this skill whenever the user asks to build navigation components, layout shells, or overarching UI infrastructure for the frontend.
---

# Yume App Shell Philosophy

When building UI for Yume, you must adhere to the architecture defined in `docs/frontend/app-shell-architecture.md` and `docs/frontend/navigation-system.md`.

**Yume is a mobile-first, installable PWA.** The App Shell is the permanent UI infrastructure that makes Yume feel like a native application rather than a responsive website.

## Responsibilities of the App Shell
The App Shell **owns**:
- Global Navigation (Floating Dock)
- Global Overlays (Dialogs, Toasts, Bottom Sheets)
- Top-level Providers and the Router Outlet
- Safe-area handling and centralized Motion/Theme tokens

The App Shell **does NOT own**:
- Feature-specific UI or business logic
- Screen headers (every screen must provide its own contextual header)

## The Navigation System
Yume relies on an **Adaptive Navigation Dock** rather than traditional top navbars.
- The dock must **only** contain destinations (Home, Discover, Companion, Journey, Chat, Profile).
- Use a context-aware **Floating Action Button (FAB)** for primary actions per screen, rather than cluttering the dock.

## Reusable Primitives
Always use the centralized design tokens from `app/theme/` and centralized animation variants from `app/motion/`.
Never scatter hardcoded framer-motion values across the project. 

Construct feature screens using the reusable UI primitives located in `app/components/Screen/`:
- `<Screen>`
- `<ScreenHeader>`
- `<ScreenBody>`
- `<ScreenFooter>`
