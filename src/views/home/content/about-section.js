import React from 'react'
import { Row, Col } from '../../../components/layout'


class AboutSection extends React.Component {
  render() {
    return (
        <Row rowClass={'py-6 w-70p mx-auto'}>
          <Col>
            <h2 className="h2 text-center my-2">WHAT IS <span className="font-extrabold">IRONHACKS?</span></h2>
            <p>
              IronHacks is a global virtual open data hacking platform that empowers programmers -
              from beginners to professionals - to solve civic challenges during a multiphase
              and learning-oriented process.  The IronHacks platform offers participants a
              no setup programming environment and many powerful features to create novel and
              useful models and visualizations that help citizens and governments to make
              better decisions.
            </p>
          </Col>
        </Row>
    )
  }
}

export { AboutSection }
