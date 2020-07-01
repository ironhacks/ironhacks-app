import React from 'react';
import { QuizNavItem } from './quiz-nav-item';

class QuizNav extends React.Component {
  constructor(props){
    super(props)
    this.quizList = [
        {quizId: 'html_css', name:'HTML & CSS'},
        {quizId: 'bootstrap', name:'Bootstrap'},
        {quizId: 'javascript_jquery', name:'Javascript & Jquery'},
        {quizId: 'google_maps', name:'Google Maps API'},
        {quizId: 'd3', name:'D3js'},
    ];
  }

  render(){
    return(
      <div className="quiz_nav">
       {this.quizList.map((item, index)=>(
         <QuizNavItem
          key={index}
          onItemClick={this.props.onNavItemClick}
          quizId={item.quizId}
          name={item.name}
         />
       ))}
      </div>
    )
  }
}

export { QuizNav }
