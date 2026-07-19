import { Link } from '@tanstack/react-router';
import { motion } from 'motion/react';
import type { ElementType } from 'react';
import { springSnappy } from '../../design/motion';

interface DockItemProps {
  path: string;
  label: string;
  icon: ElementType;
}

export function DockItem({ path, label, icon: Icon }: DockItemProps) {
  return (
    <Link
      to={path}
      className="relative flex items-center justify-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary group"
      activeProps={{
        className: 'text-primary-content',
      }}
      inactiveProps={{
        className: 'text-base-content/60 hover:text-base-content hover:bg-base-content/5',
      }}
    >
      {({ isActive }) => (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={springSnappy}
          className="relative flex items-center px-4 py-3 lg:px-5 lg:py-3 gap-2"
        >
          {isActive && (
            <motion.div
              layoutId="dock-indicator"
              className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/20"
              transition={springSnappy}
            />
          )}
          <Icon size={24} weight={isActive ? 'fill' : 'regular'} className="relative z-10" />
          {/* Label visible only on tablet+ */}
          <span className="hidden sm:block text-sm font-medium relative z-10">{label}</span>
        </motion.div>
      )}
    </Link>
  );
}
