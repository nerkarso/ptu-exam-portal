import React, { useEffect } from 'react';
import ContentLoader from 'react-content-loader';

import ButtonSwitchTheme from '../molecules/ButtonSwitchTheme';
import GistContainer from '../containers/GistContainer';
import Grid from '../atoms/Grid';
import Header from '../organisms/Header';
import Main from '../templates/Main';
import Section from '../organisms/Section';
import SubjectCard from '../molecules/SubjectCard';

interface Props {}

const Home: React.FC<Props> = () => {
  useEffect(() => {
    document.title = process.env.REACT_APP_TITLE || '';
  }, []);

  return (
    <>
      <Header
        logo={`${process.env.PUBLIC_URL}/img/icon-48.png`}
        title={process.env.REACT_APP_TITLE}
        buttons={<ButtonSwitchTheme />}
      />
      <Main>
        <Section title="Subjects">
          <GistContainer
            id={process.env.REACT_APP_SUBJECTS_GIST_ID}
            onLoading={
              <ContentLoader
                speed={2}
                width={300}
                height={115}
                viewBox="0 0 300 115"
                backgroundColor="var(--background-2)"
                foregroundColor="var(--background-3)"
                className="content-loader"
              >
                <rect x="0" y="0" rx="12" ry="12" width="300" height="115" />
              </ContentLoader>
            }
          >
            {(data: any) => (
              <Grid>
                {data.subjects.map((subject: any) => (
                  <SubjectCard data={subject} key={subject.id} />
                ))}
              </Grid>
            )}
          </GistContainer>
        </Section>
      </Main>
    </>
  );
};

export default Home;
