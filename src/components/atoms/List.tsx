import React from 'react';
import classNames from 'classnames';

const List: any = ({ children }: any) => {
  return <ul className="list">{children}</ul>;
};

interface ItemProps {
  action?: boolean;
  active?: boolean;
  id?: string;
  href?: string;
  className?: any;
  onClick?: () => void;
  style?: any;
}

const Item: React.FC<ItemProps> = ({
  action,
  active,
  className,
  children,
  ...props
}) => {
  const Tag = action ? 'a' : 'li';

  return (
    <Tag
      className={classNames(
        'list__item',
        {
          'list__item--action': action,
          'list__item--active': active
        },
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

List.Item = Item;

export default List;
