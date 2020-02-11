import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  info: {
    color: string;
    name: string;
    category: string;
    updated_at: string;
  };
}

const Subject: React.FC<Props> = ({
  info: { color, name, category, updated_at },
  ...props
}) => {
  return (
    <Link
      to={`/subjects/${name}`}
      className={`subject subject--${color}`}
      {...props}
    >
      <h3 className="subject__title">{name}</h3>
      <div className="subject__body">{category}</div>
      <time className="subject__time">{updated_at}</time>
    </Link>
  );
};

export default Subject;
