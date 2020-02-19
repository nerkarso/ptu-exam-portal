import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  data: {
    id: string;
    code: string;
    title: string;
    categories: String[];
    color: string;
    updatedAt: string;
    status: string;
  };
}

const SubjectCard: React.FC<Props> = ({
  data: { id, code, title, categories, color, updatedAt, status },
  ...props
}) => {
  return (
    <Link
      to={`/subjects/${id}`}
      className={`subject-card gradient--${color}`}
      {...props}
    >
      <h3 className="subject-card__title">{title}</h3>
      <div className="subject-card__body">
        {code} &bull; {categories.join(' ')}
      </div>
      <div className="subject-card__extra">Updated on {updatedAt}</div>
      {status && status !== '' && (
        <div className="subject-card__label">{status}</div>
      )}
    </Link>
  );
};

export default SubjectCard;
