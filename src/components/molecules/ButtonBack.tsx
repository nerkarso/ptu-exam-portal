import React from 'react';
import { ArrowLeft } from 'react-feather';
import { useHistory } from 'react-router-dom';

import { Props } from '../atoms/Button';
import ButtonIcon from '../molecules/ButtonIcon';

const ButtonBack: React.FC<Props> = ({ onClick, ...props }) => {
  const history = useHistory();

  const handleClick = () => (onClick ? onClick() : history.goBack());

  return (
    <ButtonIcon
      icon={ArrowLeft}
      onClick={handleClick}
      title="Go back"
      leading
      {...props}
    />
  );
};

export default ButtonBack;
