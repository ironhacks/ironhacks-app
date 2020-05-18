import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

class ThemedPageContainer extends React.Component {
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <div className={'page-container'}>
          {this.props.children}
        </div>
      </ThemeProvider>
    )
  }
}


class PageContainer extends React.Component {
  render() {
    return (
      <div className={'page-container'}>
      {this.props.children}
      </div>
    )
  }
}

class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.theme){
      return (
        <ThemedPageContainer theme={this.props.theme}>
          {this.props.children}
        </ThemedPageContainer>
      )
    } else {
      return (
        <PageContainer>
          {this.props.children}
        </PageContainer>
      )
    }
  }
}

export { Page }
