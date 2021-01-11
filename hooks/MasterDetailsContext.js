import { createContext, useState } from 'react';

export const MasterDetailsContext = createContext(null);

export function MasterDetailsProvider({ children }) {
  const [details, setDetailState] = useState(null);
  const setDetails = (value) => setDetailState(value);
  const resetDetails = () => setDetails(null);

  return (
    <MasterDetailsContext.Provider value={{ details, setDetails, resetDetails }}>
      {children}
    </MasterDetailsContext.Provider>
  );
}
