import React from 'react';

interface Props {
  html?: string;
}

const Rendered: React.FC<Props> = ({ html }) => {
  return html ? (
    <div className="rendered" dangerouslySetInnerHTML={{ __html: html }}></div>
  ) : null;
};

export default Rendered;
