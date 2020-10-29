import React from 'react';
import { Link } from 'react-router-dom';

const QuizNavItem = (
  {
    onItemClick,
    quizId,
    name,
  },
) => {
  return (
    <Link
      onClick={onItemClick}
      data-quizid={quizId}
      to={`?quizId=${quizId}`}
    >
    <div className="quiz_nav__item">
      {name}
    </div>
    </Link>
  );
};

export { QuizNavItem }
