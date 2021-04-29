import cx from 'classnames';

export default function AppBar({ className, children }) {
  return (
    <header
      className={cx(
        'flex items-center flex-shrink-0 gap-3 px-3 bg-white border-b h-14 lg:h-16 border-base-200 dark:border-invert-700 dark:bg-invert-900 transition duration-300',
        className,
      )}>
      {children}
    </header>
  );
}
