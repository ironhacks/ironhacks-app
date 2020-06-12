import React from 'react'
import { Row, Col } from '../../../components/layout'
import processImg from './images/ironhacks-process.jpeg'


class ProcessSection extends React.Component {
  render() {
    return (
      <>
      <Row>
        <Col colClass="text-center">
        <h2 className="h2 text-center mb-4">
          THE IRONHACKS <span className="font-extrabold">PROCESS</span>
        </h2>
        <p>
          During an iterative multiphase process, the competing participants
          have access to tutorials, standardized libraries and packages, and virtual
          help sessions. After each phase, submissions are being evaluated within a
          few hours or days with the help of machine intelligence and human experts. Real
          time and targeted feedback accelerate learning and facilitate participants
          in hacking complex problems.
        </p>

        </Col>
      </Row>
      <Row>
        <Col>
          <img src={processImg} alt="IronHacks Process Figure"/>
        </Col>
      </Row>
      </>
    )
  }
}

export { ProcessSection }
