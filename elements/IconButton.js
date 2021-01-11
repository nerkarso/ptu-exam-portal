import cx from 'classnames';

export default function IconButton({ children, className, ...props }) {
  return (
    <button
      type="button"
      className={cx(
        'grid flex-shrink-0 transition duration-300 rounded-md focus:ring-2 ring-primary-400 place-items-center focus:outline-none hover:bg-base-100 dark:hover:bg-invert-800',
        className,
      )}
      {...props}>
      {children}
    </button>
  );
}
