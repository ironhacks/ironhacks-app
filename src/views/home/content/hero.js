import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import bulbImg from '../../../assets/svg/bulb.svg';
import { Theme } from '../../../theme';
const colors = Theme.COLORS;

const HomeTitle = styled('div')`
  width: 100%;
  height: 20%;
  padding: 0 35px;
  justify-content: center;
  align-items: center;
  position: relative;
  display: flex;
  top: 30%;

  img {
    width: auto;
    height: 200%;
  }
`;

const HomeText = styled('div')`
  width: 60%;
  height 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;

  h1 {
    font-size: 60px;
    font-weight: 900;
    line-height: 45px;
  }

  h1 span {
    font-weight: 300;
  }

  h2 {
    font-weight: 300;
  }

  @media (max-width: 1312px) {
    h1 {
      line-height: 50px;
    }
  }
`;

const LoginButton = styled(Link)`
  padding: 10px 10px;
  margin-right: 4px;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  color: black;
  background-color: none;
  border: 2px solid black;
  trasition: color: 0.5s;

  &:hover {
    background-color: ${(props) => props.theme.hoverTextColor};
    color: ${colors.invertedHighlightedTextColor};
    text-decoration: none;
  }
`;

export default class HeroSection extends React.Component {
  render() {
    return (
      <HomeTitle>
        <HomeText>
          <h1>
            <span>PURDUE </span>IRONHACKS
          </h1>
          <h2>Hack for innovation and join the open data movement.</h2>
          <div>
            <LoginButton to='/login?mode=select'>Sign up here now</LoginButton>
            <LoginButton to='/login'>Sign in</LoginButton>
          </div>
        </HomeText>
        <img src={bulbImg} alt='searchIcon' />
      </HomeTitle>
    );
  }
}
