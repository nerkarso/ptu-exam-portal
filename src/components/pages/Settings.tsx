import React, { useEffect, useState } from 'react';

import * as serviceWorker from '../../serviceWorker';

import Button from '../atoms/Button';
import ButtonBack from '../molecules/ButtonBack';
import Header from '../organisms/Header';
import Main from '../templates/Main';
import Section from '../organisms/Section';
import Toast from '../molecules/Toast';

const title = 'Settings';

interface Props {}

const Settings: React.FC<Props> = () => {
  useEffect(() => {
    document.title = title;
  }, []);

  const [openToastReset, setOpenToastReset] = useState(false);

  const handleReset = () => {
    localStorage.clear();
    serviceWorker.unregister();

    setOpenToastReset(true);
    setTimeout(() => setOpenToastReset(false), 5000);
  };

  return (
    <>
      <Header title={title} leading={<ButtonBack />} />
      <Main>
        <Section title="About">
          <div style={{ lineHeight: 2 }}>
            <p>{process.env.REACT_APP_DESCRIPTION}</p>
            <p>Version {process.env.REACT_APP_VERSION}</p>
            <p>
              &copy; {new Date().getFullYear()} {process.env.REACT_APP_AUTHOR}.{' '}
              Made in Suriname
            </p>
          </div>
        </Section>
        <Section title="Reset">
          <p>Reset the app to its default values</p>
          <Button
            type="primary"
            onClick={handleReset}
            style={{ marginTop: '1rem', minWidth: 72 }}
          >
            Reset
          </Button>
        </Section>
      </Main>
      <Toast isOpen={openToastReset}>
        Reset is complete, please restart the app for changes to take effect
      </Toast>
    </>
  );
};

export default Settings;
