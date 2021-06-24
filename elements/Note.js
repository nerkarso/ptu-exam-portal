import cx from 'classnames';

export default function Note({ children, label, type }) {
  return (
    <div
      className={cx('px-3 py-2 space-x-1 bg-opacity-10 dark:bg-opacity-20 text-sm rounded-lg', {
        'bg-red-600 dark:bg-red-500 text-red-600 dark:text-red-500': type === 'error',
        'bg-green-600 dark:bg-green-500 text-green-600 dark:text-green-500': type === 'success',
        'bg-yellow-600 dark:bg-yellow-500 text-yellow-600 dark:text-yellow-500': type === 'warning',
        'bg-base-500 dark:bg-invert-500 text-base-700 dark:text-invert-300': !type,
      })}>
      {label && <b>{label}:</b>}
      <span>{children}</span>
    </div>
  );
}
