import React from 'react';

interface Props {}

const Grid: React.FC<Props> = ({ children }) => {
  return <div className="grid">{children}</div>;
};

export default Grid;
