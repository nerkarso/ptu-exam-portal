import React from 'react';
import { Menu } from 'react-feather';

import Button from '../atoms/Button';

interface Props {
  onClick?: () => void;
}

const ButtonMenu: React.FC<Props> = ({ ...props }) => {
  return (
    <Button title="Open menu" {...props}>
      <Menu color="var(--text)" size={24} />
    </Button>
  );
};

export default ButtonMenu;
