import { createRef, Component } from 'react';
import { Row } from '../layout'
import { Link } from 'react-router-dom'
// import Swal from 'sweetalert2'

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    }

    this.isAdminPage = false
    if (window.location.pathname.indexOf('/admin/') === 0) {
      this.isAdminPage = true
    }

    this.userMenuRef = createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickOutside = event => {
    const userMenuRef = this.userMenuRef.current;
    if (userMenuRef && !userMenuRef.contains(event.target)) {
      this.setState({showMenu: false})
    }
  }

  showUserMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  hideMenu = () => {
    this.setState({showMenu: false})
  }

  render() {
    return (
        <header className={[
          'header',
          'site-header',
          'container-fluid',
          this.isAdminPage ? 'admin-header' : '',
        ].join(' ').trim()}>
          <div className='container header_container'>
            <Row rowClass='flex flex-between'>
              <Link className='header_logo' to='/hacks'>
                IronHacks
              </Link>

              <div className='header_actions'>
                <a
                  href='mailto:c562462b.groups.purdue.edu@amer.teams.ms'
                  target='_blank'
                  className='contact_button'>
                  Get in Touch
                </a>

                <div
                  className='action_menu_button'
                  onClick={this.showUserMenu}>
                  {this.props.displayName}
                </div>

                <div
                  className={['action_menu depth-3', this.state.showMenu ? 'active' : ''].join(' ').trim()}
                  ref={this.userMenuRef}
                >
                  {window.location.pathname !== '/profile' && (
                    <Link
                      to='/profile'
                      className='action_menu__item'
                      onClick={this.hideMenu}>
                      Profile
                    </Link>
                  )}

                  {window.location.pathname !== '/admin' && this.props.isAdmin && (
                    <Link
                      to='/admin'
                      className='action_menu__item'
                      onClick={this.hideMenu}>
                      Admin
                    </Link>
                  )}

                  <Link
                    to='/logout'
                    className='action_menu__item'
                    onClick={this.hideMenu}>
                    Sign Out
                  </Link>
                </div>
              </div>
            </Row>
          </div>
        </header>
    )
  }
}

export { Header }
