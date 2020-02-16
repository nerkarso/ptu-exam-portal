import React from 'react';

interface Props {
  title?: string;
}

const Section: React.FC<Props> = ({ title, children }) => {
  return (
    <section className="section">
      <header className="section__header">
        {title && <h2 className="section__title">{title}</h2>}
      </header>
      <div className="section__body">{children}</div>
    </section>
  );
};

export default Section;
