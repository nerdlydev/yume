import { Select as BaseSelect } from '@base-ui-components/react/select';
import * as React from 'react';
import { cn } from '../utils';

const Select = Object.assign(BaseSelect.Root, {
  Trigger: React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger>
  >(({ className, ...props }, ref) => (
    <BaseSelect.Trigger
      ref={ref}
      className={cn('select select-bordered w-full max-w-xs', className)}
      {...props}
    />
  )),
  Portal: BaseSelect.Portal,
  Positioner: BaseSelect.Positioner,
  Popup: React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof BaseSelect.Popup>>(
    ({ className, ...props }, ref) => (
      <BaseSelect.Popup
        ref={ref}
        className={cn(
          'z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-box bg-base-200 p-1 shadow-xl outline-none',
          className,
        )}
        {...props}
      />
    ),
  ),
  Item: React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof BaseSelect.Item>>(
    ({ className, ...props }, ref) => (
      <BaseSelect.Item
        ref={ref}
        className={cn(
          'relative flex w-full cursor-default select-none items-center rounded-btn py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-base-300 focus:text-base-content data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          className,
        )}
        {...props}
      />
    ),
  ),
  ItemText: BaseSelect.ItemText,
  ItemIndicator: React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof BaseSelect.ItemIndicator>
  >(({ className, ...props }, ref) => (
    <BaseSelect.ItemIndicator
      ref={ref}
      className={cn('absolute left-2 flex h-3.5 w-3.5 items-center justify-center', className)}
      {...props}
    />
  )),
  Group: BaseSelect.Group,
  GroupLabel: React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof BaseSelect.GroupLabel>
  >(({ className, ...props }, ref) => (
    <BaseSelect.GroupLabel
      ref={ref}
      className={cn('px-2 py-1.5 text-sm font-semibold text-base-content/50', className)}
      {...props}
    />
  )),
  Separator: React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof BaseSelect.Separator>
  >(({ className, ...props }, ref) => (
    <BaseSelect.Separator
      ref={ref}
      className={cn('-mx-1 my-1 h-px bg-base-300', className)}
      {...props}
    />
  )),
  Value: BaseSelect.Value,
});

export { Select };
