// IronHacks Platform
// WhiteListItem.js - WhiteListItem
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';

//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';

const theme = Constants.FooterTheme;

const FooterContainer = styled('div')`
  background-color: ${Constants.mainBgColor}
  height: ${props => props.theme.containerHeight  + ";"};
`;

class WhiteListItem extends React.Component {
  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <FooterContainer className="container-fluid">
          <div className="row">
            <div className='col-12'></div>
          </div>
        </FooterContainer>
      </ThemeProvider>
    );
  }
}

export default WhiteListItem;