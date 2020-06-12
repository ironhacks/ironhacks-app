import React from 'react';
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
import unalLogo from '../../assets/banner-logos/universidad-nacional-de-colombia.png';
import purdueLogo from '../../assets/banner-logos/purdue-sig-black-gold.png';
import './style.css';

class SponsorsBanner extends React.Component {
  render() {
    return (
        <div className="sponsor_banner">
          <a href='https://github.com' rel='noopener noreferrer'>
            <img className="sponsor_logo" src={githubLogo} alt='github Logo' />
          </a>

          <a href='https://www.nsf.gov' rel='noopener noreferrer'>
            <img className="sponsor_logo" src={nsfLogo} alt='nsf Logo' />
          </a>

          <a href='https://www.nih.gov' rel='noopener noreferrer'>
            <img className="sponsor_logo" src={nihLogo} alt='NIH Logo' />
          </a>

          <a href='https://www.redhat.com/en' rel='noopener noreferrer'>
            <img className="sponsor_logo" src={redhatLogo} alt='redHat Logo' />
          </a>

          <a href='https://matchboxstudio.org' rel='noopener noreferrer'>
            <img className="sponsor_logo" src={matchboxLogo} alt='MatchBOX Logo' />
          </a>

          <a href='https://socrata.com/' rel='noopener noreferrer'>
            <img className="sponsor_logo" src={socrataLogo} alt='socrata Logo' />
          </a>

          <a href='http://www.cupl.edu.cn' rel='noopener noreferrer'>
            <img className="sponsor_logo" src={cuplLogo} alt='CUPL Logo' />
          </a>

          <a href='https://www.in.gov/mph' rel='noopener noreferrer'>
            <img className="sponsor_logo" src={mphLogo} alt='MPH Logo' />
          </a>

          <a href='https://www.technexus.com/' rel='noopener noreferrer'>
            <img className="sponsor_logo" src={techNexusLogo} alt='techNexus Logo' />
          </a>

          <a href='https://www.westlafayette.in.gov' rel='noopener noreferrer'>
            <img className="sponsor_logo" src={westLafayetteCityLogo} alt='West Lafayette Logo' />
          </a>

          <a href='http://unal.edu.co/' rel='noopener noreferrer'>
            <img className="sponsor_logo" src={unalLogo} alt='UNAL Logo' />
          </a>

          <a href='https://www.purdue.edu/' rel='noopener noreferrer'>
            <img className="sponsor_logo" src={purdueLogo} alt='Purdue Logo' />
          </a>
        </div>
    )
  }
}

export default SponsorsBanner;
