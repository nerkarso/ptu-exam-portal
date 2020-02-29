import React from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { X } from 'react-feather';

import ButtonIcon from '../molecules/ButtonIcon';
import Header from './Header';

interface Props {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
  title?: string;
  right?: boolean;
}

const Drawer: React.FC<Props> = ({
  isOpen,
  onOpen,
  onClose,
  title,
  right,
  children
}) => {
  const position = `drawer--${right ? 'right' : 'left'}`;
  const headerProps = title && { title };

  const onEnterHandler = () => onOpen && onOpen();

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="drawer"
      onEnter={onEnterHandler}
      unmountOnExit
    >
      <div>
        <aside className={classNames('drawer', position)}>
          <Header
            leading={
              <ButtonIcon
                icon={X}
                onClick={onClose}
                title="Close drawer"
                leading
              />
            }
            {...headerProps}
          />
          <div className="drawer__body">{children}</div>
        </aside>
        <div className="drawer__backdrop" onClick={onClose}></div>
      </div>
    </CSSTransition>
  );
};

export default Drawer;
