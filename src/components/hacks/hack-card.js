import React from 'react';

const formatDate = (timestring) => {
  let date = new Date(Date.parse(timestring));
  return [
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getDate().toString().padStart(2, '0'),
    date.getFullYear(),
  ].join('/')
}



const HackCard = (
  {
    slug,
    thumbImg,
    name,
    description,
    startDate,
    difficulty,
  },
) => {
  return (
    <div className="hack_card">
      <a href={`/hacks/${slug}`}>
        <div className="flex">
          <div className="hack_card__header">
            {thumbImg && (
              <img
                className="card_img"
                src={thumbImg}
                alt={`${name} Thumbnail`}
                />
            )}
          </div>

          <div className="hack_card__body">
            <h3 className="card_title font-bold">
              {name}
            </h3>

            {description && (
            <p className="card_description">
              {description}
            </p>
            )}

            <div className="card_meta">
              {startDate && (
                <span className="mr-3">
                  Opening Date: {formatDate(startDate)}
                </span>
              )}

              {difficulty && (
                <span>
                  Difficulty: {difficulty.label}
                </span>
              )}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

HackCard.defaultProps = {
  thumbImg: null,
  description: null,
  startDate: false,
  difficulty: null,
}

const PreviousHackCard = (
  {
    thumbImg,
    name,
    description,
    startDate,
    difficulty,
  },
) => {
  return (
    <div className="hack_card">
      <div className="flex">
          <div className="hack_card__header">
            {thumbImg && (
              <img
                className="card_img"
                src={thumbImg}
                alt={`${name} Thumbnail`}
                />
            )}
          </div>

          <div className="hack_card__body p-2">
            <h3 className="card_title font-bold">
              {name}
            </h3>

            {description && (
            <p className="card_description">
              {description}
            </p>
            )}

            <div className="card_meta">
              {startDate && (
                <span className="mr-3">
                  Opening Date: {formatDate(startDate)}
                </span>
              )}

              {difficulty && (
                <span>
                  Difficulty: {difficulty.label}
                </span>
              )}
            </div>
          </div>
        </div>
    </div>
  );
};

PreviousHackCard.defaultProps = {
  thumbImg: null,
  description: null,
  startDate: false,
  difficulty: null,
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
        <a href={`/hacks/${this.props.slug}/register`}>
          <div className="flex">
            <div className="hack_card__header">
              {this.props.thumbImg && (
                <img
                  className="card_img"
                  src={this.props.thumbImg}
                  alt={`${this.props.name} Thumbnail`}
                  />
              )}
            </div>

            <div className="hack_card__body p-2">
              <h3 className="card_title font-bold">
                {this.props.name}
              </h3>

              {this.props.description && (
              <p className="card_description">
                {this.props.description}
              </p>
              )}

              <div className="card_meta">
                {this.props.startDate && (
                  <span className="mr-3">
                    Opening Date: {formatDate(this.props.startDate)}
                  </span>
                )}

                {this.props.difficulty && (
                  <span>
                    Difficulty: {this.props.difficulty.label}
                  </span>
                )}
              </div>
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
  PreviousHackCard,
}
