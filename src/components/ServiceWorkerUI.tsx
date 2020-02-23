import React, { useEffect, useState } from 'react';

import { useServiceWorker } from '../hooks/serviceWorker';

import Toast from './molecules/Toast';

let deferredPrompt: any = null;

const ServiceWorkerUI: React.FC = () => {
  const { assetsUpdateReady, updateAssets } = useServiceWorker();

  const [openToastInstall, setOpenToastInstall] = useState(false);
  const [openToastInstalled, setOpenToastInstalled] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      event.preventDefault();

      if (deferredPrompt === null) {
        // Update UI notify the user they can add to home screen
        setOpenToastInstall(true);
      }

      // Stash the event so it can be triggered later
      deferredPrompt = event;
    });
  }, []);

  // Attach the install prompt to a user gesture
  const addToHomeScreen = async () => {
    // Show the prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        setOpenToastInstall(false);
        setTimeout(() => setOpenToastInstalled(true), 1000);
      }
    });
  };

  const [openToastUpdate, setOpenToastUpdate] = useState(false);
  const [openToastUpdating, setOpenToastUpdating] = useState(false);

  const handleUpdate = () => {
    updateAssets();
    setOpenToastUpdate(false);
    setTimeout(() => setOpenToastUpdating(true), 500);
  };

  useEffect(() => {
    setOpenToastUpdate(assetsUpdateReady);
  }, [assetsUpdateReady]);

  return (
    <div className="toasts">
      <Toast
        isOpen={openToastInstall}
        action={{
          title: 'Install',
          callback: addToHomeScreen
        }}
        onDismiss={() => setOpenToastInstall(false)}
      >
        Install this app
      </Toast>

      <Toast
        isOpen={openToastInstalled}
        onDismiss={() => setOpenToastInstalled(false)}
      >
        This app is now installed on your home screen and app drawer
      </Toast>

      <Toast
        isOpen={openToastUpdate}
        action={{
          title: 'Update',
          callback: handleUpdate
        }}
        onDismiss={() => setOpenToastUpdate(false)}
      >
        New version is available
      </Toast>

      <Toast isOpen={openToastUpdating}>Updating...</Toast>
    </div>
  );
};

export default ServiceWorkerUI;
