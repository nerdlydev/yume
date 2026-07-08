import { Tooltip as BaseTooltip } from '@base-ui-components/react/tooltip';
import * as React from 'react';
import { cn } from '../utils';

const Tooltip = Object.assign(BaseTooltip.Root, {
  Trigger: BaseTooltip.Trigger,
  Portal: BaseTooltip.Portal,
  Positioner: BaseTooltip.Positioner,
  Popup: React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof BaseTooltip.Popup>>(
    ({ className, ...props }, ref) => (
      <BaseTooltip.Popup
        ref={ref}
        className={cn(
          'z-50 overflow-hidden rounded-md bg-neutral px-3 py-1.5 text-xs text-neutral-content shadow-sm animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className,
        )}
        {...props}
      />
    ),
  ),
  Arrow: React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof BaseTooltip.Arrow>>(
    ({ className, ...props }, ref) => (
      <BaseTooltip.Arrow ref={ref} className={cn('fill-neutral', className)} {...props} />
    ),
  ),
});

export { Tooltip };
