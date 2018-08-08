// IronHacks Platform
// forum.js - forum main Component
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Components
import ThreadPreview from './threadPreview.js'
//Custom Constants
import * as Constants from '../../../constants.js';
//Image references
import searchIcon from './img/searchIcon.svg'

const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
`;
//Header
const MainHeader = styled('h1')`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 40px;
  font-weight: 800;
`;
//Controls
const Control = styled('div')`
  height: 30px;
  margin-bottom: 25px;
`;
//New thread button
const NewThreadButton = styled('button')`
  height: 30px;
  font-weight: 700;
  padding-left: 10px;
  padding-right: 10px;
  border: none;
  border-radius: ${Constants.universalBorderRadious}
  background-color: ${Constants.mainBgColor};
`;
//SearchBar Container
const SearchBar = styled('form')`
  height: 30px;
  display: flex;
  justify-content: flex-end;

  input {
    width: 60%;
    height: 100%;
    background-color: #F2F2F2;
    border: 1px solid #999999;
    border-right: none; 
    border-radius: ${Constants.universalBorderRadious} 0px 0px ${Constants.universalBorderRadious};
    padding-left: 10px;
  }

  button {
    height: 100%;
    background-color: #F2F2F2;
    border: 1px solid #999999;
    border-left: none;
    border-radius: 0px ${Constants.universalBorderRadious} ${Constants.universalBorderRadious} 0px;
    padding-left: 10px;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;
//Holder
const ForumThreads = styled('div')`
  margin-bottom 10px;
  overflow: auto;
`;
//ForumHeader
const ForumHeader = styled('div')`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-top: 5px;
  margin-bottom: ${Constants.threadPreviewBottomMargin};
  background-color: ${Constants.forumHeaderColor}
  border-radius: ${Constants.universalBorderRadious}
`;
//Section separator
const SectionSeparator = styled('div')`
  background-color: ${Constants.mainBgColor}
  height: 2px;
  width 100%;
  margin-top: calc(${Constants.threadPreviewBottomMargin} + 10px);
  margin-bottom: calc(${Constants.threadPreviewBottomMargin} + 10px);
`;
//TODO: Move this componet to a single reusable file
const Sponsors = styled('div')`
  height: 150px;
  background-color: gray;
`;


class Forum extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer className='container-fluid d-flex flex-column'>
          <div className="row">
            <div className='col-12'>
            	<MainHeader>Purdue Unal Fall 2018</MainHeader>
            </div>
          </div>
          <Control className="row">
            <div className='col-4 offset-2'>
              <NewThreadButton>Create a new thread</NewThreadButton>
            </div>
            <SearchBar className='col-4'>
              <input type='text' placeholder='Search...'></input>
              <button><img src={searchIcon} alt='searchIcon'/></button>
            </SearchBar>
          </Control>
          <div className="row flex-grow-1">
            <ForumThreads className='col-8 offset-2'>
              <ForumHeader><h2>Pinned</h2></ForumHeader>
              <ThreadPreview/>
              <SectionSeparator/>
              <ForumHeader><h2>General discussion</h2></ForumHeader>
              <ThreadPreview/>
              <ThreadPreview/>
            </ForumThreads>
          </div>
          <div className="row">
            <Sponsors className='col-8 offset-2'>
            </Sponsors>
          </div>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default Forum;