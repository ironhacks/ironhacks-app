// IronHacks Platform
// landing.js - Landing page
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';

import { Link } from "react-router-dom";

class Landing extends React.Component {
  
  render() {
    return (
      <div className="landing">
        <h1>Test del landing</h1>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}

export default Landing;