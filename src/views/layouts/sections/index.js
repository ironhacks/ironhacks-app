import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {Theme} from '../../../theme';
import './styles.css';

// const colors = Theme.COLORS;
// const styles = Theme.STYLES.SectionStyles;

class SectionContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={['section', this.props.className].join(' ')}>
      {this.props.children}
      </div>
    );
  }
}

class ThemedSectionContainer extends React.Component {
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <SectionContainer>
          {this.props.children}
        </SectionContainer>
      </ThemeProvider>
    )
  }
}



class Section extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.theme){
      return (
        <ThemedSectionContainer theme={this.props.theme}>
          {this.props.children}
        </ThemedSectionContainer>
      )
    } else {
      return (
        <SectionContainer className={this.props.className}>
          {this.props.children}
        </SectionContainer>
      )
    }
  }
}





export { Section, SectionContainer, ThemedSectionContainer };
