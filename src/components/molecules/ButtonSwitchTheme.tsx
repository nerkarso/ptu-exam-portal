import React from 'react';
import { Sun } from 'react-feather';

import { useTheme } from '../../hooks/ThemeContext';

import Button from '../atoms/Button';

interface Props {}

const ButtonSwitchTheme: React.FC<Props> = () => {
  const { switchTheme } = useTheme();

  return (
    <Button title="Switch theme" onClick={switchTheme}>
      <Sun color="var(--text)" size={24} />
    </Button>
  );
};

export default ButtonSwitchTheme;
