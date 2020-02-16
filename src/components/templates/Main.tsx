import React from 'react';

interface Props {
  html?: string;
}

const Main: React.FC<Props> = ({ html, children }) => {
  return (
    <main>
      {html ? (
        <div
          className="container"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      ) : (
        <div className="container">{children}</div>
      )}
    </main>
  );
};

export default Main;
