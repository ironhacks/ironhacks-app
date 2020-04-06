import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Theme } from '../../../theme';

const colors = Theme.COLORS;
const styles = Theme.STYLES.FooterTheme;

const FooterContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: ${(props) => props.theme.containerHeight};
  width: 100%;
  background-color: ${colors.mainBgColor} span {
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
      <ThemeProvider theme={styles}>
        <FooterContainer>
          <span>Version 2.0.1</span>
          <span>
            RESEARCH CENTER FOR OPEN DIGITAL INNOVATION | RCODI
            <br />
            All rigths reserved IronHacks&#169; 2019
          </span>
        </FooterContainer>
      </ThemeProvider>
    );
  }
}

export { Footer }
