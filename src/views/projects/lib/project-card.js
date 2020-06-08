import React from 'react';
import styled from 'styled-components';
import { Theme } from '../../../theme';
import Button from '../../../util/button.js';

const colors = Theme.COLORS;
const units = Theme.UNITS;

const CardContainer = styled('button')`
  height: 180px;
  width: 30%;
  margin: 10px;
  text-align: left;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
  border: none;
  background-color: white;
  padding: 0;

  &.newProject {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      color: ${colors.mainBgColor};
      font-size: 20px;
      font-weight: 800;
      margin: 0;

      &:first-child {
        line-height: 40px;
        font-size: 40px;
      }
    }
  }

  h3 {
    line-height: 12px;
    margin: 0 0 0 15px;
  }

  span {
    font-size: 12px;
    margin-left: 15px;
  }
`;

const NewProjectForm = styled('div')`
  height: 180px;
  width: 30%;
  margin: 10px;
  text-align: left;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
  border: none;
  background-color: white;
  padding: 0;

  .name-error {
    font-size: 13px;
    margin-top: 5px;
    margin-bottom: 0;
    color: salmon;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px;
    width: 100%;
    height: 100%;

    h3 {
      color: ${colors.mainBgColor};
      margin-left: 0;
      margin-bottom: 15px;
    }

    input {
      border: 1px solid gray;
      border-radius: 4px;
      background-color: lightgray;
      padding-left: 10px;

      &[type='submit'] {
        width: 80px;
        height: 30px;
        margin-left: 5px;
        padding: 0 10px;
        background-color: ${colors.mainBgColor};
        border-radius: ${units.universalBorderRadius};
        border: none;
      }
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
  background-color: ${colors.mainBgColor};
`;

class ProjectCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewProjectForm: false,
    };
  }

  onProjectCardClick() {
    this.props.onClick(this.props.index);
  };

  showNewProjectForm() {
    this.setState((prevState, props) => {
      return { showNewProjectForm: !prevState.showNewProjectForm };
    });
  };

  handleNameInput(event) {
    this.setState({ newProjectName: event.target.value });
  };

  validateName() {
    const whiteSpaces = /\s/;
    const alphaNumeric = /^[a-z0-9]+$/i;
    if (this.state.newProjectName === '') {
      return { error: 'You must write something!' };
    }
    if (whiteSpaces.test(this.state.newProjectName)) {
      return { error: "Name can't contain spaces." };
    }
    const duplicatedName = this.props.projects.some(
      (project) => project.name === this.state.newProjectName
    );

    if (duplicatedName) {
      return { error: 'A project with that name already exists' };
    }

    if (alphaNumeric.test(this.state.newProjectName)) {
      return { result: true };
    }
    return { error: 'Name can only contain letters and numbers.' };
  };

  duplicatedName(name) {
    return name === this.state.name;
  };

  handleSubmit(event) {
    event.preventDefault();
    const { result, error } = this.validateName();
    if (result) {
      this.props.onSave(this.state.newProjectName);
      this.setState({ nameError: null });
    } else {
      this.setState({ nameError: error });
    }
  };

  render() {
    if (this.props.newProject === true) {
      if (!this.state.showNewProjectForm) {
        return (
          <CardContainer
            className='newProject'
            onClick={this.showNewProjectForm}
          >
            <span>+</span>
            <span>Create new project</span>
          </CardContainer>
        );
      } else {
        return (
          <NewProjectForm>
            <form onSubmit={this.handleSubmit}>
              <h3>Project name:</h3>
              <input
                type='text'
                placeholder='Awesome project'
                onChange={this.handleNameInput}
              />

              {this.state.nameError && (
                <p className='name-error'>{this.state.nameError}</p>
              )}

              <div className='control'>
                <input type='submit' value='Create' />
                <Button
                  width='80px'
                  onClick={this.showNewProjectForm}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </NewProjectForm>
        );
      }
    }

    return (
      <CardContainer onClick={this.onProjectCardClick}>
        <h3>{this.props.project.name}</h3>
        <Separator />
      </CardContainer>
    );
  }
}

export default ProjectCard;
