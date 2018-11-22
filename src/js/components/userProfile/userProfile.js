// IronHacks Platform
// userProfile.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom components
import ProjectCard from './projectCard.js';
import Separator from '../../utilities/separator.js';
import * as TemplateFiles from './newProjectFileTemplates/templates.js';
//Custom Constants
import * as Constants from '../../../constants.js';

const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
  overflow: auto;

  h1 {
    margin-bottom: 20px;

    &:first-child {
      margin-top: 150px;
    }
  }
`;
const CardsContainer = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  margin-top: 70px;
`;

class UserProfile extends React.Component {
  constructor(props){
    super(props);
    const { cookies } = props;
    this.state = {
      currentHack: cookies.get('currentHack') || null,
      forum: cookies.get('currentForum') || null,
      startNewProjecNav: false,
      startProjectEditorNav: false,
      projects: [],
      user: this.props.user,
    };
    if(this.props.location.state){
      this.state.user = this.props.location.state.user
    }
  };

  componentDidMount(){
    this.getProjects();
  };
  //Query all the hacks objects from the db.
  getProjects = () => {
    const firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    const _this = this;
    var projects = [];
    firestore.collection("users")
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
        console.error("Error getting documents: ", error);
    });
  };

  createNewProject = (name) => {
    // Accesing to all the blob template variables:
    const templateFiles = [TemplateFiles.indexBlob, TemplateFiles.jsBlob, TemplateFiles.cssBlob]
    Promise.all(
      // Array of "Promises"
      templateFiles.map(file => this.putStorageFile(file, name))
    )
    .then((url) => {
      this.createGitHubRepository(name);
    })
    .catch((error) => {
      console.log(`Something failed: `, error.message)
    });
  };

  createGitHubRepository = (name) => {
    console.log('git')
    // Accesing to all the pain text template variables:
    const templateFiles = [TemplateFiles.index, TemplateFiles.js, TemplateFiles.css]
    let projectName = this.state.user.isAdmin ? 
      `admin-${this.state.user.uid}-${name}` : 
      `${this.state.currentHack}-${this.state.user.uid}-${name}`;
    const _this = this;
    const newRepoConfig = {
      name: projectName,
      description: 'UNAL-ironhacks-fall-2018',
      private: true,
      auto_init: true,
    }
    const createGitHubRepo = window.firebase.functions().httpsCallable('createGitHubRepo');
    createGitHubRepo(newRepoConfig)
    .then((result) => {
      console.log(result)
      if(result.status === 500){
        //Error
        console.log('Error');
        console.error(result.data.error);
      }else{
        _this.setState({
          navigateToCreatedProject: true,
          newProjectName: name,
        })
      }
    });
  };

  putStorageFile = (file, projectName) => {
    //Uploading each template file to storage
    const storageRef = window.firebase.storage().ref();
    const pathRef = storageRef.child(`${this.state.user.uid}/${projectName}/${file.path}${file.name}`)   
    const _this = this;
    // the return value will be a Promise
    return pathRef.put(file.blob)
    .then((snapshot) => {
      console.log('One success:', file, snapshot)
      // Get the download URL
      pathRef.getDownloadURL().then(function(url) {
        console.log(url)
        const fileURL = url;
        const fileJson = {};
        const fullPath = file.path + file.name;
        fileJson[fullPath] = {url: fileURL}
        const firestore = window.firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        firestore.settings(settings);
        firestore.collection("users")
        .doc(_this.state.user.uid)
        .collection('projects')
        .doc(projectName)
        .set(fileJson, {merge: true})
        .then(function(doc) {
          _this.setState({projectList: {}});
        })
      })
    .catch(function(error) {
        console.error("Error getting documents: ", error);
    });
      }).catch(function(error) {
    }).catch((error) => {
      console.log('One failed:', file, error.message)
    });
  };

  goToProjectEditor = (index) => {
    this.setState({
      selectedProject: index,
      navigateToProject: true,
    })
  }

  render() {
    console.log(this.state)
    if (this.state.navigateToProject === true) return <Redirect push to={`projectEditor/${this.state.projects[this.state.selectedProject].name}`}/>;
    if (this.state.navigateToCreatedProject === true) return <Redirect push to={`projectEditor/${this.state.newProjectName}`}/>;

    return (
      <ThemeProvider theme={theme}>
      <SectionContainer className="container-fluid">
        <div className="row">
          <div className='col-md-8 offset-md-2'>
            <h1>Welcome to IronHacks Platform!</h1>
            <span>Bellow you will find the current hack status. You can also manage your projects from here.</span>
            <Separator primary/>
            <CardsContainer >
              <ProjectCard newProject={true} onSave={this.createNewProject}/>
              {this.state.projects.map((project, index) => {
                return <ProjectCard project={project} index={index} key={index} onClick={this.goToProjectEditor}/>
              })}
            </CardsContainer>
          </div>
        </div>
      </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default withCookies(UserProfile);