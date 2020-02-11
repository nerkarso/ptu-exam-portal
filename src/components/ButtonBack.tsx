import React from 'react';
import { useHistory } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';

import Button from './common/Button';

interface Props {}

const ButtonBack: React.FC<Props> = () => {
  const history = useHistory();

  return (
    <Button title="Back" onClick={() => history.goBack()}>
      <ArrowLeft color="var(--text)" size={24} />
    </Button>
  );
};

export default ButtonBack;
