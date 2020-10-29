import React from 'react';
import { AdminHackCard } from './admin-hack-card';

class AdminHackCardList extends React.Component {
  render() {
    if (!this.props.hacks || this.props.hacks.length === 0) {
      return (
        <span className='empty-list'>
          {this.props.emptyText || 'There are no hacks available.'}
        </span>
      )
    } else {
      return (
        <ul className="hack_card_list">
        {this.props.hacks.map((hack, index) => (
          <li
            key={index}
            className="hack_card_list__item col-sm-6"
            index={index}
            >

            <AdminHackCard
              name={hack.name}
              hackId={hack.id}
              hack={hack}
            />
          </li>
        ))}
        </ul>
      )
    }
  }
}


export { AdminHackCardList }
