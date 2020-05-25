import React from 'react';
import { NavButton } from './nav-button'
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
        <div className='links-container'>
          <NavButton to='/forum' onClick={this.hideMenu}>
            Forum
          </NavButton>
          <span> | </span>
          <NavButton to='/tutorial' onClick={this.hideMenu}>
            Tutorial
          </NavButton>
          <span> | </span>
          <NavButton to='/examples' onClick={this.hideMenu}>
            Examples
          </NavButton>
          <span> | </span>
          <NavButton to='/quizzes' onClick={this.hideMenu}>
            Quizzes
          </NavButton>
          <span> | </span>
          <NavButton to='/projects' onClick={this.hideMenu}>
            Projects
          </NavButton>
          <span> | </span>
          <NavButton to='/task' onClick={this.hideMenu}>
            Task
          </NavButton>
          <span> | </span>
          <NavButton to='/results' onClick={this.hideMenu}>
            Results
          </NavButton>
        </div>
      </NavContainerDiv>
    )
  }
}
export { HeaderNav }
