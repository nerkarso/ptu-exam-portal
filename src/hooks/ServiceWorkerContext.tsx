import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import * as serviceWorker from '../serviceWorker';

const initialState = {
  assetsUpdateReady: false,
  assetsCached: false,
  updateAssets: () => {}
};

const ServiceWorkerContext = createContext(initialState);

function ServiceWorkerProvider(props: any) {
  const [
    waitingServiceWorker,
    setWaitingServiceWorker
  ] = useState<ServiceWorker | null>(null);
  const [assetsUpdateReady, setAssetsUpdateReady] = useState(false);
  const [assetsCached, setAssetsCached] = useState(false);

  const value = useMemo(
    () => ({
      assetsUpdateReady,
      assetsCached,
      updateAssets: () => {
        if (waitingServiceWorker) {
          waitingServiceWorker.addEventListener('statechange', (event: any) => {
            if (event.target.state === 'activated') {
              window.location.reload();
            }
          });

          waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
        }
      }
    }),
    [assetsUpdateReady, assetsCached, waitingServiceWorker]
  );

  useEffect(() => {
    serviceWorker.register({
      onUpdate: (registration: any) => {
        setWaitingServiceWorker(registration.waiting);
        setAssetsUpdateReady(true);
      },
      onSuccess: () => {
        setAssetsCached(true);
      }
    });
  }, []);

  return <ServiceWorkerContext.Provider value={value} {...props} />;
}

function useServiceWorker() {
  const context = useContext(ServiceWorkerContext);

  if (!context) {
    throw new Error(
      'useServiceWorker must be used within a ServiceWorkerProvider'
    );
  }

  return context;
}

export { ServiceWorkerProvider, useServiceWorker };
