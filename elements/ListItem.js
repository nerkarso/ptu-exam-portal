import NextLink from '@/elements/NextLink';
import cx from 'classnames';

export default function ListItem({ active, button, children, className, href, link, ...props }) {
  if (button)
    return (
      <button
        type="button"
        className={cx(
          'flex gap-4 p-3 text-left transition duration-300 focus:outline-none rounded-xl dark:hover:bg-invert-800 hover:bg-base-100 focus:shadow focus:ring-2 ring-primary-400 ring-inset',
          {
            'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-white hover:bg-primary-100 dark:hover:bg-primary-900': active,
          },
          className,
        )}
        {...props}>
        {children}
      </button>
    );

  if (link)
    return (
      <NextLink
        href={href}
        activeClassName="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-white hover:bg-primary-100 dark:hover:bg-primary-900">
        <a
          className={cx(
            'flex items-center gap-4 p-3 transition duration-300 rounded-lg hover:bg-base-100 dark:hover:bg-invert-800 focus:shadow focus:ring-2 ring-primary-400 focus:outline-none ring-inset',
            className,
          )}>
          {children}
        </a>
      </NextLink>
    );

  return <div className={cx('flex items-center gap-4 p-3', className)}>{children}</div>;
}
