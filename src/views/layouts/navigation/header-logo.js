import React from 'react';
import styled from 'styled-components';
import { NavButton } from './nav-button'


const IronHacksCenterLogo = styled('div')`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 24px;

  label {
    cursor: pointer;
    margin: 0;
  }
`;

const ironhacksLogoStyle = {
   flex: 1,
   textAlign: 'left',
   justifyContent: 'left',
   margin: 0,
   display: 'flex',
};


class HeaderLogo extends React.Component {
  constructor(props) {
    super(props);
    this.navMenuRef = props.navMenuref
  }

  render() {
    return (
      <IronHacksCenterLogo>
        <NavButton to='/hacks'>
          <label>IronHacks</label>
        </NavButton>
      </IronHacksCenterLogo>
    )
  }
}

export { HeaderLogo }
