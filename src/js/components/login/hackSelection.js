// IronHacks Platform
// hackSelection.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
import swal from 'sweetalert2';
//Custom components
import HackCard from '../admin/hackCard.js';
import Separator from '../../utilities/separator.js';
import Loader from '../../utilities/loader.js';
import * as TemplateFiles from './newHackTemplates/sprint2019Unal.js';
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
      margin-top: 100px;
    }
  }

  .empty-list {
    color: gray;
    font-style: italic;
  }

  overflow: auto;
`;
const CardsContainer = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 35px;
  margin-bottom: 35px;
`;

class HackSelection extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: this.props.user,
      startNewHackNav: false,
      startDashboardNav: false,
      registeredHacks: [],
      availableHacks: [],
      loading: false,
    };
    this.firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    this.firestore.settings(settings);
  };

  componentDidMount() {
    this.getHacks()
    window.addEventListener("message", this.recieveMessage)
  }

  recieveMessage = (event) => {
    if(event.data === 'quizDone'){
      swal.clickConfirm();
    }
  }

  //Query all the hacks objects from the db.
  getHacks = () => {
    const _this = this;
    this.firestore.collection('users')
    .doc(_this.state.user.uid)
    .get()
    .then((user) => {
      _this.firestore.collection("whiteLists")
      .doc(_this.props.user.email)
      .get()
      .then(function(doc) {
        const hackIds = doc.data().whiteList;
        for(const hackId in hackIds){
          _this.firestore.collection("hacks")
          .doc(hackIds[hackId])
          .get()
          .then(function(doc) {
            _this.setState((prevState, props) => {
              if(user.data().hacks && user.data().hacks.includes(hackIds[hackId])){
                prevState.registeredHacks.push(doc);
              }else{
                prevState.availableHacks.push(doc);
              }
              return prevState;
            })
          })
          .catch(function(error) {
            console.error("Error getting documents: ", error);
          })
        }
      })
      .catch(function(error) {
          console.error("Error getting documents: ", error);
      })
    })
    .catch(function(error) {
        console.error("Error getting documents: ", error);
    })
  }

  goToPresurvey = (hackIndex) => {
    swal(Constants.preSurveyAlertContent('https://purdue.ca1.qualtrics.com/jfe/form/SV_1HZrbxWIcPvZkUJ?user_email=' + this.props.user.email))
    .then((result) => {
      if(!result.dismiss) {
        this.callRegistrationFuncion(hackIndex);
      };
    });
  }

  callRegistrationFuncion = (hackIndex) => {
    this.setState({loading:true, status: "Starting registration process..."});
    const _this = this;
    const hackId = _this.state.availableHacks[hackIndex].id
    const registerUserFunc = window.firebase.functions().httpsCallable('registerUser');
    registerUserFunc({hackId: hackId}).then((result) => {
      const projectName = _this.state.availableHacks[hackIndex].data().name.replace(/\s/g, '');
      _this.createNewProject(projectName, hackId, hackIndex);
    });
  }

  setHack = (hackIndex) => {
    this.setState({status: "Creating participant profile..."});
    const hackId = this.state.registeredHacks[hackIndex] ? this.state.registeredHacks[hackIndex].id : this.state.availableHacks[hackIndex].id;
    const _this = this;
    this.firestore.collection('users')
    .doc(this.props.user.uid)
    .get()
    .then((doc) => {
      const { cookies } = _this.props;
      cookies.set('currentHack', hackId);
      cookies.set('currentForum', doc.data().forums[hackId].id);
      _this.setState({mustNavigate: true});
    })
  }

   createNewProject = (name, hackId, hackIndex) => {
    this.setState({status: "Creating participant projects (1/2)..."});
    // Accesing to all the blob template variables:
    const files = TemplateFiles.files;
    Promise.all(
      // Array of "Promises"
      files.map(file => this.putStorageFile(file, name))
    )
    .then((url) => {
      this.createGitHubRepository(name, hackId, hackIndex);
    })
    .catch((error) => {
      console.log(`Something failed: `, error.message)
    });
  }

  createGitHubRepository = (name, hackId, hackIndex) => {
    this.setState({status: "Creating participant profile (2/2)..."});
    // Accesing to all the pain text template variables:
    const templateFiles = 
    [
       {
          name: 'index.html',
          content: TemplateFiles.indexContent,
        },
        {
          name: 'js/main.js',
          content: TemplateFiles.mainJSContent,
        },
        {
          name: 'js/map.js',
          content: TemplateFiles.mapJSContent,
        },
        {
          name: 'js/visualization.js',
          content: TemplateFiles.visualizationJSContent,
        },
        {
          name: 'css/main.css',
          content: TemplateFiles.mainCSSContent,
        },
        {
          name: 'data/population.csv',
          content: TemplateFiles.d3Data,
        },
    ]
    let projectName = `${hackId}-${this.state.user.uid}-${name}`;
    const _this = this;
    const newRepoConfig = {
      name: projectName,
      description: 'UNAL-ironhacks-spring-2019',
      private: true,
      auto_init: true,
    }
    const createGitHubRepo = window.firebase.functions().httpsCallable('createGitHubRepo');
    createGitHubRepo(newRepoConfig)
    .then((result) => {
      if(result.status === 500){
        console.error(result.data.error);
      }else{
        _this.setState({status: "Uploading files..."});
        const commitToGitHub = window.firebase.functions().httpsCallable('commitToGitHub');
        commitToGitHub({name: projectName, files: templateFiles, commitMessage: 'init commit'})
        .then((result) => {
          if(result.status === 500){
            console.error(result.error);
          }else{
            _this.setHack(hackIndex);
          }
        })
      }
    });
  }

  putStorageFile = (file, projectName) => {
    //Uploading each template file to storage
    const storageRef = window.firebase.storage().ref();
    const pathRef = storageRef.child(`${this.state.user.uid}/${projectName}/${file.path}${file.name}`)   
    const _this = this;
    // the return value will be a Promise
    return pathRef.put(file.blob)
    .then((snapshot) => {
      // Get the download URL
      pathRef.getDownloadURL().then(function(url) {
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
    if(this.state.mustNavigate){
      return <Redirect Redirect to={{
        pathname: '/forum',
      }}/>
    }
    if(this.state.loading){
      return (
        <ThemeProvider theme={theme}>
        <SectionContainer className="container-fluid">
          <Loader status={this.state.status} />
        </SectionContainer>
        </ThemeProvider>
      );
    }
    return (
      <ThemeProvider theme={theme}>
      <SectionContainer className="container-fluid">
        <div className="row">
          <div className='col-md-8 offset-md-2'>
            <h1>Welcome to IronHacks Platform!</h1>
            <h2>My Hacks</h2>
            <span>Bellow you will find the hacks you are currently participating in. Click in any of them to go to the contest.</span>
            <Separator primary/>
            {this.state.registeredHacks.length === 0 ? <span className='empty-list'>You are not registered on any hack.</span> : false}
            <CardsContainer >
              {this.state.registeredHacks.map((hack, index) => {
                return <HackCard hack={hack.data()} index={index} key={hack.id} onClick={this.setHack}/>
              })}
            </CardsContainer>
            <Separator/>
            <h2>Available hacks for registration</h2>
            <span>Bellow you will find all the availabe hacks to register in. Click on one of them to start the registration process.</span>
            <Separator primary/>
            {this.state.availableHacks.length === 0 ? <span className='empty-list'>Theres is no hacks availabe.</span> : false}
            <CardsContainer >
              {this.state.availableHacks.map((hack, index) => {
                return <HackCard hack={hack.data()} index={index} key={hack.id} onClick={this.goToPresurvey}/>
              })}
            </CardsContainer>
          </div>
        </div>
      </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default withCookies(HackSelection);