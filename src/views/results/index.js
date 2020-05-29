import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
// import { withCookies } from 'react-cookie';
import { Theme } from '../../theme';
import { Loader } from '../../components/loader';
import { Timeline } from '../../components/timeline';
import * as DateFormater from '../../util/dateFormater.js';
import { PersonalScoreSection } from './lib/results-section-personal.js';
import { ResultSectionCompetitors } from './lib/results-section-competitors';
import { TreatmentTexts } from './lib/treatment-texts';
import {
  getPhaseResults,
  getUserPhaseResults,
  getAdminHackData,
  getUserForumData,
} from './lib/get-results';

// import log from '../../util/log';

const colors = Theme.COLORS;
const styles = Theme.STYLES.AppSectionTheme;

const SectionContainer = styled('div')`
  width: 100%;
  height: ${(props) => props.theme.containerHeight};
  background-color: ${(props) => props.theme.backgroundColor};
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
        border-top: 3px solid ${colors.mainBgColor};
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
        -webkit-animation-name: example;
        -webkit-animation-duration: 4s;
        animation-name: example;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-direction: alternate;

        @-webkit-keyframes example {
          from {
            color: red;
          }
          to {
            color: yellow;
          }
        }

        @keyframes example {
          from {
            color: #caa32a;
          }
          to {
            color: red;
          }
        }
      }
    }
  }
`;


class ResultsTabSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSection: 'competitors',
    }
  }

  changeSection = (event) => {
    this.setState({
      activeSection: event.target.id
    })
    this.props.callback(event.target.id);
  }

  render() {
    return (
      <div className='tab-container'>
        <button
          className={`tab-button ${this.state.activeSection === 'competitors' ? 'selected' : ''}`}
          onClick={this.changeSection}
          id='competitors'
        >
          Your Peers
        </button>
        <button
          className={`tab-button ${ this.state.activeSection === 'personal' ? 'selected' : ''}`}
          onClick={this.changeSection}
          id='personal'
        >
          Personal Feedback
        </button>
    </div>
    )
  }
}

class ResultsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.hackUser,
      userId: this.props.hackUserId,
      hackId: this.props.hackId,
      currentHack: this.props.hackId,
      // currentHack: cookies.get('currentHack') || null,
      forumId: '8JKHD71CFYS2SzI52UQ9',
      // forumId: cookies.get('currentForum') || null,
      hackData: this.props.hackData,
      hackPhases: this.props.hackPhases,
      treatment: this.props.treatement || 0,
      scores: null,
      loading: true,
      currentSection: 'competitors',
      currentPhase: 1,
      selectedPhase: 1,
    }

    this._isMounted = false;
    // this.firestore = window.firebase.firestore();
    this.updateSection = this.updateSection.bind(this);
    this.onPhaseSelection = this.onPhaseSelection.bind(this);
    this.getHackResults = this.getHackResults.bind(this);
    this.getCurrentHackInfo = this.getCurrentHackInfo.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    // this.getCurrentHackInfo();

    // getHackResults
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  userSaveLikedCompetitors(likedCompetitors) {
    const saveLikedCompetitors = window.firebase
      .functions()
      .httpsCallable('saveLikedCompetitors')

    const {
      // currentHack: hackId,
      selectedPhase: phase
    } = this.state;

    saveLikedCompetitors({
      userId: this.props.userId,
      phase,
      hackId: this.props.hackId,
      likedCompetitors,
    }).then((response) => {
      this.getHackResults(phase);
    })
  }


  setCurrentHackInfo(data) {
    console.log(data);
    if (this._isMounted) {
      this.setState({
        hackData: data,
        currentPhase: 1,
        selectedPhase: 1,
      })
    }

    localStorage.setItem('currentHackInfo', JSON.stringify(data))
  }

  getCurrentHackInfo() {
    let hackId = this.props.hackId;
    console.log('get current hack info', hackId);
    const hacks = window.firebase.firestore()
      .collection('hacks')
      .doc(hackId)
      .get();

    const hackData = Promise.resolve(hacks).then((doc) => {
        const data = doc.data();
        // let currentPhase = DateFormater.getCurrentPhase(hackData.phases).index + 1 || -1;
        // this.getForumData();
        // this.getHackResults();
        return data;
      })
      .catch(function(error) {
        console.error('Error getting documents: ', error);
      })
      this.setCurrentHackInfo(hackData)
  }



  onPhaseSelection(phase) {
    this.setState({ selectedPhase: phase + 1 });
    this.getHackResults(phase + 1);
  }

  updateSection(id) {
    this.setState({currentSection: id});
  }

  saveStat(stat) {
    // stat.userId = this.state.user.uid;
    // stat.metadata.hackId = this.state.currentHack;
    // registerStats(stat);
  }

  _getAdminHackData() {
    let hackDataPromise = getAdminHackData({
      hackId: this.props.hackId,
    });
    let hackData = Promise.resolve(hackDataPromise).then((result)=>{
      console.log(result);
      return result;
    })
    return hackData;
  }

  async getHackResults(phase) {
    // this.state.hackData.phases[phase - 1].codingStartEnd

    let hackData = await this._getAdminHackData();
    // Promise.resolve(hackData).then((data)=>{
    console.log('hackData', hackData);
    // });

    this.setState({
      results: hackData.results,
      participants: hackData.registeredUsers,
    });

    let phaseResults = await getPhaseResults({
      hackResults: hackData.results,
      phase: phase,
    });

    console.log('phaseResults', phaseResults);

    let userPhaseResults = getUserPhaseResults({
      phaseResults: phaseResults,
      userId: this.props.hackUser.uid,
    });

    console.log('userPhaseResults', userPhaseResults);

    const endDate = DateFormater.getFirebaseDate(
      this.props.hackPhases[phase - 1].codingStartEnd
    )

    let userForumData = getUserForumData()

    console.log('userForumData', userForumData);


    this.setState({ loading: false });

    // const getResults = window.firebase.functions()
    //   .httpsCallable('getPhaseResults');
    //
    // getPhaseResults({
    //   phase,
    //   endDate: endDate.getTime(),
    //   userId: this.props.hackUser.uid,
    //   hackId: this.props.hackId,
    //   forumId: this.state.forumId,
    // }).then((response) => {
    //   console.log('response', response);
    //   const { userResults: results } = response.data;
    //   this.setState({
    //     results,
    //     loading: false,
    //     gettingResults: true,
    //   })
    // })
  }

  render() {
    return (
        <ThemeProvider theme={styles}>
          <SectionContainer>
            <div className='top-container'>
              {TreatmentTexts[this.state.treatment].header}
              {this.props.hackPhases && (
                <div>
                  <h3>Please select the phase you want to check.</h3>
                  <Timeline
                    phases={this.props.hackPhases}
                    initialPhase={1}
                    onClick={this.onPhaseSelection}
                    currentPhase={this.state.currentPhase}
                  />
                </div>
              )}

            <ResultsTabSelector
              callback={this.updateSection}
              />

            <div className='selected-section'>
              {this.state.loading && (
                <div className='results-loader'>
                  <Loader status='Fetching results...' />
                </div>
              )}
              {!this.state.loading
                && !this.state.results
                && (
                <h2 className='no-results'>
                  Not results for this phase yet.
                </h2>
              )}

              {this.state.results &&
                this.state.currentSection === 'competitors'
                && (
                    <div>
                      <ResultSectionCompetitors
                        hackName={this.props.hackData.name}
                        treatment={this.state.treatment}
                        participants={this.state.participants}
                        scores={this.state.results}
                        onLikedCompetitors={this.userSaveLikedCompetitors}
                      />
                    </div>
                )}

              {this.state.results &&
                this.state.currentSection === 'personal' && (
                  <PersonalScoreSection
                    userId={this.props.hackUser.uid}
                    hackId={this.props.hackId}
                    scores={this.state.results}
                    currentPhase={this.state.selectedPhase}
                  />
              )
            }


              </div>
            </div>
          </SectionContainer>
        </ThemeProvider>
      )
  }
}

export { ResultsView }
