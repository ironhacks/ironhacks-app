// IronHacks Platform
// header.js - Navigation bar
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';

import { Link } from "react-router-dom";

class Header extends React.Component {
  
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 header">
            <div className="col-3">
            </div>
            <div className="col-3">
            </div>
            <div className="col-3">
            </div>
            <div className="col-3">
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;