import React from 'react';

class ShowcaseCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="card showcase_card">

        <img src={this.props.image} alt="HTML tutorial" class="card__image"/>

        <div class="card__content">
          <h3 class="title showcase_card__title">{this.props.title}</h3>
          <p class="description showcase_card__description">{this.props.description}</p>
        </div>

        <div class="card__info showcase_card__info">
          <div>
            <i class="material-icons icon_thumb">thumb_up</i>
            <span class="showcase_card__like">{this.props.likes}</span>
          </div>
          <div>
            <a href={this.props.likes} class="card__link">View App</a>
          </div>
        </div>
      </div>
    )
  }
}

ShowcaseCard.defaultProps = {
  image: '',
  title: 'Projet Title',
  description: 'Project Description',
  url: '',
  likes: '0',
}

export { ShowcaseCard }
