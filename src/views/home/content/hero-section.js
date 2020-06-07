import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from '../../../components/layout'
import { SvgImg } from '../../../components/svg'
import { Theme } from '../../../theme';
import { BulbSvg } from '../../../components/svg/jsx'
import styled from 'styled-components'

const colors = Theme.COLORS;

const LoginButton = styled(Link)`
  padding: 10px 10px;
  margin-right: 4px;
  margin-top: 1em;
  text-align: center;
  text-decoration: none;
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

class HeroSection extends React.Component {
  render() {
    return (
      <Row flex={true} rowClass={'py-2 fs-2 flex-align-center'}>

        <Col colClass='flex-1'>
          <h1 className={'h1 site-title'}>
            <span className="font-light">PURDUE </span>
            <span className="font-extrabold">IRONHACKS</span>
          </h1>
          <h2 className="mb-3 mt-1">Hack for innovation and join the open data movement.</h2>
          <LoginButton to='/login?mode=select'>Sign up here now</LoginButton>
          <LoginButton to='/login'>Sign in</LoginButton>
        </Col>

        <Col colClass='flex-1'>
          <SvgImg
            containerClass=""
            imgClass={''}
            imgComponent={BulbSvg}
          />
        </Col>
      </Row>
    );
  }
}

export { HeroSection }
