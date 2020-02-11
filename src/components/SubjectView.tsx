import React from 'react';

import ButtonBack from './ButtonBack';

interface Props {}

const SubjectView: React.FC<Props> = () => {
  return (
    <>
      <header className="header">
        <div className="header__container">
          <div className="header__brand">
            <ButtonBack />
            <h3 className="brand__title">Subject</h3>
          </div>
          <div className="header__buttons"></div>
        </div>
      </header>
      <main></main>
    </>
  );
};

export default SubjectView;
