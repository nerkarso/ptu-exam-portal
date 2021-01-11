import cx from 'classnames';

export default function Note({ children, label, type }) {
  return (
    <div
      className={cx('px-3 py-2 space-x-1 text-sm border rounded-lg', {
        'border-red-600 dark:border-red-500 text-red-600 dark:text-red-500': type === 'error',
        'border-green-600 dark:border-green-500 text-green-600 dark:text-green-500': type === 'success',
        'border-yellow-600 dark:border-yellow-500 text-yellow-600 dark:text-yellow-500': type === 'warning',
        'border-base-200 dark:border-invert-700': !type,
      })}>
      {label && <b>{label}:</b>}
      <span>{children}</span>
    </div>
  );
}
