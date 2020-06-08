import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import { HackTutorial }  from './hack-tutorial';
import { Theme } from '../../theme';

const styles = Theme.STYLES.AppSectionTheme;
const colors = Theme.COLORS;

const SectionContainer = styled('div')`
  width: 100%;
  height: ${(props) => props.theme.containerHeight};
  background-color: ${(props) => props.theme.backgroundColor};
  overflow-y: scroll;

  .task-div {
    margin-top: 30px;

    h1, h2, h3, h4, h5 {
      color: ${colors.mainBgColor};
    }

    a {
      font-size: 13px;
    }
  }
`;


class TutorialView extends React.Component {
  render() {
    return (
      <ThemeProvider theme={styles}>
        <SectionContainer className='container-fluid'>
          <div className='row'>
            <div className='col-md-8 offset-md-2 task-div'>
              <HackTutorial tutorial={this.props.tutorial} />
            </div>
          </div>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default TutorialView
