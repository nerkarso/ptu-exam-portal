import cx from 'classnames';

export default function List({ children, className }) {
  return <div className={cx('flex flex-col mx-3 space-y-1', className)}>{children}</div>;
}
