// IronHacks Platform
// hackSelection.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Redirect } from 'react-router-dom';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom components
import HackCard from '../admin/hackCard.js';
import Separator from '../../utilities/separator.js';
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

class HackSelection extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      startNewHackNav: false,
      startDashboardNav: false,
      hacks: [],
    };
    if(this.props.location.state){
      this.state.user = this.props.location.state.user
    }
  };

  componentDidMount(){
    if(this.state.user) {
      this.getHacks()
    }else{
      this.getUserData();
    }
  };

  //ask for the user status and data.
  getUserData = () => {

  };

  //Query all the hacks objects from the db.
  getHacks = () => {
    const firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    const _this = this;
    var hacks = [];
    firestore.collection("whiteLists").doc(this.state.user.email).get().then(function(doc) {
      //querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data())  
      //});
      
    })
    .catch(function(error) {
        console.error("Error getting documents: ", error);
    });
    /*
    firestore.collection("hacks").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        hacks.push(doc);
      });
      _this.setState({hacks: hacks});
    })
    .catch(function(error) {
        console.error("Error getting documents: ", error);
    });
    */
  };

  goToNewHack = () => {
    this.setState({startNewHackNav: true})
  };

  goToHackDashBoard = (hackIndex) => {
    this.setState((prevState, props) => {
      return {
        startDashboardNav: true,
        selectedHack: prevState.hacks[hackIndex],
      }
    });
  };

  render() {
    console.log(this.props)
    return (
      <ThemeProvider theme={theme}>
      <SectionContainer className="container-fluid">
        <div className="row">
          <div className='col-md-8 offset-md-2'>
            <h1>Welcome to IronHacks Platform!</h1>
            <span>Bellow you will find all the availabe hacks to register in. Click on one of them to start the registration process.</span>
            <Separator primary/>
            <CardsContainer >
              {this.state.hacks.map((hack, index) => {
                return <HackCard hack={hack} index={index} key={hack.id} onClick={this.goToHackDashBoard}/>
              })}
            </CardsContainer>
          </div>
        </div>
      </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default HackSelection;