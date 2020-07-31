import React from 'react';

class HackTitle extends React.Component {
  render() {
    return (
      <h2 className="pt-3">
        <span>{ this.props.hackName } </span>
        <span className="small">({ this.props.hackId })</span>
      </h2>
    )
  }
}

export { HackTitle }
