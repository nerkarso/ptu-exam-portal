import React from 'react';

import Button, { Props as ButtonProps } from '../atoms/Button';

export interface Props extends ButtonProps {
  icon: React.ComponentType;
  iconColor?: string;
  iconSize?: number;
}

const ButtonIcon: React.FC<Props> = ({
  icon,
  iconColor,
  iconSize,
  ...props
}) => {
  const Icon: React.ComponentType<any> = icon;

  const color = iconColor ? iconColor : 'var(--text)';
  const size = iconSize ? iconSize : 24;

  return (
    <Button {...props}>
      <Icon color={color} size={size} />
    </Button>
  );
};

export default ButtonIcon;
