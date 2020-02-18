import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { File } from '../../types';

import ButtonBack from '../molecules/ButtonBack';
import ButtonMenu from '../molecules/ButtonMenu';
import Drawer from '../organisms/Drawer';
import GistContainer from '../containers/GistContainer';
import Header from '../organisms/Header';
import List from '../atoms/List';
import Main from '../templates/Main';
import Rendered from '../atoms/Rendered';

interface Props {}

const Subject: React.FC<Props> = () => {
  const { params } = useRouteMatch();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const closeDrawer = () => setDrawerOpen(false);

  const [title, setTitle] = useState('');

  const [anchor, setAnchor] = useState('');
  const handleTocAction = (anchorName: string) => {
    document.getElementById(anchorName)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    setDrawerOpen(false);
    setAnchor(anchorName);
  };

  const toc: any = [];
  const createToc = (arr: any) => {
    if (arr.length > 0) {
      for (const item of arr) {
        if (item.title) {
          const isActive = item.anchor === anchor && {
            active: true
          };

          toc.push(
            <List.Item
              action
              {...isActive}
              id={`anchor-${item.anchor}`}
              onClick={() => handleTocAction(item.anchor)}
              style={{ paddingLeft: `${item.level * 1}rem` }}
              key={item.anchor}
            >
              {item.title}
            </List.Item>
          );
        }
        createToc(item.children);
      }
    }
  };

  const getFirstTocHeading = (arr: any) => {
    if (anchor !== '') return;

    let anchorName;

    if (arr.length > 0) {
      if (arr[0].anchor) {
        anchorName = arr[0].anchor;
      } else {
        anchorName = arr[0].children[0].anchor;
      }

      setAnchor(anchorName);
    }
  };

  const onSuccessHandler = (file: File) => {
    setTitle(file.title);
    createToc(file.toc);
    getFirstTocHeading(file.toc);
  };

  const onOpenHandler = () => {
    document.getElementById(`anchor-${anchor}`)?.scrollIntoView({
      block: 'center'
    });
  };

  return (
    <>
      <Header
        title={title}
        leading={<ButtonBack />}
        trailing={<ButtonMenu onClick={toggleDrawer} />}
      />
      <Main>
        <GistContainer id={params.id} onSuccess={onSuccessHandler}>
          {(file: File) => <Rendered html={file.html} />}
        </GistContainer>
      </Main>
      <Drawer
        isOpen={drawerOpen}
        onOpen={onOpenHandler}
        onClose={closeDrawer}
        right
      >
        <List>{toc}</List>
      </Drawer>
    </>
  );
};

export default Subject;
