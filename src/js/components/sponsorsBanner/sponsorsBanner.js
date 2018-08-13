// IronHacks Platform
// sponsorBanner.js - The sponsor banner is the placer where the sponsor's logos are displayed. It apppears on the forum and the profile view.
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';

//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
//Importing logos
import githubLogo from './img/github.jpg';
import nsfLogo from './img/nsf.jpg';
import redhatLogo from './img/red-hat.jpg';
import socrataLogo from './img/socrata.png';
import techNexusLogo from './img/tech-nexus-logo.png';
import UNALLogo from './img/universidad-nacional-de-colombia.png';
import PurdueLogo from './img/purdue-sig-black-gold.png'

const theme = Constants.SponsorBannerTheme;

const BannerContainer = styled('div')`
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
`;

class SponsorsBanner extends React.Component {
  
  render() {
    return (
      <ThemeProvider theme={theme}>
            <BannerContainer>
              <img src={githubLogo}/>
              <img src={nsfLogo}/>
              <img src={redhatLogo}/>
              <img src={socrataLogo}/>
              <img src={techNexusLogo}/>
              <img src={UNALLogo}/>
              <img src={PurdueLogo}/>
            </BannerContainer>
      </ThemeProvider>
    );
  }
}

export default SponsorsBanner;