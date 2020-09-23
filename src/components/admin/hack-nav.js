import React from 'react';
import { Link } from 'react-router-dom';

class AdminHackNav extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = `/admin/hacks/${this.props.hackId}`;
  }

  render() {
    return (
      <div className='admin-sidebar col-md-2'>
        {this.props.items.map((item, index)=>(
          <Link
            key={index}
            to={`${this.baseUrl}/${item.path}`}
            className="nav-item"
            >

            <div className="admin-sidebar__item">
              {item.name}
            </div>
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
