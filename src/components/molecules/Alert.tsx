import React from 'react';
import classNames from 'classnames';
import { AlertCircle } from 'react-feather';

interface Props {
  type?: 'error';
}

const Alert: React.FC<Props> = ({ type, children }) => {
  return (
    <div
      className={classNames('alert', {
        [`alert--${type}`]: type
      })}
    >
      <AlertCircle size={24} />
      <div className="alert__body">{children}</div>
    </div>
  );
};

export default Alert;
