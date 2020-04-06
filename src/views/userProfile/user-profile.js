import React from 'react';
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import styled, { ThemeProvider } from 'styled-components';
import Separator from '../../util/separator.js';
// import TimeLine from '../../util/timeLine.js';
import { Theme } from '../../theme';
import {Loader} from '../../components/loader';
import { projectApi } from '../../services/project-api';
import * as TemplateFiles from './lib/project-files';
import ProjectCard from './lib/project-card';
import Examples from './lib/d3-examples';

const colors = Theme.COLORS;
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

const ProfileContainer = styled('div')`
  display: flex;
  justify-content: center;
  padding: 0 10%;
  margin: 100px 0 20px 0;
  width: 100%;
  height: 250px;

  span {
    width: 250px;
    height: 250px;
    background-color: lightgray;
    text-align: center;
    font-size: 140px;
    border-radius: 125px;
    padding: 17px 0;
  }

  .user-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin-left: 50px;
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

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      currentHack: cookies.get('currentHack') || null,
      forum: cookies.get('currentForum') || null,
      startNewProjecNav: false,
      startProjectEditorNav: false,
      projects: [],
      hackData: null,
      user: this.props.user,
    };

    if (this.props.location.state) {
      this.state.user = this.props.location.state.user;
    }

    this.firestore = window.firebase.firestore();
  }

  componentDidMount() {
    this.getProjects();
    if (!this.state.user.isAdmin) {
      this.getCurrentHackInfo();
    }
  }

  goToProjectEditor = (index) => {
    this.setState({
      selectedProject: index,
      navigateToProject: true,
    });
  };


  onPhaseSelection = (phase) => {};

  render() {
    if (this.state.loading) {
      return (
        <ThemeProvider theme={styles}>
          <SectionContainer>
            <Loader status={this.state.status} />
          </SectionContainer>
        </ThemeProvider>
      );
    }

    if (this.state.navigateToProject === true) {
      return (
        <Redirect
          push
          to={`projectEditor/${
            this.state.projects[this.state.selectedProject].name
          }`}
        />
      );
    }
    if (this.state.navigateToCreatedProject === true) {
      return (
        <Redirect push to={`projectEditor/${this.state.newProjectName}`} />
      );
    }
    return (
      <ThemeProvider theme={styles}>
        <SectionContainer>
          <ProfileContainer>
            <span>{this.state.user.profileLetters}</span>
            <div className='user-data'>
              <h3>Personal Info:</h3>
              <p>
                Name: {this.state.user.displayName} <br />
                Email: {this.state.user.email}
              </p>
              <h3>Hack Info:</h3>
              <p>
                Current hack:{' '}
                {this.state.hackData ? this.state.hackData.name : 'loading...'}{' '}
                <br />
                Current Phase:{' '}
                {this.state.hackData ? this.state.hackData.name : 'loading...'}
              </p>
            </div>
          </ProfileContainer>

          <Examples user={this.state.user} />
          <h2 className='padding'>D3.js Examples</h2>
          <h2 className='padding'>Projects</h2>
          <span className='padding'>
            Bellow you will find the current hack status. You can also manage
            your projects from here.
          </span>
          <Separator primary className='padding' />
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
              );
            })}
          </CardsContainer>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

// {this.state.hackData &&
//           <TimeLine
//             phases={this.state.hackData.phases}
//             onClick={this.onPhaseSelection}
//             currentPhase={this.state.currentPhase}
//           />
//         }

export default withCookies(UserProfile);
