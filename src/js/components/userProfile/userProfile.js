// IronHacks Platform
// userProfile.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Redirect } from 'react-router-dom';
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
  justify-content: center;
  margin-top: 70px;
`;

class UserProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      startNewProjecNav: false,
      startProjectEditorNav: false,
      hacks: [],
    };
    if(this.props.location.state){
      this.state.user = this.props.location.state.user
    }
  };

  componentDidMount(){
    this.getUserData();
  };

  //ask for the user status and data.
  getUserData = () => {
    const _this = this;
    window.firebase.auth().onAuthStateChanged((user) => {
      if(user){
        _this.setState({user: user});
        _this.isAdmin(); //We only check this to display specific ui items.
      }
    });
  };
  //check on the DB if the current user is admin.
  isAdmin = () => {
    //db Reference
    const firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    const _this = this;
    //Updating the current hack:
    firestore.collection('admins').doc(this.state.user.uid)
    .get()
    .then(function(doc) {
      //Is admin.
      _this.setState((prevState, props) => {
        prevState.user.isAdmin = true;
        return prevState;
      })
      _this.getProjects();
    }) 
    .catch(function(error) {
      // The user can't read the admins collection, therefore, is not admin.
      _this.setState((prevState, props) => {
        prevState.user.isAdmin = false;
        return prevState;
      })
      _this.getProjects();
    });
  };
  //Query all the hacks objects from the db.
  getProjects = () => {
    const firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    const _this = this;
    var projects = [];
    firestore.collection("users").doc(this.state.user.uid).get().then(function(doc) {
      const userData = doc.data();
      if(userData.projectList){
        projects = userData.projectList;
        _this.setState({projectList: projects});
      }else{
        //The user doesn't hace any projects.
        _this.setState({projectList: {}});
      }
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
      console.log(`All success`, url)
    })
    .catch((error) => {
      console.log(`Some failed: `, error.message)
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
  }

  render() {
    if (this.state.startNewProjecNav === true) return <Redirect to='admin/newHack'/>;
    if (this.state.startDashboardNav === true){
      const selectedHack = this.state.selectedHack.data();
      const selectedHackId = this.state.selectedHack.id;
      const hackName = selectedHack.name
      const pathname = '/admin/dashboard/' + hackName;
      return <Redirect to={{
        pathname: pathname,
        state: {hack: selectedHack, hackId: selectedHackId}
      }}
      />;
    }

    return (
      <ThemeProvider theme={theme}>
      <SectionContainer className="container-fluid">
        <div className="row">
          <div className='col-md-8 offset-md-2'>
            <h1>Welcome to IronHacks Platform!</h1>
            <span>Bellow you will find all the availabe hacks to register in. Click on one of them to start the registration process.</span>
            <Separator primary/>
            <ProjectCard newProject={true} onSave={this.createNewProject}/>
            <CardsContainer >
              {this.state.hacks.map((hack, index) => {
                return <ProjectCard hack={hack} index={index} key={hack.id} onClick={this.goToHackDashBoard}/>
              })}
            </CardsContainer>
          </div>
        </div>
      </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default UserProfile;