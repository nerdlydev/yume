import * as React from 'react';
import { cn } from '../utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';
  size?: 'lg' | 'sm' | 'xs';
  outline?: boolean;
  active?: boolean;
  disabled?: boolean;
  glass?: boolean;
  wide?: boolean;
  block?: boolean;
  circle?: boolean;
  square?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      outline,
      active,
      disabled,
      glass,
      wide,
      block,
      circle,
      square,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'btn',
          {
            'btn-neutral': variant === 'neutral',
            'btn-primary': variant === 'primary',
            'btn-secondary': variant === 'secondary',
            'btn-accent': variant === 'accent',
            'btn-ghost': variant === 'ghost',
            'btn-link': variant === 'link',
            'btn-lg': size === 'lg',
            'btn-sm': size === 'sm',
            'btn-xs': size === 'xs',
            'btn-outline': outline,
            'btn-active': active,
            'btn-disabled': disabled,
            glass: glass,
            'btn-wide': wide,
            'btn-block': block,
            'btn-circle': circle,
            'btn-square': square,
          },
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button };
