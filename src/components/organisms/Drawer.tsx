import React from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

interface Props {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
  right?: boolean;
}

const Drawer: React.FC<Props> = ({
  isOpen,
  onOpen,
  onClose,
  right,
  children
}) => {
  const position = `drawer--${right ? 'right' : 'left'}`;

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
        <aside className={classNames('drawer', position)}>{children}</aside>
        <div className="drawer__backdrop" onClick={onClose}></div>
      </div>
    </CSSTransition>
  );
};

export default Drawer;
