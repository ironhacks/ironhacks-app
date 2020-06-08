import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Theme } from '../../theme';
import {Loader} from '../../components/loader';
import Examples from './lib/d3-examples';

// const colors = Theme.COLORS;
const styles = Theme.STYLES.AppSectionTheme;

const SectionContainer = styled('div')`
  width: 100%;
  minHeight: ${(props) => props.theme.containerHeight};
  background-color: ${(props) => props.theme.backgroundColor};
  overflow-y: auto;
  overflow-x: hidden;

  h1 {
    margin-bottom: 20px;

    &:first-child {
      margin-top: 150px;
    }
  }

  h2 {
    margin-top: 50px;
  }

  .padding {
    padding: 0 10%;
  }
`;

class ExamplesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  componentDidMount() {
    // if (!this.state.user.isAdmin) {
    //   this.getCurrentHackInfo();
    // }
  }


  render() {
    if (this.state.loading) {
      return (
        <ThemeProvider theme={styles}>
          <SectionContainer>
            <Loader status={this.state.status} />
          </SectionContainer>
        </ThemeProvider>
      );
    }

    return (
      <ThemeProvider theme={styles}>
        <SectionContainer>
          <Examples user={this.state.user}/>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default ExamplesPage;
