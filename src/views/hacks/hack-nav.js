import React from 'react';
import { NavButton } from '../../components/buttons/nav-button'
import { NavContainerDiv } from '../../components/navigation/nav-container'
import menuIcon from '../../assets/svg/menu-icon.svg';

class HackNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: 'none',
    };

    this.navMenuRef = props.navMenuref
    this.updateHackNav = this.updateHackNav.bind(this)
  }

  hideMenu(event) {
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

  onClick() {
    if (this.props.onClick) {
      this.props.onClick()
    }
  }

  updateHackNav(target) {
    this.hideMenu(target)
    console.log('click', this, target);
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
          <NavButton to='quizzes' onClick={()=>this.updateHackNav('quizzes')}>
            Quizzes
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
