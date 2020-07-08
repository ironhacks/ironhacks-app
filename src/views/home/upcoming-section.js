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
                fileName={'upcoming-covid19-cta.png?alt=media&token=7fc34889-ce67-4b46-8e42-250efb8d66c0'}
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
