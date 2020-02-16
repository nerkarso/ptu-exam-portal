import React from 'react';
import { ArrowLeft } from 'react-feather';
import { useHistory } from 'react-router-dom';

import Button from '../atoms/Button';

interface Props {}

const ButtonBack: React.FC<Props> = () => {
  const history = useHistory();

  return (
    <Button
      className="button--leading"
      onClick={() => history.goBack()}
      title="Back"
    >
      <ArrowLeft color="var(--text)" size={24} />
    </Button>
  );
};

export default ButtonBack;
