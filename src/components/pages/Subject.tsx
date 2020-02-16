import React from 'react';

import ButtonBack from '../molecules/ButtonBack';
import Header from '../organisms/Header';
import Main from '../templates/Main';

interface Props {}

const Subject: React.FC<Props> = () => {
  const html = `<p>Silence is golden</p>`;

  return (
    <>
      <Header title="" leading={<ButtonBack />} />
      <Main html={html} />
    </>
  );
};

export default Subject;
