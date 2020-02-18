import React from 'react';
import { ArrowLeft } from 'react-feather';
import { useHistory } from 'react-router-dom';

import Button from '../atoms/Button';

interface Props {
  onClick?: () => void;
}

const ButtonBack: React.FC<Props> = ({ onClick }) => {
  const history = useHistory();

  const clickHandler = () => (onClick ? onClick() : history.goBack());

  return (
    <Button className="button--leading" onClick={clickHandler} title="Go back">
      <ArrowLeft color="var(--text)" size={24} />
    </Button>
  );
};

export default ButtonBack;
