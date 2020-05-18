import React from 'react';
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import styled, { ThemeProvider } from 'styled-components';
import Separator from '../../util/separator.js';
import { Theme } from '../../theme';
import {Loader} from '../../components/loader';
import Examples from './lib/d3-examples';

// const colors = Theme.COLORS;
const styles = Theme.STYLES.AppSectionTheme;

const SectionContainer = styled('div')`
  width: 100%;
  minHeight: ${(props) => props.theme.containerHeight};
  background-color: ${(props) => props.theme.backgroundColor};
  overflow-y: auto;
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

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = props;

    this.state = {
      currentHack: cookies.get('currentHack') || null,
      forum: cookies.get('currentForum') || null,
      startNewProjecNav: false,
      startProjectEditorNav: false,
      hackData: null,
      user: this.props.user,
    };

    if (this.props.location.state) {
      this.state.user = this.props.location.state.user;
    }

    this.firestore = window.firebase.firestore();
  }

  componentDidMount() {
    if (!this.state.user.isAdmin) {
      this.getCurrentHackInfo();
    }
  }

  goToProjectEditor = (index) => {
    this.setState({
      selectedProject: index,
      navigateToProject: true,
    });
  };


  onPhaseSelection = (phase) => {};

  render() {
    if (this.state.loading) {
      return (
        <ThemeProvider theme={styles}>
          <SectionContainer>
            <Loader status={this.state.status} />
          </SectionContainer>
        </ThemeProvider>
      );
    }

    if (this.state.navigateToProject === true) {
      return (
        <Redirect
          push
          to={`projectEditor/${
            this.state.projects[this.state.selectedProject].name
          }`}
        />
      );
    }
    if (this.state.navigateToCreatedProject === true) {
      return (
        <Redirect push to={`projectEditor/${this.state.newProjectName}`} />
      );
    }
    return (
      <ThemeProvider theme={styles}>
        <SectionContainer>
          <div>
            <h2 className='padding'>D3.js Examples</h2>
            <h2 className='padding'>Projects</h2>
            <span className='padding'>
            Bellow you will find the current hack status. You can also manage
            your projects from here.
            </span>
          </div>
          <Examples user={this.state.user}/>
          <Separator primary className='padding' />

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
