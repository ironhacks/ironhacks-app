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
import * as DateFormater from '../../utilities/dateFormater.js';
import Loader from '../../utilities/loader.js';

const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  padding: 0 15%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
  overflow: auto;

  h1 {
    margin-top: 100px;
  }

  .tab-container {
    display: flex;
    justify-content: center;
    width: 100%;

    .tab-button {
        border: none;
        height: 60px;
        width: 30%;
        margin-left: 10px;
        border-radius: 4px;
        font-size: 20px;
        font-weight: 700;

        &.selected {
          background-color: ${Constants.mainBgColor};
        }
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

const results = {
  1: {
    b: {
      id: 'hacker 1',
      infoVis: [100, 100, 100],
      analytics: [1, 10],
      similarity: {
        a: 1,
      },
      tech: [100, 100]
    },
    a: {
      id: 'hacker 2',
      infoVis: [100, 100, 100],
      analytics: [1, 10],
      similarity: {
        b: 1
      },
      tech: [100, 100]
    }
  }
}

class Results extends React.Component {
  constructor(props) {
    super(props);
    const { cookies, user } = props;
    this.state = {
      user,
      currentHack: cookies.get('currentHack') || null,
      forumId: cookies.get('currentForum') || null,
      hackData: null,
      treatment: null,
      loading: true,
      currentSection: 'personalFeedback',
    }
  
    this.firestore = window.firebase.firestore();
  }

  componentDidMount() {
    this.getCurrentHackInfo();
    
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
  }

  changeSection = (event) => {
    this.setState({currentSection: event.target.id});
  }

  getCurrentHackInfo = () => {
    const _this = this;
    this.firestore.collection('hacks')
    .doc(this.state.currentHack)
    .get()
    .then((doc) => {
      const hackData = doc.data();
      const currentPhase = DateFormater.getCurrentPhase(hackData.phases).index + 1;
      _this.setState({
        hackData,
        currentPhase,
      });
      _this.getForumData();
    })
    .catch(function(error) {
        console.error("Error getting documents: ", error);
    })
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
            <button
              className={`tab-button ${this.state.currentSection === 'yourCompetitors' ? 'selected' : ''}`}
              onClick={this.changeSection}
              id='yourCompetitors'>
              Your competitors
            </button>
            <button
              className={`tab-button ${this.state.currentSection === 'personalFeedback' ? 'selected' : ''}`}
              onClick={this.changeSection}
              id='personalFeedback'>
              Personal Feedback
            </button>
          </div>
          <div className="seleted-section">
            {this.state.currentSection === 'yourCompetitors' &&
              <React.Fragment>
                <h2>Your Peers</h2>
                {Texts.treatmentText[this.state.treatment].ranking.instructions}
                <table>
                  <thead>
                    <tr>
                      <th>Hacker</th>
                      <th>Project Link</th>
                      {this.state.treatment === "1" && 
                      <th>similarity</th>
                      }
                    </tr>
                  </thead>
                </table>
              </React.Fragment>
            }
            {this.state.currentSection === 'personalFeedback' &&
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