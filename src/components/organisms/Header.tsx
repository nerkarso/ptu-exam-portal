import React from 'react';

interface Props {
  logo?: string;
  title?: string;
  buttons?: any;
  leading?: any;
  trailing?: any;
}

const Header: React.FC<Props> = ({
  logo,
  title,
  buttons,
  leading,
  trailing
}) => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__leading">
          {leading}
          {logo && <img src={logo} className="header__logo" alt="Logo" />}
          {title && <h1 className="header__title">{title}</h1>}
        </div>
        {trailing && <div className="header__trailing">{trailing}</div>}
        {buttons && <div className="header__buttons">{buttons}</div>}
      </div>
    </header>
  );
};

export default Header;
