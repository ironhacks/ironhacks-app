// IronHacks Platform
// results.js - Results Component
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { withCookies } from 'react-cookie';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
import { texts } from './staticTexts.js';
//Custom Constants
import * as Constants from '../../../constants.js';

const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  padding: 20px 10%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
  overflow: auto;

  .tutorial-div {
    margin-top: 30px;

    h1, h2, h3, h4, h5 {
      color: ${Constants.mainBgColor};
    }

    a {
      font-size: 13px;
    }
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
      hackName: '',
      currentHack: cookies.get('currentHack') || null,
      forum: cookies.get('currentForum') || null,
      user,
      treatement: 1,
    }
  }


  render() {
    
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer>
          <h1>Welcome to your dashboard</h1>
          {texts[this.state.treatement].header}
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default withCookies(Results);