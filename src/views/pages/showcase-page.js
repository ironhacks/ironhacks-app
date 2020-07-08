import React from 'react';
import { LandingPage, Section, Row, Col } from '../../components/layout';
import { ShowcaseCard } from '../../components/showcase';

class HackShowcasePage extends React.Component {
  render() {
    return (
      <LandingPage>
        <Section sectionClass="">
          <Row rowClass="py-2">
            <Col>
            <ShowcaseCard
              image={''}
              title={'Comparing made easy'}
              description={'A full page web design to enhance user experience and interactivity with extra points of interest around NYU'}
              url={'https://ironhacks.github.io/showcase-2019-spring-jdrodriguezrui'}
              likes={'2,115'}
            />
            </Col>
          </Row>
        </Section>

      </LandingPage>
    )
  }
}

export default HackShowcasePage;
