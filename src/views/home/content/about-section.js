import React from 'react'
import { Row, Col } from '../../../components/layout'


class AboutSection extends React.Component {
  render() {
    return (
        <Row rowClass={'py-6 w-70p mx-auto'}>
          <Col>
          <p>
            IronHacks is an open data hacking program that combines experiential
            learning with real-world data-driven problem solving. During a 5-stage
            virtual competition, students utilize open data to create novel and
            useful interactive visualizations and analytic "apps" that solve civic
            challenges.
          </p>
          </Col>
        </Row>
    )
  }
}

export { AboutSection }