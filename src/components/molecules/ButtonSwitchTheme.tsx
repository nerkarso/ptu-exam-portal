import React from 'react';
import { Moon, Sun } from 'react-feather';

import { trackEvent } from '../../hooks/GoogleAnalytics';
import { useTheme } from '../../hooks/ThemeContext';

import Button from '../atoms/Button';

interface Props {}

const ButtonSwitchTheme: React.FC<Props> = () => {
  const { theme, switchTheme } = useTheme();

  const handleSwitchTheme = () => {
    switchTheme();

    trackEvent({
      category: 'Theme',
      action: 'Switched the theme',
      label: localStorage.getItem('theme') || ''
    });
  };

  return (
    <Button title="Switch theme" onClick={handleSwitchTheme}>
      {theme === 'light' ? (
        <Sun color="var(--text)" size={24} />
      ) : (
        <Moon color="var(--text)" size={24} />
      )}
    </Button>
  );
};

export default ButtonSwitchTheme;
