import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import ButtonBack from '../molecules/ButtonBack';
import ButtonMenu from '../molecules/ButtonMenu';
import Drawer from '../organisms/Drawer';
import GistContainer from '../containers/GistContainer';
import Header from '../organisms/Header';
import Main from '../templates/Main';
import Rendered from '../atoms/Rendered';

interface Props {}

const Subject: React.FC<Props> = () => {
  const { params } = useRouteMatch();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const closeDrawer = () => setDrawerOpen(false);

  const [title, setTitle] = useState('');
  const onSuccessHandler = (data: any) => setTitle(data.title);

  return (
    <>
      <Header
        title={title}
        leading={<ButtonBack />}
        trailing={<ButtonMenu onClick={toggleDrawer} />}
      />
      <Main>
        <GistContainer id={params.id} onSuccess={onSuccessHandler}>
          {(data: any) => <Rendered html={data.html} />}
        </GistContainer>
      </Main>
      <Drawer isOpen={drawerOpen} onClose={closeDrawer} right></Drawer>
    </>
  );
};

export default Subject;
