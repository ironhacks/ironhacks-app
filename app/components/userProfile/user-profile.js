// userProfile.js


import React from 'react';
import {Redirect} from 'react-router-dom';
import {withCookies} from 'react-cookie';

import styled, {ThemeProvider} from 'styled-components';

import ProjectCard from './projectCard.js';
import Separator from '../../utilities/separator.js';
// import TimeLine from '../../utilities/timeLine.js';
import * as TemplateFiles from './newProjectFileTemplates/templates.js';
import Examples from './d3Examples.js';

import {Theme} from '../../theme';
import Loader from '../../utilities/loader.js';
const colors = Theme.COLORS;
const styles = Theme.STYLES.AppSectionTheme;

// Section container
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
    const {cookies} = props;
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
  };

  componentDidMount() {
    this.getProjects();
    if (!this.state.user.isAdmin) {
      this.getCurrentHackInfo();
    }
  };
  // Query all the hacks objects from the db.
  getProjects = () => {
    const firestore = window.firebase.firestore();
    const _this = this;
    const projects = [];
    firestore.collection('users')
        .doc(this.state.user.uid)
        .collection('projects')
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach((doc) => {
            const projectData = doc.data();
            projectData.name = doc.id;
            projects.push(projectData);
            _this.setState({projects: projects});
          });
        })
        .catch(function(error) {
          console.error('Error getting documents: ', error);
        });
  };

  createNewProject = (name) => {
    this.setState({loading: true, status: 'Creatring project...'});
    // Accesing to all the blob template variables:
    const templateFiles = [TemplateFiles.indexBlob, TemplateFiles.jsBlob, TemplateFiles.cssBlob];
    Promise.all(
        // Array of "Promises"
        templateFiles.map((file) => this.putStorageFile(file, name)),
    )
        .then(() => {
          this.createGitHubRepository(name);
        })
        .catch((error) => {
          console.log(`Something failed: `, error.message);
        });
  };

  createGitHubRepository = (name) => {
    this.setState({status: 'Creating repository...'});
    // Accesing to all the pain text template variables:
    const templateFiles = [{name: 'index.html', content: TemplateFiles.index}, {name: 'js/main.js', content: TemplateFiles.js}, {name: 'css/main.css', content: TemplateFiles.css}];
    const projectName = this.state.user.isAdmin
      ? `admin-${this.state.user.uid}-${name}`
      : `${this.state.currentHack}-${this.state.user.uid}-${name}`;
    const _this = this;
    const newRepoConfig = {
      name: projectName,
      description: 'UNAL-ironhacks-fall-2018',
      private: true,
      auto_init: true,
    };
    const createGitHubRepo = window.firebase.functions().httpsCallable('createGitHubRepo');
    createGitHubRepo(newRepoConfig)
        .then((result) => {
          if (result.status === 500) {
            // Error
            console.error(result.data.error);
          } else {
            this.setState({status: 'Uploading files...'});
            const commitToGitHub = window.firebase.functions().httpsCallable('commitToGitHub');
            commitToGitHub({name: projectName, files: templateFiles, commitMessage: 'init commit'})
                .then((result) => {
                  if (result.status === 500) {
                    console.error(result.error);
                  } else {
                    _this.setState({
                      loading: false,
                      navigateToCreatedProject: true,
                      newProjectName: name,
                    });
                  }
                });
          }
        });
  };

  putStorageFile = (file, projectName) => {
    // Uploading each template file to storage
    const storageRef = window.firebase.storage().ref();
    const pathRef = storageRef.child(`${this.state.user.uid}/${projectName}/${file.path}${file.name}`);
    const _this = this;
    // the return value will be a Promise
    return pathRef.put(file.blob)
        .then((snapshot) => {
          // Get the download URL
          pathRef.getDownloadURL().then(function(url) {
            const fileURL = url;
            const fileJson = {};
            const fullPath = file.path + file.name;
            fileJson[fullPath] = {url: fileURL};
            const firestore = window.firebase.firestore();
            firestore.collection('users')
                .doc(_this.state.user.uid)
                .collection('projects')
                .doc(projectName)
                .set(fileJson, {merge: true})
                .then(function(doc) {
                  _this.setState({projectList: {}});
                });
          })
              .catch(function(error) {
                console.error('Error getting documents: ', error);
              });
        }).catch(function(error) {
        }).catch((error) => {
          console.log('One failed:', file, error.message);
        });
  };

  goToProjectEditor = (index) => {
    this.setState({
      selectedProject: index,
      navigateToProject: true,
    });
  }

  getCurrentHackInfo = () => {
    const _this = this;
    this.firestore.collection('hacks')
        .doc(this.state.currentHack)
        .get()
        .then((doc) => {
          _this.setState({hackData: doc.data()});
        })
        .catch(function(error) {
          console.error('Error getting documents: ', error);
        });
  };

  onPhaseSelection = (phase) => {
  }

  render() {
    if (this.state.loading) {
      return (
        <ThemeProvider theme={styles}>
          <SectionContainer>
            <Loader status={this.state.status}/>
          </SectionContainer>
        </ThemeProvider>
      );
    }

    if (this.state.navigateToProject === true) return <Redirect push to={`projectEditor/${this.state.projects[this.state.selectedProject].name}`}/>;
    if (this.state.navigateToCreatedProject === true) return <Redirect push to={`projectEditor/${this.state.newProjectName}`}/>;
    return (
      <ThemeProvider theme={styles}>
        <SectionContainer>
          <ProfileContainer>
            <span>{this.state.user.profileLetters}</span>
            <div className='user-data'>
              <h3>Personal Info:</h3>
              <p>
              Name: {this.state.user.displayName} <br/>
              Email: {this.state.user.email}
              </p>
              <h3>Hack Info:</h3>
              <p>
              Current hack: {this.state.hackData ? this.state.hackData.name : 'loading...'} <br/>
              Current Phase: {this.state.hackData ? this.state.hackData.name : 'loading...'}
              </p>
            </div>
          </ProfileContainer>

          <Examples user={this.state.user}/>
          <h2 className='padding'>D3.js Examples</h2>
          <h2 className='padding'>Projects</h2>
          <span className='padding'>Bellow you will find the current hack status. You can also manage your projects from here.</span>
          <Separator primary className='padding'/>
          <CardsContainer >
            <ProjectCard newProject={true} onSave={this.createNewProject} projects={this.state.projects}/>
            {this.state.projects.map((project, index) => {
              return <ProjectCard project={project} index={index} key={index} onClick={this.goToProjectEditor}/>;
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
