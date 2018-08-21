// IronHacks Platform
// task.js - Task editor and visualizer
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
//Custom components
import MarkdownEditor from '../markdownEditor/markdownEditor.js';

const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
`;

class Task extends React.Component {
  
  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer>
          <MarkdownEditor/>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default Task;