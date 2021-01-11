import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, setState] = useState(false);

  const setLoggedIn = (userToken) => {
    window.localStorage.setItem('userToken', userToken);
    setState(true);
  };

  const setLoggedOut = () => {
    window.localStorage.removeItem('userToken');
    document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setState(false);
  };

  useEffect(() => {
    if (window.localStorage.getItem('userToken')) {
      setState(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn: state, setLoggedIn, setLoggedOut }}>{children}</AuthContext.Provider>
  );
}
