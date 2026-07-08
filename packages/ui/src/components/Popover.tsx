import { Popover as BasePopover } from '@base-ui-components/react/popover';
import * as React from 'react';
import { cn } from '../utils';

const Popover = Object.assign(BasePopover.Root, {
  Trigger: BasePopover.Trigger,
  Portal: BasePopover.Portal,
  Popup: React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof BasePopover.Popup>>(
    ({ className, ...props }, ref) => (
      <BasePopover.Popup
        ref={ref}
        className={cn('z-50 w-72 rounded-box bg-base-100 p-4 shadow-xl outline-none', className)}
        {...props}
      />
    ),
  ),
  Arrow: React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof BasePopover.Arrow>>(
    ({ className, ...props }, ref) => (
      <BasePopover.Arrow ref={ref} className={cn('fill-base-100', className)} {...props} />
    ),
  ),
  Title: BasePopover.Title,
  Description: BasePopover.Description,
  Close: BasePopover.Close,
});

export { Popover };
