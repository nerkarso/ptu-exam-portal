import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import ButtonBack from '../molecules/ButtonBack';
import GistContainer from '../containers/GistContainer';
import Header from '../organisms/Header';
import Main from '../templates/Main';

interface Props {}

const Subject: React.FC<Props> = () => {
  const { params } = useRouteMatch();

  const [title, setTitle] = useState('');
  const onSuccessHandler = (data: any) => setTitle(data.title);

  return (
    <>
      <Header title={title} leading={<ButtonBack />} />
      <Main>
        <GistContainer id={params.id} onSuccess={onSuccessHandler}>
          {(data: any) => <Main html={data.html} />}
        </GistContainer>
      </Main>
    </>
  );
};

export default Subject;
