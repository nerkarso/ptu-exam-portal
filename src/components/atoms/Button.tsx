import React from 'react';
import classNames from 'classnames';

export interface Props {
  type?: 'primary' | 'secondary' | 'inverse';
  block?: boolean;
  leading?: boolean;
  trailing?: boolean;
  className?: string;
  style?: any;
  onClick?: () => void;
  title?: string;
}

const Button: React.FC<Props> = ({
  type,
  block,
  leading,
  trailing,
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
          'button--block': block,
          'button--leading': leading,
          'button--trailing': trailing
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
