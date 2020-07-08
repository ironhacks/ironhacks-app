import React from 'react';
import './assets/style.css';

class AdminHackCard extends React.Component {
  render() {
    return (
      <a href={`/admin/hacks/${this.props.hackId}/settings`}>
      <div className={'hack_card p-2 bg-primary'}>
        <div className="hack_card__body">
          <h3 className="hack_title font-bold text-center">
          {this.props.name}
          </h3>
        </div>
      </div>
      </a>
    )
  }
}

AdminHackCard.defaultProps = {
  name: 'Hack Name',
  phases: 0,
  hackId: ''
}

export { AdminHackCard }
