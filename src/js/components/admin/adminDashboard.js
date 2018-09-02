// IronHacks Platform
// results.js - Results Component
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Router
import { Link, Switch, Route, Redirect} from "react-router-dom";
//Custom controllers
import TutorialSection from './sections/admTutorialSection.js';
//Custom Constants
import * as Constants from '../../../constants.js';
//Image references
import HouseIcon from './img/house-black-icon.svg';
import SettingsIcon from './img/settings-icon.svg';

const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};

  .container-fuild {
    padding: 0;
  }
`;
const ControlPanel = styled('div')`
  height ${props => props.theme.containerHeight}; 
  border-right: 1px solid black;
`;
const ControlPanelItem = styled('div')`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  padding-left: 15px;
  transition: color 0.5s, background-color 0.5s;

  &:hover {
    background-color: gray;
    color: ${Constants.mainBgColor};
  }

  &:first-child {
    margin-top: 70px;
    border-top: 1px solid black;
    justify-content: space-around;
  }

  img {
    width: 25px;
    height: 25px;

    &:first-child {
      margin-right: 10px;
    }

    &:last-child {
      margin-left: 10px;
    }
  }
`;
const VerticalSeparator = styled('div')`
  width: 2px;
  height: 25px;
  background-color: black;
`;
const SectionHeader = styled('div')`
  height: 140px;
  border-bottom: 1px solid black;
`;
const SectionBody = styled('div')`
  height: 704px;
  overflow: auto;
`;

class AdminDashboard extends React.Component {
  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer className='container-fuild'>
          <div className='row no-gutters'>
            <ControlPanel className='col-md-2'>
              <ControlPanelItem >
                <img src={HouseIcon} alt='Home'/>
                <span>Proyect Overview </span>
                <VerticalSeparator/>
                <img src={SettingsIcon} alt='Settings'/>                  
              </ControlPanelItem>
              <ControlPanelItem>
                <span>Stats</span>
              </ControlPanelItem>
              <ControlPanelItem>
                <span>Forums</span>
              </ControlPanelItem>
              <ControlPanelItem>
                <span>Qualtrics Integration</span>
              </ControlPanelItem>
              <ControlPanelItem>
                <Link to={'admin/tutorial'}>Tutorial</Link>
              </ControlPanelItem>
              <ControlPanelItem>
                <span>Taks</span>
              </ControlPanelItem>
            </ControlPanel>
            <div className='col-md-10'>
              <div className='row no-gutters'>
                <SectionHeader className='col-md-12'>
                </SectionHeader>
              </div>
              <div className='row no-gutters'>
                <SectionBody className='col-md-12'>
                  <Switch>
                    <Route path="/admin/tutorial" component={TutorialSection}/>
                  </Switch>
                </SectionBody>
              </div>
            </div>
          </div>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default AdminDashboard;