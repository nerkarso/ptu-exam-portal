import React, { useEffect, useState } from 'react';

import * as serviceWorker from '../../serviceWorker';

import Button from '../atoms/Button';
import ButtonBack from '../molecules/ButtonBack';
import Header from '../organisms/Header';
import Main from '../templates/Main';
import Modal from '../molecules/Modal';
import Section from '../organisms/Section';
import Toast from '../molecules/Toast';

const title = 'Settings';

interface Props {}

const Settings: React.FC<Props> = () => {
  useEffect(() => {
    document.title = title;
  }, []);

  const [openModalReset, setOpenModalReset] = useState(false);
  const [openToastReset, setOpenToastReset] = useState(false);

  const handleReset = () => {
    localStorage.clear();
    serviceWorker.unregister();

    setOpenModalReset(false);
    setTimeout(() => {
      setOpenToastReset(true);
      setTimeout(() => setOpenToastReset(false), 5000);
    }, 500);
  };

  return (
    <>
      <Header title={title} leading={<ButtonBack />} />
      <Main>
        <Section title="About">
          <p style={{ lineHeight: 2 }}>{process.env.REACT_APP_DESCRIPTION}</p>
          <p style={{ lineHeight: 2 }}>
            Version {process.env.REACT_APP_VERSION}
          </p>
          <p style={{ lineHeight: 2 }}>
            &copy; {new Date().getFullYear()} {process.env.REACT_APP_AUTHOR}{' '}
            Made in Suriname.
          </p>
        </Section>
        <Section title="Reset">
          <p>Reset the app to its default values</p>
          <Button
            type="primary"
            onClick={() => setOpenModalReset(true)}
            style={{ marginTop: '1rem', minWidth: 96 }}
          >
            Reset
          </Button>
        </Section>
      </Main>
      <Modal
        isOpen={openModalReset}
        onDismiss={() => setOpenModalReset(false)}
        title="Reset"
        actions={[
          {
            title: 'Reset',
            onClick: handleReset,
            type: 'primary'
          },
          {
            title: 'Cancel',
            onClick: () => setOpenModalReset(false),
            type: 'secondary'
          }
        ]}
      >
        <p>Do you really want to reset this app?</p>
      </Modal>
      <Toast isOpen={openToastReset}>
        Reset is complete, please restart the app for changes to take effect
      </Toast>
    </>
  );
};

export default Settings;
