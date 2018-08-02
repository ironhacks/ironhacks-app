// IronHacks Platform
// forum.js - forum main Component
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Link } from "react-router-dom";

//Css
import '../../css/forum.css'

class Forum extends React.Component {
  
  render() {
    return (
      <div className="forum container-fluid">
        <div className="row">
          <div className='col-12'>
          	<h1>Imagine a forum</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Forum;