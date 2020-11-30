import { Component } from 'react'
import { Link } from 'react-router-dom'

class AdminHackNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: this.getActivePath(),
    }

    this.baseUrl = `/admin/hacks/${this.props.hackId}`
  }

  setActive = (path) => {
    this.setState({ active: path })
  }

  getActivePath() {
    return window.location.pathname.split('/').slice(4)[0]
  }

  render() {
    return (
      <div className="admin-sidebar w-200 bg-grey-dk4 cl-white">
        {this.props.items.map((item, index) => (
          <Link
            key={index}
            to={`${this.baseUrl}/${item.path}`}
            className={item.path === this.state.active ? 'nav-item active' : 'nav-item'}
            onClick={() => {
              this.setActive(item.path)
            }}
          >
            <div className="admin-sidebar__item">{item.name}</div>
          </Link>
        ))}
      </div>
    )
  }
}

AdminHackNav.defaultProps = {
  items: [],
}

export { AdminHackNav }
