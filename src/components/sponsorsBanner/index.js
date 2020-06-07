import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import githubLogo from '../../assets/banner-logos/github.jpg';
import nsfLogo from '../../assets/banner-logos/nsf.jpg';
import westLafayetteCityLogo from '../../assets/banner-logos/city-west-lafayette-logo.png';
import redhatLogo from '../../assets/banner-logos/red-hat.jpg';
import cuplLogo from '../../assets/banner-logos/cupl-logo.png';
import nihLogo from '../../assets/banner-logos/nih.png';
import matchboxLogo from '../../assets/banner-logos/match-box.png';
import mphLogo from '../../assets/banner-logos/mph-logo.png';
import socrataLogo from '../../assets/banner-logos/socrata.png';
import techNexusLogo from '../../assets/banner-logos/tech-nexus-logo.png';
import UNALLogo from '../../assets/banner-logos/universidad-nacional-de-colombia.png';
import PurdueLogo from '../../assets/banner-logos/purdue-sig-black-gold.png';

import { Theme } from '../../theme';

const styles = Theme.STYLES.SponsorBannerTheme;

const BannerContainer = styled('div')`
  min-height: ${(props) => props.theme.containerHeight};
  background-color: ${(props) => props.theme.backgroundColor};
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
        <BannerContainer>
          <a href='https://github.com' rel='noopener noreferrer'>
            <img src={githubLogo} alt='github Logo' />
          </a>

          <a href='https://www.nsf.gov' rel='noopener noreferrer'>
            <img src={nsfLogo} alt='nsf Logo' />
          </a>

          <a href='https://www.nih.gov' rel='noopener noreferrer'>
            <img src={nihLogo} alt='NIH Logo' />
          </a>

          <a href='https://www.redhat.com/en' rel='noopener noreferrer'>
            <img src={redhatLogo} alt='redHat Logo' />
          </a>

          <a href='https://matchboxstudio.org' rel='noopener noreferrer'>
            <img src={matchboxLogo} alt='MatchBOX Logo' />
          </a>

          <a href='https://socrata.com/' rel='noopener noreferrer'>
            <img src={socrataLogo} alt='socrata Logo' />
          </a>

          <a href='http://www.cupl.edu.cn' rel='noopener noreferrer'>
            <img src={cuplLogo} alt='CUPL Logo' />
          </a>

          <a href='https://www.in.gov/mph' rel='noopener noreferrer'>
            <img src={mphLogo} alt='MPH Logo' />
          </a>

          <a href='https://www.technexus.com/' rel='noopener noreferrer'>
            <img src={techNexusLogo} alt='techNexus Logo' />
          </a>

          <a href='https://www.westlafayette.in.gov' rel='noopener noreferrer'>
            <img src={westLafayetteCityLogo} alt='West Lafayette Logo' />
          </a>

          <a href='http://unal.edu.co/' rel='noopener noreferrer'>
            <img src={UNALLogo} alt='UNAL Logo' />
          </a>

          <a href='https://www.purdue.edu/' rel='noopener noreferrer'>
            <img src={PurdueLogo} alt='Purdue Logo' />
          </a>
        </BannerContainer>
    )
  }
}

export default SponsorsBanner;
