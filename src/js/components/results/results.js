import React from 'react';
import { withCookies } from 'react-cookie';
import styled, {ThemeProvider} from 'styled-components';
import * as Constants from '../../../constants.js';
import * as DateFormater from '../../utilities/dateFormater.js';
import Loader from '../../utilities/loader.js';
import TimeLine from '../../utilities/timeLine.js';
import { registerStats } from '../../utilities/registerStat.js';
import PersonalScoreSection from './personalScoreSection.js';
import YourCompetitorsRank from './yourCompetitorsRank.js';
import * as Texts from './staticTexts.js';

const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
  overflow: auto;

  .top-container {
    padding: 0 10%;
    background-color: #f9f9f8;
    border-bottom: 1px solid rgb(224, 228, 232);

    h1 {
      padding-top: 100px;
    }

    h3 {
      margin-bottom: 0;
      text-align: center;
    }
  }

  .tab-container {
    display: flex;
    justify-content: left;
    padding: 0 10%;
    width: 100%;
    margin-bottom: -1px;

    .tab-button {
        background-color: #f9f9f8;
        cursor: pointer;
        border: none;
        height: 60px;
        width: 150px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom: 1px solid rgb(224, 228, 232);
        outline: none;


        &.selected {
          background-color: white;
          border-top: 3px solid ${Constants.mainBgColor};
          border-right: 1px solid rgb(225, 228, 232);
          border-left: 1px solid rgb(224, 228, 232);
          border-bottom: 1px solid white;
        }
    }
  }

  .selected-section {
    margin-top: 20px;
    padding: 0 10%;

    .results-loader {
      margin-top: -20px;
      height: 500px;
    }

    h2 {
      &.no-results {
        margin-top: 50px;
        text-align: center;
      }
    }

    h3 {
      &.super-cool-banner {
        font-size: 20px;
        text-align: center;
        -webkit-animation-name: example; /* Safari 4.0 - 8.0 */
        -webkit-animation-duration: 4s; /* Safari 4.0 - 8.0 */
        animation-name: example;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-direction: alternate;

        @-webkit-keyframes example {
          from {color: red;}
          to {color: yellow;}
        }

        /* Standard syntax */
        @keyframes example {
          from {color: #caa32a;}
          to {color: red;}
        }
      }

    }
  }
`;

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
      scores: null,
      loading: true,
      currentSection: 'yourCompetitors',
    }

    this.firestore = window.firebase.firestore();
  }

  componentDidMount() {
    this.getCurrentHackInfo();
  }

  getCurrentHackInfo = () => {
    const _this = this;
    this.firestore.collection('hacks')
    .doc(this.state.currentHack)
    .get()
    .then((doc) => {
      const hackData = doc.data();
      //let currentPhase = DateFormater.getCurrentPhase(hackData.phases).index + 1 || -1;
      _this.setState({
        hackData,
        currentPhase: 4,
        selectedPhase: 3,
      });
      _this.getForumData();
    })
    .catch(function(error) {
        console.error("Error getting documents: ", error);
    })
  }

  getForumData = () => {
    const _this = this;
    this.firestore.collection("forums")
    .doc(this.state.forumId)
    .get()
    .then((doc) => {
      const data = doc.data();
      const { treatment, participants } = data;
      _this.setState({
        treatment,
        participants,
      });
      if( this.state.currentPhase === -1 ){
        this.setState({
          results: false,
          loading: false,
        });
        return;
      }
      _this.getResults(this.state.currentPhase)
    })
    .catch(function(error) {
        console.error("Error getting documents: ", error);
    });
  }

  changeSection = (event) => {
    this.setState({currentSection: event.target.id});
    const statData = {
      event: 'on-result-tab-section-click',
      userId: this.state.user.uid,
      metadata: {
        target: `${event.target.id === 'yourCompetitors' ? 'your-peers-tab' : 'personal-feedback'}`,
        location: 'results-page',
      }
    }
    this.saveStat(statData)
  }

  onPhaseSelection = (phase) => {
    this.setState({selectedPhase: phase + 1})
    this.getResults(phase + 1);
    const statData = {
      event: 'on-phase-click',
      metadata: {
        location: 'results-page',
        phase: phase + 1,
      }
    }
    this.saveStat(statData)
  }

  getResults = (phase) => {
    console.log(phase)
    console.log(this.state.hackData.phases)
    const endDate = DateFormater.getFirebaseDate(this.state.hackData.phases[phase - 1].codingStartEnd);
    this.setState({gettingResults: true})
    const getResults = window.firebase.functions().httpsCallable('getPhaseResults');
    const _this = this;
    getResults({
      phase,
      endDate: endDate.getTime(),
      userId: this.state.user.uid,
      hackId: this.state.currentHack,
      forumId: this.state.forumId}
    ).then((response) => {
      const { userResults: results } = response.data;
      _this.setState({
        results,
        loading: false,
        gettingResults: false,
      });
    })
  }

  saveLikedCompetitors = (likedCompetitors) => {
    const saveLikedCompetitors = window.firebase.functions().httpsCallable('saveLikedCompetitors');
    const _this = this;
    const { currentHack: hackId, selectedPhase: phase} = this.state;
    saveLikedCompetitors({
      userId: this.state.user.uid,
      phase,
      hackId,
      likedCompetitors}
    ).then((response) => {
      _this.getResults(phase);
    })
  }

  saveStat = (stat) => {
    stat.userId = this.state.user.uid;
    stat.metadata.hackId = this.state.currentHack;
    registerStats(stat);
  }

  render() {
    if(this.state.loading){
      return (
        <ThemeProvider theme={theme}>
        <SectionContainer>
          <Loader status="Fetching results..."/>
        </SectionContainer>
        </ThemeProvider>
      );
    }
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer>
          <div className="top-container">
            <h1>Your dashboard</h1>
            {Texts.treatmentText[this.state.treatment].header}
            <h3>Please select the phase you want to check.</h3>
            {this.state.hackData &&
              <TimeLine
                phases={this.state.hackData.phases}
                onClick={this.onPhaseSelection}
                currentPhase={this.state.currentPhase}
              />
            }
            <div className="tab-container">
              <button
                className={`tab-button ${this.state.currentSection === 'yourCompetitors' ? 'selected' : ''}`}
                onClick={this.changeSection}
                id='yourCompetitors'>
                Your Peers
              </button>
              <button
                className={`tab-button ${this.state.currentSection === 'personalFeedback' ? 'selected' : ''}`}
                onClick={this.changeSection}
                id='personalFeedback'>
                Personal Feedback
              </button>
            </div>
          </div>
          <div className="selected-section">
            {this.state.gettingResults &&
              <div className='results-loader'>
                <Loader status="Fetching results..."/>
              </div>
            }
            {!this.state.gettingResults && this.state.results && this.state.currentSection === 'yourCompetitors' &&
              <React.Fragment>
                <h2>Your Competitors</h2>
                {Texts.treatmentText[this.state.treatment].ranking.instructions}
                <h3 className='super-cool-banner'>*** Keep in mind: You can earn excellence if you learn and reuse from others’ apps that are dissimilar ***</h3>
                <YourCompetitorsRank
                  treatment={this.state.treatment}
                  scores={this.state.results}
                  hackName={this.state.hackData.name}
                  participants={this.state.participants}
                  onLikedCompetitors={this.saveLikedCompetitors}/>
              </React.Fragment>
            }
            {!this.state.gettingResults && this.state.results && this.state.currentSection === 'personalFeedback' &&
              <React.Fragment>
                <h2>{Texts.personalFeddback.title}</h2>
                {Texts.personalFeddback.subTitle}
                <PersonalScoreSection
                  scores={this.state.results}
                  userId={this.state.user.uid}
                  hackId={this.state.currentHack}
                  currentPhase={this.state.selectedPhase}/>
              </React.Fragment>
            }
            {!this.state.gettingResults && !this.state.results && <h2 className='no-results'>Not results for this phase yet.</h2>}
          </div>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default withCookies(Results);
