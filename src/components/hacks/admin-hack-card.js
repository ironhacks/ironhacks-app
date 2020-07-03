import React from 'react';
import styled from 'styled-components';
import './assets/style.css';

const Separator = styled('div')`
  width: 100%;
  height: 1px;
  margin-top: 25px;
  background-color: var(--color-primary);
`;


class AdminHackCard extends React.Component {
  render() {
    return (
      <div className={'hack_card'}>
        <a href={`/admin/hacks/${this.props.hackId}/settings`}>
          <div className="hack_card__header">
            <h3 className="hack_title">{this.props.name}</h3>
          </div>

          <div className="hack_card__body">
            <span>
              {`Phases: ${this.props.phases}`}
            </span>
          </div>

          <div className="hack_card__footer">
            <Separator />
          </div>
        </a>
      </div>
    )
  }
}

AdminHackCard.defaultProps = {
  name: 'Hack Name',
  phases: 0,
  hackId: ''
}

export { AdminHackCard }
