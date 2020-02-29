import React, { createContext, useContext, useEffect, useState } from 'react';

import { isIos } from '../utils';

const initialState = {
  theme: 'light',
  switchTheme: () => {}
};

const ThemeContext = createContext(initialState);

/**
 * Toggle theme
 */
function ThemeProvider(props: any) {
  const [theme, setTheme] = useState(initialState.theme);

  // On mount, read the preferred theme from the persistence
  useEffect(() => {
    const mode = localStorage.getItem('theme') || initialState.theme;
    setTheme(mode);

    // Change html element attribute
    document.querySelector('html')?.setAttribute('theme', mode);

    // Change meta theme color
    const color =
      theme === 'light'
        ? process.env.REACT_APP_THEME_COLOR
        : process.env.REACT_APP_THEME_DARK_COLOR;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', color || '');

    // Change iOS status bar style
    if (isIos()) {
      const statusBarStyle =
        theme === 'light' ? 'default' : 'black-translucent';

      document
        .querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
        ?.setAttribute('content', statusBarStyle);
    }
  }, [theme]);

  // To switch between dark and light mode
  const switchTheme = () => {
    const mode = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const value = { theme, switchTheme };

  return <ThemeContext.Provider value={value} {...props} />;
}

function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

export { ThemeProvider, useTheme };
