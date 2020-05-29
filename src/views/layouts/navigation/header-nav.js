import React from 'react';
import { NavButton } from '../../../components/buttons/nav-button'
import { NavContainerDiv } from './nav-container'
import menuIcon from '../../../assets/svg/menu-icon.svg';

class HeaderNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: 'none',
    };

    this.navMenuRef = props.navMenuref
  }

  hideMenu = (event) => {
    this.setState({
      showMenu: 'none',
    });
  };

  showMenu = () => {
    if (this.state.showMenu === 'none') {
      this.setState({ showMenu: 'flex' });
    } else {
      this.setState({ showMenu: 'none' });
    }
    ;
  };

  render() {
    return (
      <NavContainerDiv
        display={this.state.showMenu}
        innerRef={this.navMenuRef}
      >

        <button onClick={this.showMenu}>
          <img src={menuIcon} alt='menu_icon' />
        </button>

        {/*<div className='links-container'>
        </div>*/}
      </NavContainerDiv>
    )
  }
}
export { HeaderNav }
