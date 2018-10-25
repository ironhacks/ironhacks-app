// IronHacks Platform
// projectCard.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
import Button from '../../utilities/button.js';

//Section container
const CardContainer = styled('button')`
  height: 150px;
  width: 250px;
  margin: 10px;
  text-align: left;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.3);
  border: none;
  background-color: white; 
  padding: 0;

  &.newProject {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      color: ${Constants.mainBgColor};
      font-size: 20px;
      font-weight: 800;
      margin: 0;
      
      &:first-child {
        line-height: 40px;
        font-size: 40px;
      }
    };
  };

  h3 {
    line-height: 12px;
    margin: 0 0 0 15px;
  };

  span {
    font-size: 12px;
    margin-left: 15px;
  };
`;

const NewProjectForm = styled('div')`
  height: 150px;
  width: 250px;
  margin: 10px;
  text-align: left;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.3);
  border: none;
  background-color: white; 
  padding: 0;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px;
    width: 100%;
    height: 100%;

    h3 {
      color: ${Constants.mainBgColor};
      margin-left: 0;
      margin-bottom: 15px;
    };

    input {
      border: 1px solid gray;
      border-radius: 4px;
      background-color: lightgray;
      padding-left: 10px;
    }

    .control {
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      margin-top: 15px;
    }
  }
`;

const Separator = styled('div')`
  width: 100%;
  height: 1px;
  margin-top: 25px;
  background-color: ${Constants.mainBgColor};
`;

class ProjectCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showNewProjectForm: false,
    }
  }

  onProjectCardClick = () => {
    this.props.onClick(this.props.index);
  };

  showNewProjectForm = () => {
    this.setState((prevState, props) => {
      return ({showNewProjectForm: !prevState.showNewProjectForm})
    });
  };

  handleNameInput = (event) => {
    this.setState({newProjectName: event.target.value});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSave(this.state.newProjectName);
  }

  render() {
    if(this.props.newProject === true){
      if(!this.state.showNewProjectForm) {
        return (
          <CardContainer className='newProject' onClick={this.showNewProjectForm}>
            <span>+</span>
            <span>Create new project</span>
          </CardContainer>
        )
      }else{
        return (
          <NewProjectForm>
            <form>
              <h3>Project name:</h3>
              <input type='text' placeholder='Awasome project' onChange={this.handleNameInput}/>
              <div className='control'>
                <Button 
                  primary
                  width='80px'
                  margin='0 0 0 15px'
                  disabled={this.state.newProjectName ? false: true}
                  onClick={this.handleSubmit}>  
                  Create
                </Button>
                <Button 
                  width='80px' 
                  onClick={this.showNewProjectForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </NewProjectForm>
        )
      }  
    }

    return (
      <CardContainer onClick={this.onProjectCardClick}>
        <h3>{this.props.project.data().name}</h3>
        <Separator/>
      </CardContainer>
    );
  }
}

export default ProjectCard;