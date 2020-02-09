import React from 'react';

import logo from '../assets/logo.png';

import ButtonSwitchTheme from './ButtonSwitchTheme';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__brand">
          <img src={logo} className="brand__image" alt="Logo" />
          <h3 className="brand__title">{process.env.REACT_APP_TITLE}</h3>
        </div>
        <div className="header__buttons">
          <ButtonSwitchTheme />
        </div>
      </div>
    </header>
  );
};

export default Header;
