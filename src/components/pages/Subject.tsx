import React, { useState, useEffect } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import ContentLoader from 'react-content-loader';

import { trackPageView, trackEvent } from '../../hooks/GoogleAnalytics';
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
  const { pathname } = useLocation();
  const { params } = useRouteMatch();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const closeDrawer = () => setDrawerOpen(false);

  const [title, setTitle] = useState('');

  useEffect(() => {
    if (title !== '') {
      document.title = title;
      trackPageView(pathname, title);
    }
  }, [pathname, title]);

  const [anchor, setAnchor] = useState('');
  const handleTocAction = (anchorName: string, anchorTitle: string) => {
    document.getElementById(anchorName)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    setDrawerOpen(false);
    setAnchor(anchorName);

    trackEvent({
      category: 'Navigation',
      action: 'Navigated to heading',
      label: `${anchorTitle} - ${title}`
    });
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
              onClick={() => handleTocAction(item.anchor, item.title)}
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
        <GistContainer
          id={params.id}
          onSuccess={onSuccessHandler}
          onLoading={
            <ContentLoader
              style={{ margin: '1.5rem 0' }}
              speed={2}
              width={350}
              height={250}
              viewBox="0 0 350 250"
              backgroundColor="var(--background-2)"
              foregroundColor="var(--background-3)"
              className="content-loader"
            >
              <rect x="0" y="0" rx="6" ry="6" width="140" height="30" />
              <rect x="0" y="50" rx="4" ry="4" width="350" height="15" />
              <rect x="0" y="75" rx="4" ry="4" width="300" height="15" />
              <rect x="0" y="120" rx="6" ry="6" width="180" height="30" />
              <rect x="0" y="170" rx="4" ry="4" width="220" height="15" />
              <rect x="0" y="195" rx="4" ry="4" width="320" height="15" />
              <rect x="0" y="220" rx="4" ry="4" width="160" height="15" />
            </ContentLoader>
          }
        >
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
