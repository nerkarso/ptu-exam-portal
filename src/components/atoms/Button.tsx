import React from 'react';
import classNames from 'classnames';

interface Props {
  className?: string;
  onClick?: () => void;
  title?: string;
}

const Button: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <button className={classNames('button', className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
