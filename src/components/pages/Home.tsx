import React from 'react';

import ButtonSwitchTheme from '../molecules/ButtonSwitchTheme';
import GistContainer from '../containers/GistContainer';
import Grid from '../atoms/Grid';
import Header from '../organisms/Header';
import Main from '../templates/Main';
import Section from '../organisms/Section';
import SubjectCard from '../molecules/SubjectCard';

interface Props {}

const Home: React.FC<Props> = () => {
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
            onLoading={<p>Loading...</p>}
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
