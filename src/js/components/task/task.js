// IronHacks Platform
// task.js - Task editor and visualizer
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Link } from "react-router-dom";

class Task extends React.Component {
  
  render() {
    return (
      <div className="task container-fluid">
        <div className="row">
          <div className='col-12'>
          	<h2>1. Problem statement:</h2>
            <p>“Find me a safe and affordable district to live in near the NYU Stern School of Business, New York”.</p>
            <p>Imagine you are living in New York City (NY) as a new student at NYU Stern School of Business and you want help others that have no knowledge about the city to find an area to live that is safe, affordable and close to the university”.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Task;