import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { MaterialDesignIcon } from '../icons'
import { upperCaseWord } from '../../util/string-utils';
import { userMetrics } from '../../util/user-metrics'

const HackNavItem = ({ navClass, slug, navId, name }) => {
  return (
    <NavLink
      className={`hack_nav__item ${navClass}`}
      activeClassName="bg-secondary cl-white"
      to={`/hacks/${slug}/${navId.toLowerCase()}`}
    >
      {upperCaseWord(name)}
    </NavLink>
  );
};

HackNavItem.defaultProps = {
  navClass: '',
}

class HackNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      currentView: 'task',
      navItems: [],
    }
    this.baseUrl = `/hacks/${this.props.hackSlug}`
    this.navMenuRef = props.navMenuref
  }

  componentDidMount() {
    this.getNav()
  }

  getNav = () => {
    let items = this.props.hackDisplayOptions
    items = Object.keys(items).filter((item)=>{
      return items[item]
    })

    items.sort((a,b)=>{ return a.localeCompare(b) })

    const navItems = items.map((item)=>{
      return {
        id: item.replace('Enabled', ''),
        name: item.replace('Enabled', ''),
      }
    })
    this.setState({navItems: navItems})
  }

  showMenu = () => {
    this.setState({ showMenu: !this.state.showMenu })
  }

  workspaceButton = () => {
    console.log('workspaceButton');
    userMetrics({event: 'launch_hub'})
    window.firebase.analytics().logEvent('launch_hub');
  }

  render() {
    return (
      <div className={'hack_nav'}>
        <MaterialDesignIcon
          iconClass="btn mobile_nav_btn"
          name="menu"
          onClick={this.showMenu}
        />

        <div className={['hack_nav_list', this.state.showMenu ? 'enabled' : ''].join(' ').trim()}>
          {this.state.navItems.map((item, index)=>(
            <HackNavItem
              key={index}
              navId={item.id}
              slug={this.props.hackSlug}
              name={item.name}
              hackId={this.props.hackId}
            />
          ))}

          <a
            href="https://hub.ironhacks.com"
            onClick={this.workspaceButton}
            rel="noopener noreferrer"
            target="_blank"
            className="hack_nav__item btn-sm hub-button bg-primary ml-auto font-bold"
          >
            Workspace
          </a>
        </div>
      </div>
    )
  }
}

HackNav.defaultProps = {
  hackDisplayOptions: [],
}

export { HackNav }
