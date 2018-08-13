// IronHacks Platform
// tagView.js -
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';

//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';

const theme = Constants.ReactionsViewTheme;
//Tag displayer

const Tag = styled('div')`
  height: 30px;
  border-radius: ${Constants.universalBorderRadius + ";"};
  background-color: ${props => props.theme.backgroundColor};
  display: flex;
  align-items: center;
  padding: 0 10px 0 10px;
`;

class TagView extends React.Component {
  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Tag>
        <span>Tech</span>
        </Tag>
      </ThemeProvider>
    );
  }
}

export default TagView;