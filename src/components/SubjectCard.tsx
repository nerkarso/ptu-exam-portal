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

const SubjectCard: React.FC<Props> = ({
  info: { color, name, category, updated_at },
  ...props
}) => {
  return (
    <Link
      to={`/subjects/${name}`}
      className={`subject-card gradient--${color}`}
      {...props}
    >
      <h3 className="subject-card__title">{name}</h3>
      <div className="subject-card__body">{category}</div>
      <time className="subject-card__time">{updated_at}</time>
    </Link>
  );
};

export default SubjectCard;
