import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { NavButton } from '../navigation/nav-button'
import { HeaderLogo } from '../navigation/header-logo'
import { Theme } from '../../theme';

const styles = Theme.STYLES;

const headerTheme = {
  backgroundColor: 'var(--color-primary)',
  textColor: 'var(--color-black)',
  hoverTextColor: 'var(--color-darkgrey)',
};

const HeaderContainer = styled('div')`
  height: ${(props) => props.theme.containerHeight};

  .menu {
    display: flex;
    align-items: center;
  }
`;


const UserMenu = styled('div')`
  display: ${(props) => props.display};
  flex-direction: column;
  align-items: left;
  position: absolute;
  top: 45px;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  a {
    padding: 10px;
    font-size: 16px;
    font-weight: 600;
    text-align: left;

    &:hover {
      background-color: lightgray;
    }
  }
`;


const RightAlignDiv = styled('div')`
  display: flex;
  justify-content: flex-end;
`;


const UserMenuDropper = styled('button')`
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: black;
  font-weight: 700;
`;


class UserMenuDropdownButton extends React.Component {
  render() {
    return (
      <UserMenuDropper onClick={this.props.onClick} >
        {this.props.text}
      </UserMenuDropper>
    )
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showUserMenu: 'none',
      showMenu: 'none',
    };

    this.userMenuRef = React.createRef();
    this.navMenuref = React.createRef();
    this.showUserMenu = this.showUserMenu.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.hideMenus = this.hideMenus.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    const userMenuRef = this.userMenuRef.current;
    if (userMenuRef && !userMenuRef.contains(event.target)) {
      this.setState({
        showUserMenu: 'none',
      })
    }
  }

  showUserMenu() {
    if (this.state.showUserMenu === 'none') {
      this.setState({
        showUserMenu: 'flex'
      })
    } else {
      this.setState({
        showUserMenu: 'none'
      })
    }
  }

  hideMenus(event) {
    this.setState({
      showUserMenu: 'none',
    })
  }

  render() {
    return (
      <ThemeProvider theme={headerTheme}>
        <div className='container-fluid' style={styles.HeaderStyle}>
          <HeaderContainer
            className='row'
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingLeft: '1em',
              paddingTop: '.4em',
            }}>

            <div className='col-2'>
              <HeaderLogo />
            </div>

            <RightAlignDiv className='col-5'>
              <UserMenuDropdownButton
                onClick={this.showUserMenu}
                text={this.props.displayName}
              />

              <UserMenu
                display={this.state.showUserMenu}
                innerRef={this.userMenuRef}
              >

                {window.location.pathname !== '/profile' && (
                <NavButton to='/profile' onClick={this.hideMenus}>
                  Profile
                </NavButton>
                )}

                {window.location.pathname !== '/admin'
                  && this.props.isAdmin
                  && (
                  <NavButton to='/admin' onClick={this.hideMenus}>
                    Admin
                  </NavButton>
                )}

                <NavButton to='/logout' onClick={this.hideMenus}>
                  Sign Out
                </NavButton>
              </UserMenu>
            </RightAlignDiv>
          </HeaderContainer>
        </div>
      </ThemeProvider>
    )
  }
}

export { Header }
