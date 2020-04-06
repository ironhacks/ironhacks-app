import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import githubLogo from '../../assets/banner-logos/github.jpg';
import nsfLogo from '../../assets/banner-logos/nsf.jpg';
import redhatLogo from '../../assets/banner-logos/red-hat.jpg';
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
      <ThemeProvider theme={styles}>
        <BannerContainer>
          <a href='https://github.com' rel='noopener noreferrer'>
            <img src={githubLogo} alt='githubLogo' />
          </a>
          <a href='https://www.nsf.gov' rel='noopener noreferrer'>
            <img src={nsfLogo} alt='nsfLogo' />
          </a>
          <a href='https://www.redhat.com/en' rel='noopener noreferrer'>
            <img src={redhatLogo} alt='redHatLogo' />
          </a>
          <a href='https://socrata.com/' rel='noopener noreferrer'>
            <img src={socrataLogo} alt='socrataLogo' />
          </a>
          <a href='https://www.technexus.com/' rel='noopener noreferrer'>
            <img src={techNexusLogo} alt='techNexusLogo' />
          </a>
          <a href='http://unal.edu.co/' rel='noopener noreferrer'>
            <img src={UNALLogo} alt='UNALLogo' />
          </a>
          <a href='https://www.purdue.edu/' rel='noopener noreferrer'>
            <img src={PurdueLogo} alt='PurdueLogo' />
          </a>
        </BannerContainer>
      </ThemeProvider>
    );
  }
}

export default SponsorsBanner;
