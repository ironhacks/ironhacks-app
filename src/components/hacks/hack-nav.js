import React from 'react';
import { Link } from 'react-router-dom';
import { HackNavContainerDiv } from './nav-container'
import { upperCaseWord } from '../../util/string-utils';
import menuIcon from '../../assets/svg/menu-icon.svg';


class HackNavItem extends React.Component {
  render() {
    return (
      <Link
        className={`hack_nav__item ${this.props.navClass}`}
        to={`/hacks/${this.props.slug}/${this.props.navId.toLowerCase()}`}
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
    this.showMenu = this.showMenu.bind(this);
    this.baseUrl = `/hacks/${this.props.hackSlug}`;
    this.navMenuRef = props.navMenuref;
    this.getNav = this.getNav.bind(this);
  }

  getNav(items){
    if (!items) {
      return [];
    }

    let display = Object.keys(items).filter((item)=>{
      return items[item];
    });

    display.sort((a,b)=>{ return a.localeCompare(b) })

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

  render() {
    return (
      <HackNavContainerDiv
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
              slug={this.props.hackSlug}
              name={item.name}
              hackId={this.props.hackId}
            />
          ))}

        </div>
        <a
          href="https://hub.ironhacks.com"
          onClick={(()=>{
            window.firebase.analytics().logEvent('launch_hub');
          })}
          target="_blank"
          className="btn hub-button bg-primary ml-auto font-bold"
        >
          Workspace
        </a>
      </HackNavContainerDiv>
    )
  }
}

HackNav.defaultProps = {
  hackDisplayOptions: [],
}

export { HackNav }
