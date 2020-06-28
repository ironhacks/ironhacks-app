import React from 'react'
import { Row, Col } from '../../components/layout'
import { Img } from '../../components/img'

class UpcomingSection extends React.Component {
  render() {
    return (
        <Row>
          <h2 className="h2 text-center mb-4">
            UPCOMING <span className="font-extrabold">IRONHACKS</span>
          </h2>
          <Col colClass="text-center">
            <a href="/covid19" className="nohover">
              <Img
                responsive={true}
                baseUrl={'https://firebasestorage.googleapis.com/v0/b/ironhacks-c406a.appspot.com/o'}
                filePath={'media%2Fimg%2F'}
                fileName={'upcoming-covid19-cta.png?alt=media&token=8f0cb83e-a0a5-40a4-9eb4-0327ce7cb6f2'}
                imgClass="banner_img"
                alt="Upcoming Hack"
              />
            </a>
          </Col>
        </Row>
    )
  }
}

export { UpcomingSection }
