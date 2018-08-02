// IronHacks Platform
// header.js - Navigation bar
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Link } from "react-router-dom";

//Css
import '../../css/header.css'

class Header extends React.Component {
  
  render() {
    return (
      <div className="header container-fluid">
        <div className="row">
          <div className="col-4">
            <Link to="/forum" className='login-button'>Forum</Link>
            <span> | </span>
            <Link to="/tutorial" className='login-button'>Tutorial</Link>
            <span> | </span>
            <Link to="/quizzes" className='login-button'>Quizzes</Link>
            <span> | </span>
            <Link to="/task" className='login-button'>Task</Link>
            <span> | </span>
            <Link to="/results" className='login-button'>Results</Link>
          </div>
          <div className="col-4">
          </div>
          <div className="col-4 login-section">
            <Link to="/login" className='login-button'>Login</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;