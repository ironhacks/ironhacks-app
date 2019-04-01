// IronHacks Platform
// landing.js - Landing page
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Link } from 'react-router-dom';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
//Customs svg
import PriorHacksData from './priorHacksData.js';
import bulbImg from './img/bulb.svg';
import UNAL2019 from './img/purdue-UNAL-2019.jpeg';
import COLFlag from './img/flags/col.svg';

const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  
  padding: 65px 200px 65px 200px;

  &:nth-child(odd) {
    background-color: ${Constants.mainBgColor};
  }

  &.full-hight {
    height: 100vh;
  }

  &.FAQ {
    display: flex;
    justify-content: space-between;
    height: 500px;
    min-height: 700px;
    padding: 65px 200px 65px 200px;
    text-align: center;

    div {
      width: 30%;
    }

    h2 {
      margin-top: 50px;
    }

    i {
      color: white;
      font-size: 10em;
      line-height: 220px;
      height: 220px;
      width: 220px;
      background-color: #FFCE35;
      border-radius: 110px;
      margin-bottom: 15px;
    }
  }

  &.about {
    display: flex;
    justify-content: center;

    h2 {
      margin-top: 50px;
    }
  }
`;

const HomeTitle = styled('div')`
  width: 100%;
  height: 20%;
  padding: 0 35px;
  justify-content: center;
  align-items: center;
  position: relative;
  display: flex;
  top: 30%;

  img { 
    width: auto;
    height: 200%;
  }
`;

const HomeText = styled('div')`
  width: 60%;
  height 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;

  h1 {  
    font-size: 60px;
    font-weight: 900;
    line-height: 45px;
  }

  h1 span {
    font-weight: 300;
  }

  h2 {
    font-weight: 300;
  }

  @media (max-width: 1312px) {
    h1 {
      line-height: 50px;
    }
  }
`;

const LoginButton = styled(Link)`
  padding: 10px 10px;
  margin-right: 4px;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  color: black;
  background-color: none;
  border: 2px solid black;
  trasition: color: 0.5s;

  &:hover {
    background-color: ${props => props.theme.hoverTextColor};
    color: ${Constants.invertedHighlightedTextColor};
    text-decoration: none;
  }
`;

const Separator = styled('div')`
  width: 100%;
  height: 1px;
  background-color: ${Constants.mainBgColor};
`;

const HackSelector = styled('div')`
  display: flex;
  justify-content: center;
  height: 40px;
  width: 100%;
  margin: 25px 0;

  button {
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: transparent;
    margin-right: 10px;
    font-weight: 700;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      background-color: lightgray;
    }

    &:disabled {
      cursor: inherit;
      color: black;
    }

    &.selected {
      background-color: #fff1c7;
    }

  }

`;

const HackCard = styled('div')`
  display: flex;
  height: 400px;
  width: 100%;
  border-radius: 4px;
  margin-top: 50px;

  div {
    height: 100%;
    width: 50%;
    padding: 25px;

    img {
      object-fit: contain;
      height: 100%;
      width: 100%;
    }
  }
`;

const Table = styled('table')`
  border-collapse: collapse;
  border-radius: 1em;
  overflow: hidden;
  width: 100%;
  
  thead {
    background-color: #FFD75F;
  }

  tr {
    position: relative;
    height: 60px;

    :nth-child(even) {
      background-color: #fff1c7;
    }

    td, th {
      text-align: center;
    
      img {
        width: 30px;
        height: 30px;
      }

      a {
        padding: 10px;
        font-weight: 700;
        color: white;
        background-color: #e6b92f;
        border-radius: 4px;
      }
    }
  }
