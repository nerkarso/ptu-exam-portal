import React, { useContext } from 'react';
import { Sun } from 'react-feather';

import { ThemeContext } from '../../context/theme-context';

import Button from '../atoms/Button';

interface Props {}

const ButtonSwitchTheme: React.FC<Props> = () => {
  const { switchTheme } = useContext(ThemeContext);

  return (
    <Button title="Switch theme" onClick={switchTheme}>
      <Sun color="var(--text)" size={24} />
    </Button>
  );
};

export default ButtonSwitchTheme;
