import React from 'react';
import { Link } from 'react-router-dom';

class QuizNavItem extends React.Component {
  render(){
    return(
        <Link
          onClick={this.props.onItemClick}
          data-quizid={this.props.quizId}
          to={`?quizId=${this.props.quizId}`}
        >
        <div className="quiz_nav__item">
          {this.props.name}
        </div>
        </Link>
    )
  }
}

export { QuizNavItem }
