import React from 'react';
import { HackCard, HackSignupCard } from './hack-card';


class HackCardList extends React.Component {
  constructor(props) {
    super(props);
    this.emptyText = this.props.emptyText || 'There are no hacks available.';
  }

  render() {
    if (!this.props.hacks || this.props.hacks.length === 0) {
      return (
        <div className="py-5">
          <span className='empty-list'>
            {this.emptyText}
          </span>
        </div>
      )
    } else {
      return (
        <ul className="hack_card_list">
        {this.props.hacks.map((hack, index) => (
          <li
            key={hack.hackId}
            className="hack_card_list__item w-50p"
            index={index}
            >

            <HackCard
              name={hack.name}
              hackId={hack.hackId}
              hackData={hack}
            />
          </li>
        ))}
        </ul>
      );
    }
  }
}

class HackSignupCardList extends React.Component {
  constructor(props) {
    super(props);
    this.emptyText = this.props.emptyText || 'There are no hacks available.';
  }

  render() {
    if (!this.props.hacks || this.props.hacks.length === 0) {
      return (
        <div className="py-5">
          <span className='empty-list'>
            {this.emptyText}
          </span>
        </div>
      )
    } else {
      return (
        <ul className="hack_card_list">
        {this.props.hacks.map((hack, index) => (
          <li
            key={hack.hackId}
            className="hack_card_list__item w-50p"
            index={index}
            >
            <HackSignupCard
              name={hack.name}
              hackId={hack.hackId}
              hack={hack}
              hackData={hack}
            />
          </li>
        ))}
        </ul>
      );
    }
  }
}


export { HackCardList, HackSignupCardList }
