import React from 'react';

class AdminHackCard extends React.Component {
  render() {
    return (
      <a href={`/admin/hacks/${this.props.hackId}/settings`}>
        <div className={'hack_card p-2 bg-primary flex flex-center flex-align-center'}>
          <h3 className="hack_title font-bold text-center">
            {this.props.name}
          </h3>
        </div>
      </a>
    )
  }
}

AdminHackCard.defaultProps = {
  name: 'Hack Name',
  hackId: ''
}

export { AdminHackCard }
