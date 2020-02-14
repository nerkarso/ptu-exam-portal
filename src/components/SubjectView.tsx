import React from 'react';

import ButtonBack from './ButtonBack';
import Container from './common/Container';

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
      <Container></Container>
    </>
  );
};

export default SubjectView;
