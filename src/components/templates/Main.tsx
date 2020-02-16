import React from 'react';

interface Props {}

const Main: React.FC<Props> = ({ children }) => {
  return (
    <main>
      <div className="container">{children}</div>
    </main>
  );
};

export default Main;
