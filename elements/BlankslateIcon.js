import cx from 'classnames';

export default function BlankslateIcon({ icon: Icon, variant }) {
  return (
    <div
      className={cx({
        'text-primary-600 dark:text-primary-500': !variant,
        'text-red-600 dark:text-red-500': variant === 'error',
      })}>
      <Icon size={42} />
    </div>
  );
}
