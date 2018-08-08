// IronHacks Platform
// threadPreview.js - Preview that will be displayed on the Forum section
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';

//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';

const theme = Constants.ThreadPreviewTheme;

const PreviewContainer = styled('div')`
  height: ${props => props.theme.containerHeight};
  border-radius: ${Constants.universalBorderRadious};
  background-color: ${props => props.theme.backgroundColor};
  margin-bottom: ${Constants.threadPreviewBottomMargin};
`;

class ThreadPreview extends React.Component {
  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <PreviewContainer className="container-fluid">
          <div className="row">
            <div className='col-12'></div>
          </div>
        </PreviewContainer>
      </ThemeProvider>
    );
  }
}

export default ThreadPreview;