// IronHacks Platform
// landing.js - Landing page
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Link } from 'react-router-dom';

import Login from './login.js'

//Css
import '../../css/landing.css'

class Landing extends React.Component {
  
  render() {
    return (
      <div className='landing container-fluid'>
        <div className='row'>
          <div className='col-12'>
            <h1>Imagine this is a Lading Page</h1>
            <Link to="/login" className='login-button'>Login</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;