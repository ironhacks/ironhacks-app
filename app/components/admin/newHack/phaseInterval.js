import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {Theme} from '../../theme';
import calendarIcon from '../../assets/svg/calendar-icon.svg';
const colors = Theme.COLORS;
const units = Theme.UNITS;



const PhaseIntervalContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;

  img {
    height: 20px;
    width: 20px;
    margin-right: 10px;
  }

  span {
    &.interval {
      font-weight: 300;
      font-size: 20px;
    };
  };
`;

const SetDateButton = styled('button')`
  border-top: ${(props) => (props.borderTop ? '2px solid gray' : 'none')}
  border-right: ${(props) => (props.borderRight ? '2px solid gray' : 'none')}
  border-bottom: ${(props) => (props.borderBottom ? '2px solid gray' : 'none')}
  border-left: ${(props) => (props.borderLeft ? '2px solid gray' : 'none')}
  border-radius: ${(props) => {
    const topLeft = props.borderLeft ? units.universalBorderRadius : '0';
    const topRight = props.borderRight ? units.universalBorderRadius : '0';
    const bottomLeft = props.borderLeft ? units.universalBorderRadius : '0';
    const bottomRight = props.borderRight ? units.universalBorderRadius : '0';
    return topLeft + ' ' + topRight + ' ' + bottomRight + ' ' + bottomLeft;
  }}
  padding-left: ${(props) => props.central ? '25px' : 'O'}
  padding-right: ${(props) => props.central ? '25px' : 'O'}
  background-color: lightgray;
  font-weight: 300;
`;
// ${units.universalBorderRadius} 0px 0px ${units.universalBorderRadius}

class PhaseInterval extends React.Component {
  isSelected = () => {
    this.props.onClick();
  }

  render() {
    return (
      <PhaseIntervalContainer>
        <div>
          <img src={calendarIcon} alt='calendar-icon'/>
          <span className='interval'>{'Phase ' + this.props.phaseIndex + ' - ' + this.props.intervalName}</span>
        </div>
        <div>
          <SetDateButton
            borderLeft
            borderTop
            borderBottom
            onClick={this.props.onClick}>
            {moment(this.props.start).format('MMM Do YYYY')}
          </SetDateButton>
          <SetDateButton
            borderTop
            borderBottom
            central
            onClick={this.props.onClick}>
            {'00:00 - 00:00'}
          </SetDateButton>
          <SetDateButton
            borderTop
            borderRight
            borderBottom
            onClick={this.props.onClick}>
            {moment(this.props.end).format('MMM Do YYYY')}
          </SetDateButton>
        </div>
      </PhaseIntervalContainer>
    );
  }
}

export default PhaseInterval;
