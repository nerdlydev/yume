import { Menu as BaseMenu } from '@base-ui-components/react/menu';
import * as React from 'react';
import { cn } from '../utils';

const Menu = Object.assign(BaseMenu.Root, {
  Trigger: BaseMenu.Trigger,
  Portal: BaseMenu.Portal,
  Positioner: BaseMenu.Positioner,
  Popup: React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof BaseMenu.Popup>>(
    ({ className, ...props }, ref) => (
      <BaseMenu.Popup
        ref={ref}
        className={cn(
          'menu z-50 min-w-[8rem] rounded-box bg-base-200 p-2 shadow-xl outline-none',
          className,
        )}
        {...props}
      />
    ),
  ),
  Item: React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof BaseMenu.Item>>(
    ({ className, ...props }, ref) => (
      <BaseMenu.Item
        ref={ref}
        className={cn(
          'cursor-default select-none items-center rounded-btn px-4 py-2 text-sm outline-none focus:bg-base-300 focus:text-base-content data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          className,
        )}
        {...props}
      />
    ),
  ),
  Group: BaseMenu.Group,
  GroupLabel: React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof BaseMenu.GroupLabel>
  >(({ className, ...props }, ref) => (
    <BaseMenu.GroupLabel
      ref={ref}
      className={cn('menu-title px-4 py-2 text-sm font-semibold', className)}
      {...props}
    />
  )),
  Separator: React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof BaseMenu.Separator>
  >(({ className, ...props }, ref) => (
    <BaseMenu.Separator
      ref={ref}
      className={cn('-mx-2 my-1 h-px bg-base-300', className)}
      {...props}
    />
  )),
  Arrow: React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof BaseMenu.Arrow>>(
    ({ className, ...props }, ref) => (
      <BaseMenu.Arrow ref={ref} className={cn('fill-base-200', className)} {...props} />
    ),
  ),
});

export { Menu };
