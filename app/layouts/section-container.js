import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {Theme} from '../theme';
const colors = Theme.COLORS;
const styles = Theme.STYLES.SectionStyles;

const SectionDiv = styled('div')`
  width: 100%;
  height: ${(props) => props.styles.containerHeight};
  background-color: ${(props) => props.styles.backgroundColor};
  overflow: auto;

  .tutorial-div {
    margin-top: 30px;

    h1, h2, h3, h4, h5 {
      color: ${colors.mainBgColor};
    }

    a {
      font-size: 13px;
    }
  }
`;


class SectionContainer extends React.Component {
  render() {
    return (
      <ThemeProvider theme={styles}>
        <SectionDiv className='container-fluid'>
          <div className='row'>
            <div className='col-md-8 offset-md-2 tutorial-div'>
              {this.props.children}
            </div>
          </div>
        </SectionDiv>
      </ThemeProvider>
    );
  }
}

export {SectionContainer};
