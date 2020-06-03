import React from 'react';
import { Row, Col } from '../../../components/layout'

class FooterCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="card example_card">
        <img
          src={this.props.image}
          alt={this.props.title}
          class="card__image bd-0 mb-0"/>
        <div class="card__content bd-0 bg-inherit">
          <h3 class="title example_card__title">{this.props.title}</h3>
          <p class="description example_card__description">{this.props.description}</p>
        </div>
      </div>
    )
  }
}

FooterCard.defaultProps = {
  image: '',
  title: 'Project Title',
  description: 'Project Description',
}

class FooterSection extends React.Component {
  render() {
    return (
      <>
      <Row>
        <Col>
          <h2 className="h2 text-center my-2">
            GET IN <span className="font-extrabold">TOUCH</span>
          </h2>
        </Col>
      </Row>

      <Row>
        <Col>
          <p className="text-center py-2">
            You can connect with us via phone, email, or just come to the Research Center for Open Digital Innovation, West-Lafayette, IN.
          </p>
        </Col>
      </Row>


      <Row flex={true} rowClass={'py-2 fs-2 flex-align-center'}>
        <Col colClass='flex-1'>
          <p>+1 765.494.2885</p>
          <p>opendigital@purdue.edu</p>
          <p>Seng-Liang Wang Hall,</p>
          <p>516 Northwestern Ave, West Lafayette, IN 47906</p>
        </Col>

        <Col colClass='flex-1'>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/q2R4Tvpou0c?controls=0"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen />

        </Col>
      </Row>
      </>
    )
  }
}


export { FooterSection }
