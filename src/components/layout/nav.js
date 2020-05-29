import React from "react"
import { Link, navigate } from "gatsby"

// import { Redirect } from "react-router-dom"
// import { withCookies } from 'react-cookie';
import menuIcon from "./assets/menu-icon.svg"
// import styled, { ThemeProvider } from 'styled-components';
// import registerStat from '../../../util/register-stat';
// import NavButton from '../navigation/nav-button'
// import { Theme } from "../../../theme"

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showUserMenu: "none",
      showMenu: "none",
      user: props.user,
    }
    this.getUserName()
    this.userMenuRef = React.createRef()
    this.navMenuRef = React.createRef()
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside)
  }

  handleClickOutside(event) {
    const userMenuRef = this.userMenuRef.current
    const navMenuRef = this.navMenuRef.current

    if (
      userMenuRef && !userMenuRef.contains(event.target) &&
      navMenuRef && !navMenuRef.contains(event.target)
    ) {
      this.setState({
        showMenu: "none",
        showUserMenu: "none",
      })
    }
  }

  getUserName() {
    return window.firebase.auth().currentUser.displayName;
    // return "developer"
  }

  showUserMenu() {
    if (this.state.showUserMenu === "none") {
      this.setState({ showUserMenu: "flex" })
    } else {
      this.setState({ showUserMenu: "none" })
    }
  }

  showMenu() {
    if (this.state.showMenu === "none") {
      this.setState({ showMenu: "flex" })
    } else {
      this.setState({ showMenu: "none" })
    }
  }

  hideMenus(event) {
    // const statData = {
    //   userId: this.state.user.uid,
    //   event: 'change-section',
    //   metadata: {
    //     location: 'header',
    //     target: event.target.innerHTML,
    //   },
    // };
    // registerStats(statData);
    this.setState({
      showMenu: "none",
      showUserMenu: "none",
    })
  }

  logout() {
    this.removeCookies()
    // window.firebase
    //   .auth()
    //   .signOut()
    //   .then(
    //     function() {},
    //     function(error) {
    //       console.error('Sign Out Error', error);
    //     }
    //   );
    navigate("/", { state: {} })
  }

  removeCookies() {
    // const { cookies } = this.props
    // if (cookies.get("currentHack")) {
    //   cookies.remove("currentHack")
    // }
    // if (cookies.get("currentForum")) {
    //   cookies.remove("currentForm")
    // }
  }

  render() {
    if (this.state.signOut === true) {
      {
        this.logout()
      }
    } else {
      return (
        <div theme={styles}>
          <div className="container-fluid">
            <div className="row">
              {this.props.location.pathname === "/select-hack" ? (
                <div className="col-5" />
              ) : (
                <div className="col-5 menu">
                  <div display={this.state.showMenu} innerRef={this.navMenuRef}>
                    <button onClick={this.showMenu}>
                      <img src={menuIcon} alt="menu_icon" />
                    </button>

                    <div className="links-container">
                      <Link to="/forum">Forum</Link>
                      <span> | </span>
                      <Link to="/results">Results</Link>
                      <span> | </span>
                      <Link to="/tutorial">Tutorial</Link>
                      <span> | </span>
                      <Link to="/quizzes">Quizzes</Link>
                      <span> | </span>
                      <Link to="/task">Task</Link>
                      <span> | </span>
                      {this.state.user.isAdmin && (
                        <Link to="/admin">Admin</Link>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div className="col-2">
                <div>
                  <label>IronHacks</label>
                </div>
              </div>
              <div className="col-5">
                <div onClick={this.showUserMenu}>
                  {this.state.user.displayName}
                </div>
                <div
                  display={this.state.showUserMenu}
                  innerRef={this.userMenuRef}
                >
                  {this.props.location.pathname !== "/select-hack" && (
                    <Link to="/profile">Profile</Link>
                  )}
                  <div onClick={this.logout}>Sign Out</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Header
