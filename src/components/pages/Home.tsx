import React from 'react';

import ButtonSwitchTheme from '../molecules/ButtonSwitchTheme';
import Grid from '../atoms/Grid';
import Header from '../organisms/Header';
import Main from '../templates/Main';
import Section from '../organisms/Section';
import SubjectCard from '../molecules/SubjectCard';

interface Props {}

const Home: React.FC<Props> = () => {
  const subjects = [
    {
      id: '1',
      code: 'BSBC',
      title: 'Subject',
      categories: ['Notes'],
      color: 'grey',
      updatedAt: '14/02/2020'
    }
  ];

  return (
    <>
      <Header
        logo={`${process.env.PUBLIC_URL}/img/icon-48.png`}
        title={process.env.REACT_APP_TITLE}
        buttons={<ButtonSwitchTheme />}
      />
      <Main>
        <Section title="Subjects">
          <Grid>
            {subjects.map(subject => (
              <SubjectCard data={subject} key={subject.id} />
            ))}
          </Grid>
        </Section>
      </Main>
    </>
  );
};

export default Home;
