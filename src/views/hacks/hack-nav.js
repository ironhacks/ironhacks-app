import React from 'react';
import { NavContainerDiv } from '../../components/navigation/nav-container'
import menuIcon from '../../assets/svg/menu-icon.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavButton = styled(Link)`
  color: ${(props) => props.theme.textColor};
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  font-weight: 800;
  font-size: 15px;
  display: inline-block;
  transition: color 0.3s, background-color 0.3s;

  &:hover {
    text-decoration: none;
    color: ${(props) => props.theme.hoverTextColor};
  }
`;

class HackNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: 'none',
      currentView: 'task',
    };

    this.navMenuRef = props.navMenuref
    this.updateHackNav = this.updateHackNav.bind(this)
  }

  hideMenu(event) {
    this.setState({
      showMenu: 'none',
    });
  };

  showMenu() {
    if (this.state.showMenu === 'none') {
      this.setState({ showMenu: 'flex' });
    } else {
      this.setState({ showMenu: 'none' });
    }
  }

  onClick(event) {
    if (this.props.onClick) {
      this.props.onClick(event)
    }
  }

  updateHackNav(target) {
    this.hideMenu(target)
    this.setState({'currentView': target});
    if (this.props.action) {
      this.props.action(target);
    }
  }

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
          <NavButton to='task' id={'task'} onClick={()=>this.updateHackNav('task')}>
            Task
          </NavButton>

          <span> | </span>

          <NavButton to='forum' id={'forum'} onClick={()=>this.updateHackNav('forum')}>
            Forum
          </NavButton>

          <span> | </span>

          <NavButton to='tutorial' onClick={()=>this.updateHackNav('tutorial')}>
            Tutorial
          </NavButton>

          <span> | </span>

          <NavButton to='examples' onClick={()=>this.updateHackNav('examples')}>
            Examples
          </NavButton>

          <span> | </span>

          <NavButton to='quiz' onClick={()=>this.updateHackNav('quizzes')}>
            Quiz
          </NavButton>

          <span> | </span>

          <NavButton to='projects' onClick={()=>this.updateHackNav('projects')}>
            Projects
          </NavButton>

          <span> | </span>

          <NavButton to='results' onClick={()=>this.updateHackNav('results')}>
            Results
          </NavButton>
        </div>
      </NavContainerDiv>
    )
  }
}

export { HackNav }
