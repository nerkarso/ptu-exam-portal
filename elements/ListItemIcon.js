import cx from 'classnames';

export default function ListItemIcon({ children, contained, color }) {
  if (contained)
    return (
      <div
        className={cx('grid flex-shrink-0 w-12 h-12 text-white rounded-full shadow place-items-center', {
          'bg-primary-600 dark:bg-primary-500': !color,
          'bg-green-600 dark:bg-green-500': color === 'green',
          'bg-red-600 dark:bg-red-500': color === 'red',
        })}>
        {children}
      </div>
    );

  return children;
}
