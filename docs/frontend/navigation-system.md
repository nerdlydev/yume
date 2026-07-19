# Yume Navigation System

Yume is a mobile-first, installable PWA designed for frequent, quick social interactions. To support this, Yume does not use traditional navbars or sidebars. Instead, we use an **Adaptive Navigation System**.

Think of it as a continuous system that changes form based on the available space, while keeping the same mental model for the user.

```text
Navigation System
        │
        ├── Mobile → Floating Bottom Island
        │
        ├── Tablet → Floating Dock
        │
        └── Desktop → Floating Bottom Dock (or optionally left rail)
```

The user should never have to relearn navigation when switching devices.

---

## Mobile (Primary Experience)

Because Yume is meant to be used while out in the world, the mobile layout is the primary experience.

```text
      Content
────────────────────────
      Feed
      Feed
────────────────────────
      ╭──────────────────────╮
      │ 🏠 🔍 ❤️ 💬 👤        │
      ╰──────────────────────╯
```

**Characteristics:**
- **Floating:** Sits above the content.
- **Rounded:** Capsule-shaped border radius.
- **Blur:** Uses glassmorphism (translucent background with blur).
- **Safe-area aware:** Respects the iPhone notch and home indicator padding.
- **Shadow:** Casts a distinct shadow to separate from content.
- **Native feel:** It should feel like an OS-level element, not a webpage component.

---

## Desktop & Tablet

Rather than stretching a top navbar across a wide screen, the navigation remains a floating dock, similar to the macOS Dock. 

```text
                 Content
──────────────────────────────────
        Feed
        Feed
         ╭────────────────────────────╮
         │🏠 Discover Journey Chat 👤 │
         ╰────────────────────────────╯
```
This preserves Yume's unique identity across all platforms.

---

## Dynamic Adaptation

Rather than simply resizing the same container, the navigation evolves its content density based on screen width.

### Mobile (< 640px)
Icons only for maximum space efficiency.
```text
🏠 🔍 ❤️ 💬 👤
```

### Tablet
Icons + Labels for clarity.
```text
🏠 Home   🔍 Discover   ❤️ Companion   💬 Chat   👤 Profile
```

### Desktop
A larger dock exposing more direct access to core features.
```text
🏠 Home   🔍 Discover   ❤️ Companion   🧭 Journey   👥 Communities   💬 Chat   🔔 Notifications   👤 Profile
```

---

## Navigation Philosophy

**The dock must contain DESTINATIONS, not actions.**

✅ **Good (Destinations):**
- Home
- Discover
- Companion
- Journey
- Chat
- Profile

❌ **Bad (Actions - these belong elsewhere):**
- Create Companion
- Edit Profile
- Settings
- Logout

### Secondary Features
Keep the primary navigation focused. Access secondary features from *within* those primary destinations.
```text
Discover
├── Communities
├── Experiences
├── Places
└── Events
```

---

## Floating Action Button (FAB)

Instead of cluttering the dock with "Create" actions, Yume uses a **context-aware FAB**. The action changes depending on the current feature, keeping the navigation clean and intuitive.

- **On Companion:** `+` → Create Companion Request
- **On Journey:** `+` → Add Memory
- **On Communities:** `+` → Create Community

---

## Micro-interactions

Since Yume is a social product, animations matter deeply to the user experience. 

- **Selection:** Selected icons lift slightly.
- **Active State:** Active tabs have a glowing background or subtle highlight.
- **Transitions:** Smooth spring transitions between tabs (no harsh snapping).
- **Scrolling:** 
  - Blur intensity adjusts dynamically on scroll.
- **Haptics:** Provide haptic feedback on supported devices (via PWA APIs) when interacting with the dock.

---

## Build for PWA, Not Responsive Web

This is the golden rule of Yume's UI engineering:

> Do not ask: *"How do we make the website responsive?"*  
> Instead ask: *"How would this behave if it were a native app?"*

Users will install Yume to their home screens. Once installed, they will expect it to behave exactly like a native iOS or Android app. Design and build for that reality.

---

## Accessibility & Polish
- Ensure all dock elements are accessible via keyboard shortcuts.
- Clear, distinct focus states for tab navigation.
- Ensure ARIA labels exist for icon-only mobile states.
- Respect `prefers-reduced-motion` for spring animations.
