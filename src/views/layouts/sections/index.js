import React from 'react';
import {ThemeProvider} from 'styled-components';
import '../../../assets/static/bootstrap-reboot.css';
import '../../../assets/static/bootstrap-grid.css';
import '../../../assets/main.css';
import './assets/styles.css';

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
