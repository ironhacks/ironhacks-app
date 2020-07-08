import React from 'react';
import { Link } from 'react-router-dom';
import { NavContainerDiv } from './nav-container'
import { upperCaseWord } from '../../util/string-utils';
import menuIcon from '../../assets/svg/menu-icon.svg';


class HackNavItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link
        className={`hack_nav__item ${this.props.navClass}`}
        to={`/hacks/${this.props.hackId}/${this.props.navId.toLowerCase()}`}
        onClick={this.props.action}
      >
        {upperCaseWord(this.props.name)}
      </Link>
    )
  }
}

HackNavItem.defaultProps = {
  navClass: '',
}

class HackNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: 'none',
      currentView: 'task',
    };
    // this.navItems = [
    //   {id: 'task', name: 'Task'},
    //   {id: 'forum', name: 'Forum'},
    //   {id: 'tutorial', name: 'Tutorial'},
    //   {id: 'quiz', name: 'Quiz'},
    //   {id: 'projects', name: 'Projects'},
    //   {id: 'results', name: 'Results'},
    // ];

    this.baseUrl = `/hacks/${this.props.hackId}`;
    this.navMenuRef = props.navMenuref;
    this.updateHackNav = this.updateHackNav.bind(this);
    this.getNav = this.getNav.bind(this);
  }

  componentDidMount() {
    console.log('mounted');
  }

  getNav(items){
    if (!items) {
      return [];
    }

    let display = Object.keys(items).filter((item)=>{
      return items[item];
    });

    let sorted = display.sort((a,b)=>{ return a.localeCompare(b) })

    console.log('display', sorted);

    const navItems = display.map((item)=>{
      return {
        id: item.replace('Enabled', ''),
        name: item.replace('Enabled', ''),
      }
    });

    return navItems;
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
    this.setState({currentView: target});
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

        <div className='hack_nav links-container'>
          {this.getNav(this.props.hackDisplayOptions).map((item, index)=>(
            <HackNavItem
              key={index}
              navId={item.id}
              name={item.name}
              hackId={this.props.hackId}
              action={()=>this.updateHackNav(item.name)}
            />
          ))}
        </div>
      </NavContainerDiv>
    )
  }
}

HackNav.defaultProps = {
  hackDisplayOptions: [],
}

export { HackNav }
