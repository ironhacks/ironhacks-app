import React from 'react';
import { Theme } from '../../theme';
import './assets/style.css';


const formatDate = (timestring) => {
  let date = new Date(Date.parse(timestring));
  return [
    date.getMonth().toString().padStart(2, '0'),
    date.getDay().toString().padStart(2, '0'),
    date.getFullYear(),
  ].join('/')
}



class HackCard extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div className="hack_card">
        <a href={`/hacks/${this.props.hackId}`}>
          <div className="flex">
            <div className="hack_card__header">
              {this.props.hackData.hackThumbImg && (
                <img
                  className="card_img"
                  src={this.props.hackData.hackThumbImg}
                  />
              )}
            </div>

            <div className="hack_card__body p-2">
              <h3 className="card_title">
                {this.props.name}
              </h3>

              {this.props.hackData.description && (
              <p className="card_description">
                {this.props.hackData.description}
              </p>
              )}

              {this.props.hackData.startDate && (
                <span className="mr-3">
                  Start Date: {formatDate(this.props.hackData.startDate)}
                </span>
              )}

              {this.props.hackData.difficulty && (
                <span>
                  Difficulty:  {this.props.hackData.difficulty.label}
                </span>
              )}
            </div>
          </div>
        </a>
      </div>
    )
  }
}

class HackSignupCard extends React.Component {

  onHackSignup() {
    this.props.onClick(
      this.props.index,
      this.props.hack.registrationSurvey
    );
  }

  render() {
    return (
      <div className={'hack_card'}>
        <a href={`/hacks/${this.props.hackId}/register`}>
          <div className="flex">
            <div className="hack_card__header">
              {this.props.hackData.hackThumbImg && (
                <img
                  className="card_img"
                  src={this.props.hackData.hackThumbImg}
                  />
              )}
            </div>

            <div className="hack_card__body p-2">
              <h3 className="card_title">
                {this.props.name}
              </h3>

              {this.props.hackData.description && (
              <p className="card_description">
                {this.props.hackData.description}
              </p>
              )}

              {this.props.hackData.startDate && (
                <span className="mr-3">
                  Start Date: {formatDate(this.props.hackData.startDate)}
                </span>
              )}

              {this.props.hackData.difficulty && (
                <span>
                  Difficulty:  {this.props.hackData.difficulty.label}
                </span>
              )}
            </div>
          </div>
        </a>
      </div>
    );
  }
}

HackCard.defaultProps = {
  name: 'Hack Name',
  phases: 0,
  hackId: ''
}

export {
  HackCard,
  HackSignupCard,
}
