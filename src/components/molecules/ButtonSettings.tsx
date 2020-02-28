import React from 'react';
import { useHistory } from 'react-router-dom';
import { Settings } from 'react-feather';

import Button from '../atoms/Button';

interface Props {}

const ButtonSettings: React.FC<Props> = () => {
  const history = useHistory();

  return (
    <Button title="Settings" onClick={() => history.push('/settings')}>
      <Settings color="var(--text)" size={24} />
    </Button>
  );
};

export default ButtonSettings;
