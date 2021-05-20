import React, {
  useCallback,

  // Types
  KeyboardEvent as ReactKeyboardEvent,
  forwardRef,
  ButtonHTMLAttributes,
} from 'react';
import { classNames } from 'utils/classNames';
import { Keys } from './keyboard';

const DEFAULT_BUTTON_TAG = 'button' as const;

type PossibleButtonColors = 'blue' | 'red' | 'white';
const DEFAULT_BUTTON_COLOR = 'blue' as const;

type PossibleButtonSizes = 'sm' | 'base' | 'lg';
const DEFAULT_BUTTON_SIZE = 'base' as const;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: PossibleButtonColors;
  size?: PossibleButtonSizes;
  full?: boolean;
  as?: string | React.JSXElementConstructor<any>;
}

const COMMON_COLOR_CLASSES =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2' as const;
const colorClasses = {
  lightBlue:
    'bg-lightBlue-400 hover:bg-lightBlue-500 border-transparent text-white focus-visible:ring-lightBlue-500',
  blue: 'bg-blue-400 hover:bg-blue-500 border-transparent text-white focus-visible:ring-blue-500',
  red: 'bg-red-400 hover:bg-red-500 border-transparent text-white focus-visible:ring-red-500',
  white: 'bg-white hover:bg-gray-50 border-gray-300',
};

const COMMON_SIZE_CLASSES = 'font-semibold' as const;
const sizeClasses = {
  sm: `text-sm`,
  base: `text-base`,
  lg: `text-lg`,
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      color = DEFAULT_BUTTON_COLOR,
      size = DEFAULT_BUTTON_SIZE,
      full,
      as: Component = DEFAULT_BUTTON_TAG,
      className,
      ...props
    },
    ref,
  ) => {
    const handleKeyUp = useCallback((event: ReactKeyboardEvent<HTMLButtonElement>) => {
      switch (event.key) {
        case Keys.Space:
          // Required for firefox, event.preventDefault() in handleKeyDown for
          // the Space key doesn't cancel the handleKeyUp, which in turn
          // triggers a *click*.
          event.preventDefault();
          break;
      }
    }, []);

    return (
      <Component
        ref={ref}
        type="button"
        onKeyUp={handleKeyUp}
        className={classNames(
          className,
          'inline-flex justify-center items-center border shadow-sm rounded-md',
          'disabled:text-gray-50 disabled:bg-gray-400 disabled:opacity-70 disabled:cursor-default',
          full ? 'w-full px-1.5 py-2' : 'px-4 py-2',
          COMMON_COLOR_CLASSES,
          COMMON_SIZE_CLASSES,
          colorClasses[color],
          sizeClasses[size],
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Button.displayName = 'Button';
