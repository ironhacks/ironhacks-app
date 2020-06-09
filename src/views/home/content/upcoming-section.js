import React from 'react'
import { Row, Col } from '../../../components/layout'
import upcomingImg from '../../../assets/img/upcoming-covid19-cta.png'
import { Link } from 'react-router-dom';


class UpcomingSection extends React.Component {
  render() {
    return (
        <Row>
          <h2 className="h2 text-center mb-4">
            UPCOMING <span className="font-extrabold">IRONHACKS</span>
          </h2>
          <Col colClass="text-center">
            <a href="/covid19" className="nohover">
              <img src={upcomingImg} alt="Upcoming Hack" className="banner_img"/>
            </a>
          </Col>
        </Row>
    )
  }
}

export { UpcomingSection }
