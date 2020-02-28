import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { X } from 'react-feather';

import Button from '../atoms/Button';

interface Props {
  isOpen: boolean;
  action?: {
    title: string;
    callback: () => void;
  };
  onDismiss?: () => void;
}

const Toast: React.FC<Props> = ({ isOpen, action, onDismiss, children }) => {
  return ReactDOM.createPortal(
    <CSSTransition in={isOpen} timeout={300} classNames="toast" unmountOnExit>
      <div className="toast">
        <div className="toast__body">{children}</div>
        {action && (
          <div className="toast__action">
            <Button type="primary" onClick={action.callback}>
              {action.title}
            </Button>
          </div>
        )}
        {onDismiss && (
          <div className="toast__dismiss">
            <Button type="inverse" onClick={onDismiss}>
              <X color="var(--background-3)" />
            </Button>
          </div>
        )}
      </div>
    </CSSTransition>,
    document.querySelector('#root-toast') as any
  );
};

export default Toast;
