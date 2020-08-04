import React from 'react';
import { Redirect } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Theme } from '../../theme';
import { ProjectApi } from '../../services/project-api';
import ProjectCard from '../projects/project-card';

// const colors = Theme.COLORS;
const styles = Theme.STYLES.AppSectionTheme;

const SectionContainer = styled('div')`
  width: 100%;
  height: ${(props) => props.theme.containerHeight};
  background-color: ${(props) => props.theme.backgroundColor};
  overflow-y: scroll;
  overflow-x: hidden;

  h1 {
    margin-bottom: 20px;

    &:first-child {
      margin-top: 150px;
    }
  }

  h2 {
    margin-top: 50px;
  }

  .padding {
    padding: 0 10%;
  }
`;


const CardsContainer = styled('div')`
  height: auto;
  padding: 20px 10%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  margin-top: 70px;
`;

class ProjectSelectView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentHack: this.props.hackId,
      user: this.props.user,
      forum: null,
      startNewProjecNav: false,
      startProjectEditorNav: false,
      projects: [],
      hackData: this.props.hackData,
    }

    this.goToProjectEditor = this.goToProjectEditor.bind(this);
    this.firestore = window.firebase.firestore();
  }

  setProjects(projects) {
    this.setState({'projects': projects})
  }

  componentDidMount() {
    const userid = this.state.user.uid;
    var projectsPromise = ProjectApi.getProjects(userid);
    const _this = this;
    projectsPromise.then(function(projects){
      console.log('projects', projects);
      _this.setProjects(projects);
    })

    // if (!this.state.user.isAdmin) {
    //   this.getCurrentHackInfo();
    // }
  }

  goToProjectEditor(index) {
    this.setState({
      selectedProject: index,
      navigateToProject: true,
    });
  }

  onPhaseSelection(phase) {

  }

  render() {
    if (this.state.navigateToProject === true) {
      return (
        <Redirect push to={`./projects/${this.state.projects[this.state.selectedProject].name}`} />
      )
    }

    if (this.state.navigateToCreatedProject === true) {
      return (
        <Redirect push to={`./projects/${this.state.newProjectName}`} />
      )
    }

    return (
      <ThemeProvider theme={styles}>
        <SectionContainer>
          <CardsContainer>
            <ProjectCard
              newProject={true}
              onSave={this.createNewProject}
              projects={this.state.projects}
            />

            {this.state.projects.map((project, index) => {
              return (
                <ProjectCard
                  project={project}
                  index={index}
                  key={index}
                  onClick={this.goToProjectEditor}
                />
              )
            })}
          </CardsContainer>
        </SectionContainer>
      </ThemeProvider>
    )
  }
}


export default ProjectSelectView;
