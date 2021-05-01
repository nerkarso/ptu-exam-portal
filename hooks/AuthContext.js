import { parse } from 'cookie';
import { createContext, useEffect, useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        userToken: null,
        error: null,
        loading: true,
      };
    case 'ERROR':
      return {
        ...state,
        userToken: null,
        error: action.payload,
        loading: false,
      };
    case 'LOGIN':
      return {
        ...state,
        userToken: action.payload,
        error: null,
        loading: false,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        userToken: null,
        error: null,
        loading: false,
        isLoggedIn: false,
      };
  }
};

const reducerInitialState = {
  userToken: null,
  error: null,
  loading: true,
  isLoggedIn: false,
};

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, reducerInitialState);

  const login = async (credentials) => {
    dispatch({ type: 'LOADING' });

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const results = await Promise.all([
        await (await fetch('/api/login', requestOptions)).json(),
        await (await fetch('/api/login-mobile', requestOptions)).json(),
      ]);
      if (results.length > 0 && results[0].auth) {
        dispatch({ type: 'LOGIN', payload: results[0].userToken });
      } else {
        dispatch({ type: 'ERROR', payload: 'Username or password is incorrect' });
      }
    } catch (ex) {
      dispatch({ type: 'ERROR', payload: ex.message });
    }
  };

  const logout = () => {
    document.cookie = 'userToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'sessionMobile=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    const cookies = parse(document.cookie);
    if (cookies.userToken && cookies.session && cookies.sessionMobile) {
      dispatch({ type: 'LOGIN', payload: cookies.userToken });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  }, []);

  return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>;
}
