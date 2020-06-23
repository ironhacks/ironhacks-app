import React from 'react';
import { Row, Col } from '../../../components/layout'
import CountUp from 'react-countup';
import './assets/css/stats-section.css';

class StatsCard extends React.Component {
  render() {
    return (
      <div class="card stats_card py-6">
        <CountUp
          start={10}
          end={200}
          duration={15}
          useEasing={true}
          separator=" "
          delay={2}
          suffix=" IRONHACKERS"
        />
      </div>
    )
  }
}

StatsCard.defaultProps = {
  image: '',
  title: 'Project Title',
  description: 'Project Description',
}

class StatsSection extends React.Component {
  render() {
    return (
      <>
      <Row>
        <h2 className="h2 text-center my-2">
          OUR <span className="font-extrabold">IMPACT</span>
        </h2>

        <p className="my-5 py-2 text-center">
          Since 2015, more than 1000 participants have hacked in parallel virtually around the
          globe gaining valuable experience in coding as well as work for the chance to win
          internships, Amazon gift cards, cool swag, and certificates. In addition to the
          participation and learning, IronHacks provide the opportunity to do research
          on open innovation contest processes.
        </p>
      </Row>

      <Row rowClass="impact_row my-4 pb-2" flex={true}>
        <Col colClass="impact_card">
          <h3 className="h3 my-2 font-bold">Innovation Impact</h3>
          <p>
            Participants developed novel and useful open data solutions in an interactive environment.
            The platform's features helped them continuously improve their submissions while learning
            from real-time feedback and others participating in the hack.
          </p>
        </Col>
        <Col colClass="impact_card">
          <h3 className="h3 my-2 font-bold">Globalization Impact</h3>
          <p>
            The virtual setting of hacking has emerged at Purdue and beyond. Participants come
            from the US, Colombia, and China. Virtual setting encourages a more diverse audience.
          </p>
        </Col>
        <Col colClass="impact_card">
          <h3 className="h3 my-2 font-bold">Scientific Impact</h3>
          <p>
            The scientific team at Purdue generated new knowledge and technologies on the
            implications of machine-enabled feedback and transparency on participants'
            productivity and innovation performance.
          </p>
        </Col>
      </Row>

      <Row rowClass="stats_row py-4">
        <Col colClass="stats_card py-6">
          <div className="counter-card flex px-0 align_center justify-content-center">
            <i className="zmdi zmdi-hc-2x zmdi-accounts-alt w-20 mr-2"/>
            <CountUp
              start={10}
              end={1001}
              duration={20}
              useEasing={true}
              separator=" "
              delay={2}
              suffix=" PARTICIPANTS"
            />
            </div>
        </Col>

          <Col colClass="stats_card py-6">
            <div className="counter-card flex px-0 align_center justify-content-center">
              <i className="zmdi zmdi-hc-2x zmdi-ticket-star w-20 mr-2"/>
              <CountUp
                start={40}
                end={637}
                duration={22}
                useEasing={true}
                separator=" "
                delay={1}
                suffix=" FINISHERS"
              />
            </div>
        </Col>

        <Col colClass="stats_card py-6">
          <div className="counter-card flex px-0 align_center justify-content-center">
            <i className="zmdi zmdi-hc-2x zmdi-sort-amount-asc w-20 mr-2"/>
            <CountUp
              start={42}
              end={3091}
              duration={25}
              useEasing={true}
              separator=" "
              delay={3}
              decimal=","
              suffix=" VISUALIZATIONS"
            />
          </div>
        </Col>

        <Col colClass="stats_card py-6">
          <div className="counter-card flex px-0 align_center justify-content-center">
            <i className="zmdi zmdi-hc-2x zmdi-code w-20 mr-2"/>
            <CountUp
              start={2003}
              end={9555}
              duration={24}
              useEasing={true}
              separator=" "
              delay={2}
              suffix=" COMMITS"
            />
          </div>
        </Col>
      </Row>
      </>
    )
  }
}


export { StatsSection }
