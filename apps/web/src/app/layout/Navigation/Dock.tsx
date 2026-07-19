import { House, MagnifyingGlass, Heart, MapTrifold, ChatCircle, User } from '@phosphor-icons/react';
import { DockItem } from './DockItem';
import { zIndex } from '../../design/tokens';

const DESTINATIONS = [
  { id: 'home', label: 'Home', path: '/', icon: House },
  { id: 'discover', label: 'Discover', path: '/discover', icon: MagnifyingGlass },
  { id: 'companion', label: 'Companion', path: '/companion', icon: Heart },
  { id: 'journey', label: 'Journey', path: '/journey', icon: MapTrifold },
  { id: 'chat', label: 'Chat', path: '/chat', icon: ChatCircle },
  { id: 'profile', label: 'Profile', path: '/profile', icon: User },
];

/**
 * Adaptive Navigation Dock.
 * Mobile: Bottom island.
 * Desktop: Bottom or side dock.
 */
export function Dock() {
  return (
    <div
      className="fixed bottom-6 left-0 right-0 flex justify-center px-4 pointer-events-none lg:bottom-10"
      style={{ zIndex: zIndex.dock }}
    >
      <div className="pointer-events-auto glass-panel bg-base-100/60 backdrop-blur-2xl rounded-full p-2 flex items-center gap-2 lg:gap-4 shadow-2xl border border-base-content/10">
        {DESTINATIONS.map((dest) => (
          <DockItem
            key={dest.id}
            path={dest.path}
            icon={dest.icon}
            label={dest.label}
          />
        ))}
      </div>
    </div>
  );
}
