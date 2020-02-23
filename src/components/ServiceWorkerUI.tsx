import React, { useEffect, useState } from 'react';

import { trackEvent } from '../hooks/GoogleAnalytics';
import { useServiceWorker } from '../hooks/ServiceWorkerContext';
import { getOS } from '../utils';

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

        trackEvent({
          category: 'App install',
          action: 'Accepted the install',
          label: getOS()
        });
      }
    });
  };

  const cancelAddToHomeScreen = () => {
    setOpenToastInstall(false);

    trackEvent({
      category: 'App install',
      action: 'Dismissed the install',
      label: getOS()
    });
  };

  const [openToastUpdate, setOpenToastUpdate] = useState(false);
  const [openToastUpdating, setOpenToastUpdating] = useState(false);

  const handleUpdate = () => {
    updateAssets();
    setOpenToastUpdate(false);
    setTimeout(() => setOpenToastUpdating(true), 500);

    trackEvent({
      category: 'App update',
      action: 'Accepted the update',
      label: process.env.REACT_APP_VERSION || ''
    });
  };

  const handleCancelUpdate = () => {
    setOpenToastUpdate(false);

    trackEvent({
      category: 'App update',
      action: 'Dismissed the update',
      label: process.env.REACT_APP_VERSION || ''
    });
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
        onDismiss={cancelAddToHomeScreen}
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
        onDismiss={handleCancelUpdate}
      >
        New version is available
      </Toast>

      <Toast isOpen={openToastUpdating}>Updating...</Toast>
    </div>
  );
};

export default ServiceWorkerUI;
