import React from 'react';
import ContentLoader from 'react-content-loader';

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
          {title ? (
            <h1 className="header__title">{title}</h1>
          ) : (
            <ContentLoader
              style={{ marginLeft: '0.5rem' }}
              speed={2}
              width={180}
              height={20}
              viewBox="0 0 180 20"
              backgroundColor="var(--background-2)"
              foregroundColor="var(--background-3)"
            >
              <rect x="0" y="0" rx="6" ry="6" width="180" height="20" />
            </ContentLoader>
          )}
        </div>
        {trailing && <div className="header__trailing">{trailing}</div>}
        {buttons && <div className="header__buttons">{buttons}</div>}
      </div>
    </header>
  );
};

export default Header;
