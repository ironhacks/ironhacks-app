import { Component } from 'react';
import * as Time from '../../constants/time';

class CountdownTimer extends Component {
  constructor(props) {
    super(props);

    let endDate = new Date(Date.parse(this.props.endTime));
    let distance = endDate - new Date().getTime();
    let initalTimer = this.getTimerStep(distance);

    if (distance > 0) {
      initalTimer = this.getTimerStep(distance)
    } else {
      initalTimer = {
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: 0
      }
    }

    this.state = {
      endDate: endDate,
      interval: null,
      timer: initalTimer,
    };
  }

  componentDidMount() {
      this.setTimerInterval()
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
  }

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
      let timeRemaining = this.getTimerStep(distance)
      if (distance <= 0) {
        this.clearTimerInterval()
      } else {
        this.updateTimer(timeRemaining)
      }
    }, 1000)

    this.setState({interval: interval});
  }

  clearTimerInterval = () => {
    clearInterval(this.state.interval);
    this.setState({
      timer: {
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: 0
      },
      interval: null,
    });
  };


  componentWillUnmount() {
    this.clearTimerInterval();
    this.setState({interval: null})
  }

  getTimerString = () => {
    return [
      this.state.timer.days.toString().padStart(2, '0'),
      this.state.timer.hours.toString().padStart(2, '0'),
      this.state.timer.minutes.toString().padStart(2, '0'),
      this.state.timer.seconds.toString().padStart(2, '0'),
    ].join(':')
  }

  render() {
    return (
      <div className={`countdown-timer ${this.props.timerClass}`}>
        {this.getTimerString()}
      </div>
    )
  }
}

CountdownTimer.defaultProps = {
  endTime: new Date(),
  timerClass: '',
}

export { CountdownTimer }
