// IronHacks Platform
// results.js - Results Component
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { withCookies } from 'react-cookie';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
import * as Texts from './staticTexts.js';
import PersonalScoreSection from './personalScoreSection.js';
//Custom Constants
import * as Constants from '../../../constants.js';
import Loader from '../../utilities/loader.js';

const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  padding: 20px 15%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
  overflow: auto;

  h1 {
    margin-top: 100px;
  }

  .tab-container {

    .tab-button {
      border: none;
      height: 30px;
      border-radius: 8px 8px 0 0;
    }
  }

  .seleted-section {
    padding: 20px;
  }
`;

const AdminControlls = styled('div')`
  display: flex;
  width: 100%;
  padding: 0 10% 0 10%;

`;

class Results extends React.Component {
  constructor(props) {
    super(props);
    const { cookies, user } = props;
    this.state = {
      user,
      currentHack: cookies.get('currentHack') || null,
      forumId: cookies.get('currentForum') || null,
      treatment: 1,
      loading: true,
      currentSection: 'personalScore',
    }
  
    this.firestore = window.firebase.firestore();
  }

  componentDidMount() {
    this.getForumData();
  }

  getForumData = () => {
    const _this = this;
    this.firestore.collection("forums")
    .doc(this.state.forumId)
    .get()
    .then((doc) => {
      const data = doc.data();
      console.log(data)
      _this.setState({
        treatment: data.treatment,
        loading: false
      });
    })
    .catch(function(error) {
        console.error("Error getting documents: ", error);
    });
  };


  render() {
    console.log(this.state)
    if(this.state.loading){
      return (
        <ThemeProvider theme={theme}>
        <SectionContainer className="container-fluid">
          <Loader status="Fetching results..."/>
        </SectionContainer>
        </ThemeProvider>
      );
    }

    return (
      <ThemeProvider theme={theme}>
        <SectionContainer>
          <h1>Welcome back to your dashboard</h1>
          {Texts.treatmentText[this.state.treatment].header}
          <div className="tab-container">
            <button className="tab-button">Personal Feedback</button>
            <button className="tab-button">Your competitors</button>
          </div>
          <div className="seleted-section">
            {this.state.currentSection === 'personalScore' &&
              <React.Fragment>
                <h2>{Texts.personalFeddback.title}</h2>
                {Texts.personalFeddback.subTitle}
                <PersonalScoreSection/>
              </React.Fragment>
            }
            
          </div>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default withCookies(Results);