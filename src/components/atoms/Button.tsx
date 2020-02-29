import React from 'react';
import classNames from 'classnames';

interface Props {
  type?: 'primary' | 'secondary' | 'inverse';
  block?: boolean;
  className?: string;
  style?: any;
  onClick?: () => void;
  title?: string;
}

const Button: React.FC<Props> = ({
  type,
  block,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={classNames(
        'button',
        {
          [`button--${type}`]: type,
          'button--block': block
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
