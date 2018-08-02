// IronHacks Platform
// tutorial.js - Tutorial editor and visualizer
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Link } from "react-router-dom";

//Css
import '../../css/tutorial.css'

class Tutorial extends React.Component {
  
  render() {
    return (
      <div className="tutorial container-fluid">
        <div className="row">
          <div className='col-12'>
          	<h1>Imagine a Tutorial document</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Tutorial;