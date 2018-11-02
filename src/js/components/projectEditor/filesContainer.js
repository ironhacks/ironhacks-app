// IronHacks Platform
// filesContainer.js - 
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';

//Section container
const MainContainer = styled('div')`
  width: 100%;
  min-height: 200px;
  max-height: 500px;
  background-color: ${props => props.backgroundColor ? props.backgroundColor : Constants.projectEditorBgColor};
  display: flex;
  flex-direction: column;
`;

class FilesContainer extends React.Component {

  onFileClick = (name) => {
    this.props.onClick(name)
  }

  render() {
    return(
      <MainContainer>
        {Object.keys(this.props.files).map((file, i) => {
          const path = file.split('/')
          const name = path[path.length -1]
          return <button key={name} onClick={() => this.onFileClick(file)}>{name}</button>;
        })}
      </MainContainer>
    )
  }
}

export default FilesContainer;