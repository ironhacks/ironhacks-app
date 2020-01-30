// IronHacks Platform
// footer.js - Footer
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';

//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';

const theme = Constants.FooterTheme;

const FooterContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: ${props => props.theme.containerHeight};
  width: 100%;
  background-color: ${Constants.mainBgColor}

  span {
    font-size: 12px;
    
    &:first-child {
      text-align: left;
    }

    &:last-child {
      line-height: 12px;
      font-weight: 700;
      text-align: right;
    }
  }
`;

class Footer extends React.Component {
  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <FooterContainer>
          <span>Version 2.0.1</span>
          <span>RESEARCH CENTER FOR OPEN DIGITAL INNOVATION | RCODI<br/>
            All rigths reserved IronHacks&#169; 2019
          </span>
        </FooterContainer>
      </ThemeProvider>
    );
  }
}

export default Footer;