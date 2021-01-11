import cx from 'classnames';

export default function FormControl({ children, className }) {
  return <div className={cx('flex flex-col gap-1', className)}>{children}</div>;
}
