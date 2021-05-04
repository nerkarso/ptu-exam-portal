import cx from 'classnames';
import { forwardRef } from 'react';

const Input = forwardRef(({ className, id, ...props }, ref) => {
  return (
    <input
      id={id}
      name={id}
      ref={ref}
      className={cx(
        'h-11 px-3 transition duration-300 rounded-lg bg-base-100 focus:outline-none dark:text-invert-400 dark:bg-invert-800 focus:ring-2 ring-inset ring-primary-600 dark:ring-primary-500 placeholder-base-400 dark:placeholder-invert-600',
        className,
      )}
      {...props}
    />
  );
});

export default Input;
