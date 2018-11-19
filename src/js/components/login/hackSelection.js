// IronHacks Platform
// hackSelection.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom components
import HackCard from '../admin/hackCard.js';
import Separator from '../../utilities/separator.js';
import Loader from '../../utilities/loader.js';
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
      startNewHackNav: false,
      startDashboardNav: false,
      registeredHacks: [],
      availableHacks: [],
    };
    this.firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    this.firestore.settings(settings);
  };

  componentDidMount(){
    this.getHacks()
  };

  //Query all the hacks objects from the db.
  getHacks = () => {
    const _this = this;
    this.firestore.collection('users')
    .doc(_this.props.user.uid)
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
        }
      })
      .catch(function(error) {
          console.error("Error getting documents: ", error);
      })
    })
    .catch(function(error) {
        console.error("Error getting documents: ", error);
    })
  };

  callRegistrationFuncion = (hackIndex) => {
    this.setState({loading:true})
    const _this = this;
    const hackId = _this.state.availableHacks[hackIndex].id
    const registerUserFunc = window.firebase.functions().httpsCallable('registerUser');
    registerUserFunc({hackId: hackId}).then((result) => {
      _this.firestore.collection('users')
      .doc(this.props.user.uid)
      .get()
      .then((doc) => {
        const { cookies } = _this.props;
        cookies.set('currentHack', hackId);
        cookies.set('currentForum', doc.data().forums[hackId].id);
        _this.setState({mustNavigate: true})
      })
    });
  };

  setHack = (hackIndex) => {
    const hackId = this.state.registeredHacks[hackIndex].id
    const _this = this;
    this.firestore.collection('users')
    .doc(this.props.user.uid)
    .get()
    .then((doc) => {
      const { cookies } = _this.props;
      cookies.set('currentHack', hackId);
      cookies.set('currentForum', doc.data().forums[hackId].id);
      _this.setState({mustNavigate: true})
    })
  };

  render() {
    if(this.state.mustNavigate){
      return <Redirect to={{
        pathname: '/forum',
      }}/>
    }
    if(this.state.loading){
      return (
        <ThemeProvider theme={theme}>
        <SectionContainer className="container-fluid">
          <Loader />
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
                return <HackCard hack={hack.data()} index={index} key={hack.id} onClick={this.callRegistrationFuncion}/>
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