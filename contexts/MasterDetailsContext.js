import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';

export const MasterDetailsContext = createContext(null);

export function MasterDetailsProvider({ children }) {
  const router = useRouter();
  const [details, setDetailState] = useState(null);
  const setDetails = (value) => {
    if (value) {
      router.push('#preview-details');
    }
    setDetailState(value);
  };
  const resetDetails = () => router.back();

  useEffect(() => {
    function handleHashChange() {
      if (window.location.hash === '') {
        setDetails(null);
      }
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <MasterDetailsContext.Provider value={{ details, setDetails, resetDetails }}>
      {children}
    </MasterDetailsContext.Provider>
  );
}
