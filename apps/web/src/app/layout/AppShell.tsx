import { Outlet } from '@tanstack/react-router';
import { Navigation } from './Navigation/Navigation';
import { SafeArea } from './SafeArea';

/**
 * AppShell is the permanent UI infrastructure of Yume.
 * It owns global navigation, overlays, and safe-area padding.
 * It does NOT own screen-specific headers or feature logic.
 */
export function AppShell() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-base-300">
      <SafeArea top bottom className="flex flex-1 flex-col pb-24 lg:pb-0 lg:pl-24">
        {/* Route content injected here */}
        <Outlet />
      </SafeArea>

      {/* The adaptive navigation dock */}
      <Navigation />

      {/* Overlays would go here (Toasts, Modals) */}
    </div>
  );
}
