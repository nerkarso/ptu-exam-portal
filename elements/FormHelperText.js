import cx from 'classnames';

export default function FormHelperText({ children, type }) {
  return (
    <div
      className={cx('text-xs', {
        'text-red-600 dark:text-red-500': type === 'error',
        'text-base-400 dark:text-invert-500': !type,
      })}>
      {children}
    </div>
  );
}