`;

class Landing extends React.Component {
  constructor(props) {
    super(props)
    const selectedHack = PriorHacksData.length - 1;
    this.state = {
      selectedHack,
    }
  }

  changeHack = (event) => {
    this.setState({selectedHack: parseInt(event.target.id)})
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
      <React.Fragment>
        <SectionContainer className='full-hight'>
          <HomeTitle>
            <HomeText>
              <h1><span>PURDUE </span>IRONHACKS</h1>
              <h2>Hack for innovation and join the open data movement.</h2>
              <div>
                <LoginButton to='/login?mode=select'>Sign up here now</LoginButton>
                <LoginButton to='/login'>Sign in</LoginButton>
              </div>
            </HomeText>
            <img src={bulbImg} alt='searchIcon'/>
          </HomeTitle>
        </SectionContainer>
        <SectionContainer className='FAQ'>
          <div>
            <i className="zmdi zmdi-comments"></i>
            <h3>WHY SHOULD I PARTICIPATE?</h3>
            <p>In IronHacks, you learn new skills, win prizes ($$$), get exposed to tech organizations, and win internships. Most importantly, you become part of a global movement of open data to make an impact in areas such as safety, health, or travel.</p>
          </div>
          <div>
            <i className="zmdi zmdi-settings"></i>
            <h3>WHAT IS IRONHACKS?</h3>
            <p>IronHacks is a unique one month, 5-stage innovative hacking program for individuals who want to create impact from open data. During the iterative hacking process, you will learn new skills, have the chance to learn from others, and receive feedback from IronHacks experts! Turn your ideas into web apps that make data actionable and useful!</p>
          </div>
          <div>
              <i className="zmdi zmdi-accounts"></i>
            <h3>HOW CAN I GET INVOLVED?</h3>
            <p>There are many ways to get involved: As hack participants, as industry sponsor, or as researcher. To learn more about upcoming hacks, please send an email to opendigital@purdue.edu.</p>
          </div>
        </SectionContainer>
        <SectionContainer className='about' id='about'>
          <div>
            <p>IronHacks is an open data hacking program that combines experiential learning with real-world data-driven problem solving. During a 5-stage virtual competition, students utilize open data to create novel and useful interactive visualizations and analytic “apps” that solve civic challenges.</p>
            
          </div>
          <div>
             <img src="" alt=""/>
          </div>
        </SectionContainer>
        <SectionContainer className='ranking' id='ranking'>
          <h1>Prior Hacks</h1>
          <Separator/>
          <HackSelector>
            {PriorHacksData.map((hack, i) => {
              if(this.state.selectedHack === (i)) 
              return <button className='selected' disabled id={i} key={i}>{hack.name}</button>
              return <button onClick={this.changeHack} id={i} key={i}>{hack.name}</button>
            })}
          </HackSelector>
          <HackCard>
            <div>
              <h2>{PriorHacksData[this.state.selectedHack].name}</h2>
              <p>{PriorHacksData[this.state.selectedHack].description}</p>
            </div>
            <div>
              <img src={UNAL2019} alt="unal_2019"/>
            </div>
          </HackCard>
          <h2>Ranks:</h2>
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>Hacker Name</th>
                <th>Place</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {PriorHacksData[this.state.selectedHack].ranks.map((winner) => (
                <tr key={winner.name + winner.contact}>
                  <td><img src={COLFlag} alt="col-flag"/></td>
                  <td>{winner.name}</td>
                  <td>{winner.place}</td>
                  <td>{winner.contact}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </SectionContainer>
        <SectionContainer className='FAQ'>
          <div>
            <i className="zmdi zmdi-comments"></i>
            <h3>WHY SHOULD I PARTICIPATE?</h3>
            <p>In IronHacks, you learn new skills, win prizes ($$$), get exposed to tech organizations, and win internships. Most importantly, you become part of a global movement of open data to make an impact in areas such as safety, health, or travel.</p>
          </div>
          <div>
            <i className="zmdi zmdi-settings"></i>
            <h3>WHAT IS IRONHACKS?</h3>
            <p>IronHacks is a unique one month, 5-stage innovative hacking program for individuals who want to create impact from open data. During the iterative hacking process, you will learn new skills, have the chance to learn from others, and receive feedback from IronHacks experts! Turn your ideas into web apps that make data actionable and useful!</p>
          </div>
          <div>
              <i className="zmdi zmdi-accounts"></i>
            <h3>HOW CAN I GET INVOLVED?</h3>
            <p>There are many ways to get involved: As hack participants, as industry sponsor, or as researcher. To learn more about upcoming hacks, please send an email to opendigital@purdue.edu.</p>
          </div>
        </SectionContainer>
      </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default Landing;