import cx from 'classnames';

export default function Blankslate({ children, full, ...props }) {
  if (full) {
    return (
      <BlankslateFull {...props}>
        <BlankslateBox>{children}</BlankslateBox>
      </BlankslateFull>
    );
  }

  return <BlankslateBox {...props}>{children}</BlankslateBox>;
}

function BlankslateFull({ children, className }) {
  return <div className={cx('grid w-full h-full place-items-center', className)}>{children}</div>;
}

function BlankslateBox({ children, className }) {
  return (
    <div className={cx('flex flex-col items-center max-w-sm gap-3 p-4 mx-auto rounded-xl', className)}>{children}</div>
  );
}
