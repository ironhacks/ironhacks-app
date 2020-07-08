import React from 'react'
import { Row, Col } from '../../components/layout'
import SponsorsBanner from '../../components/sponsorsBanner'


class SponsorsSection extends React.Component {
  render() {
    return (
      <Row rowClass="">
        <Col >
          <h2 className="h2 text-center my-2">
            OUR <span className="font-extrabold">SPONSORS</span>
          </h2>
          <SponsorsBanner/>
        </Col>
      </Row>
    )
  }
}

export { SponsorsSection }
