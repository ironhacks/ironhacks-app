import React from 'react';
import * as Time from '../../constants/time';

class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);

    let endDate = new Date(Date.parse(this.props.endTime));
    let distance = endDate - new Date().getTime();
    let initalTimer = this.getTimerStep(distance);

    this.state ={
      endDate: endDate,
      interval: null,
      timer: initalTimer,
    };
  }

  updateTimer = data => {
    this.setState({
      timer: {
        seconds: data.seconds,
        minutes: data.minutes,
        hours: data.hours,
        days: data.days
      }
    })
  };

  getTimerStep(distance){
    return {
      seconds: Math.floor((distance % Time.ONE_MINUTE) / Time.ONE_SECOND),
      minutes: Math.floor((distance % Time.ONE_HOUR) / Time.ONE_MINUTE),
      hours: Math.floor((distance % Time.ONE_DAY) / Time.ONE_HOUR),
      days:  Math.floor(distance / Time.ONE_DAY),
    }
  }

  setTimerInterval = () => {
    const interval = setInterval(() => {
      let distance = this.state.endDate - new Date().getTime();
      let timeRemaining = this.getTimerStep(distance);
      this.updateTimer(timeRemaining)
      if (distance <= 0) {
        this.clearTimerInterval();
      }
    }, 1000);

    this.setState({interval: interval});
  };

  clearTimerInterval = () => {
    clearInterval(this.state.interval);

    this.setState({
      timer: null,
      interval: null,
    });
  };

  componentDidMount() {
    this.setTimerInterval();
  }

  componentWillUnmount() {
    this.clearTimerInterval();
    this.setState({interval: null})
  }

  render() {
    return (
      <div className={`countdown-timer ${this.props.timerClass}`}>
        {`${this.state.timer.days}:${this.state.timer.hours}:${this.state.timer.minutes}:${this.state.timer.seconds}`}
      </div>
    )
  }
}

CountdownTimer.defaultProps = {
  endTime: new Date(),
  timerClass: '',
}

export { CountdownTimer }
