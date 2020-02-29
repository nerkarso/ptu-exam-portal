import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Button from '../atoms/Button';

interface Actions {
  title: string;
  onClick: () => void;
  type: 'primary' | 'secondary' | 'inverse';
}

interface Props {
  isOpen: boolean;
  onDismiss: () => void;
  title?: string;
  header?: JSX.Element | string;
  footer?: JSX.Element | string;
  actions?: Actions[];
}

const Modal: React.FC<Props> = ({
  isOpen,
  onDismiss,
  title,
  header,
  footer,
  actions,
  children
}) => {
  const handleOutsideDismiss = (evt: any) => {
    if (evt.target.className === 'modal__wrapper') {
      onDismiss();
    }
  };

  return ReactDOM.createPortal(
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div className="modal">
        <div className="modal__wrapper" onClick={handleOutsideDismiss}>
          <div className="modal__dialog" role="dialog">
            {(title || header) && (
              <header className="modal__header">
                {header ? header : <h2 className="modal__title">{title}</h2>}
              </header>
            )}
            <div className="modal__body content">{children}</div>
            {(footer || actions) && (
              <footer className="modal__footer">
                {footer
                  ? footer
                  : actions && (
                      <div className="button-group">
                        {actions.map(action => (
                          <Button
                            type={action.type}
                            onClick={action.onClick}
                            key={action.title}
                            block
                          >
                            {action.title}
                          </Button>
                        ))}
                      </div>
                    )}
              </footer>
            )}
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.querySelector('#root-modal') as Element
  );
};

export default Modal;
