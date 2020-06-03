import React from 'react';
import { Row, Col } from '../../../components/layout'
import foodImg from './images/food.jpg';
import workImg from './images/workforce.jpg';
import houseImg from './images/housing.jpg';

class ExampleCard extends React.Component {
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

ExampleCard.defaultProps = {
  image: '',
  title: 'Project Title',
  description: 'Project Description',
}

class ExamplesSection extends React.Component {
  render() {
    return (
      <>
      <Row>
        <h2 className="title section__title h2 text-center mb-4 font-bold">What are IronHacks?</h2>
      </Row>

      <Row flex={true}>
        <Col>
          <ExampleCard
            title="HEALTHY LIVING"
            description="Use open data and develop an app that helps citizens in finding cheap and seasonally fresh vegetables from local markets."
            image={foodImg}
          />
        </Col>

        <Col>
          <ExampleCard
            title="AFFORDABLE HOUSING"
            description="Build a website with interactive visualizations that helps new students in finding safe and affordable housing near their university."
            image={workImg}
          />
        </Col>

        <Col>
          <ExampleCard
            title="WORKFORCE ANALYTICS"
            description="Use workforce data to explore factors that affect successful career paths."
            image={houseImg}
          />
        </Col>
      </Row>
      </>
    )
  }
}


export { ExamplesSection }
