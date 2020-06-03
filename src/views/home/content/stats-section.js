import React from 'react';
import { Row, Col } from '../../../components/layout'
import CountUp from 'react-countup';

class StatsCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div class="card example_card">
      <div id="block-solutions-location" class="solution">
        <div class="split--tab-lg">
          <div id="solution-counter-location" class="solution-count count-it plus" data-counter-start="15" data-counter-end="50">0</div>
          <h3>Every State</h3>
          <span class="subtext">Canada &amp; Mexico</span>
        </div>

        <div class="divider" />

        <div class="split--tab-lg">
          <span class="description">Duckbilled barracudina tenuis stream barracuda thorny catfish Red whalefish northern lampfish.</span>
        </div>
      </div>
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
      <Row flex={true}>
        <Col>
          <CountUp
            start={10}
            end={200}
            duration={15}
            useEasing={true}
            separator=" "
            delay={2}
            suffix=" IRONHACKERS"
          />
          </Col>

          <Col>
          <CountUp
            start={40}
            end={150}
            duration={18}
            useEasing={true}
            separator=" "
            delay={1}
            suffix=" MASHUP APPS"
          />
        </Col>

        <Col>
          <CountUp
            start={42}
            end={100}
            duration={15}
            useEasing={true}
            separator=" "
            delay={3}
            decimal=","
            suffix=" DATASETS USED"
          />
        </Col>

        <Col>
          <CountUp
            start={2003}
            end={3000}
            duration={24}
            useEasing={true}
            separator=" "
            delay={4}
            suffix=" COMMITS"
          />
        </Col>
      </Row>
    )
  }
}


export { StatsSection }
