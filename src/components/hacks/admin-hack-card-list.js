import React from 'react';
import { AdminHackCard } from './admin-hack-card';

class AdminHackCardList extends React.Component {
  constructor(props) {
    super(props);
    this.emptyText = this.props.emptyText || 'There are no hacks available.';
  }

  render() {
    if (!this.props.hacks || this.props.hacks.length === 0) {
      return (
        <span className='empty-list'>
          {this.emptyText}
        </span>
      )
    } else {
      return (
        <ul className="hack_card_list">
        {this.props.hacks.map((hack, index) => (
          <li
            key={hack.hackId}
            className="hack_card_list__item col-sm-4"
            index={index}
            >

            <AdminHackCard
              name={hack.name}
              hackId={hack.id}
              hack={hack}
              phases={hack.phases.length}
            />

          </li>
        ))}
        </ul>
      );
    }
  }
}


export { AdminHackCardList }
