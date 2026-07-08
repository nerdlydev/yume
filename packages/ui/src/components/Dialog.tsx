import { Dialog as BaseDialog } from '@base-ui-components/react/dialog';
import * as React from 'react';
import { cn } from '../utils';

const Dialog = Object.assign(BaseDialog.Root, {
  Trigger: BaseDialog.Trigger,
  Portal: BaseDialog.Portal,
  Backdrop: React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>
  >(({ className, ...props }, ref) => (
    <BaseDialog.Backdrop
      ref={ref}
      className={cn(
        'fixed inset-0 z-50 bg-neutral/40 backdrop-blur-sm transition-opacity',
        className,
      )}
      {...props}
    />
  )),
  Popup: React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof BaseDialog.Popup>>(
    ({ className, ...props }, ref) => (
      <BaseDialog.Popup
        ref={ref}
        className={cn(
          'modal-box fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] shadow-xl outline-none duration-200',
          className,
        )}
        {...props}
      />
    ),
  ),
  Title: React.forwardRef<
    HTMLHeadingElement,
    React.ComponentPropsWithoutRef<typeof BaseDialog.Title>
  >(({ className, ...props }, ref) => (
    <BaseDialog.Title ref={ref} className={cn('text-lg font-bold', className)} {...props} />
  )),
  Description: React.forwardRef<
    HTMLParagraphElement,
    React.ComponentPropsWithoutRef<typeof BaseDialog.Description>
  >(({ className, ...props }, ref) => (
    <BaseDialog.Description
      ref={ref}
      className={cn('py-4 text-base-content/80', className)}
      {...props}
    />
  )),
  Close: BaseDialog.Close,
});

export { Dialog };
