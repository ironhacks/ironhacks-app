import { Row, Col } from '../../components/layout'

const RulesSection = () => {
  return (
    <Row flex={true}>
      <Col>
        <h2 className="h2 text-center mb-4">RULES</h2>

        <p>
          Our IronHacks follow a unique 4-stage process. In order to win a prize and qualify for a
          certificate there are few rules and guidelines to keep in mind! We are all about openness
          and community-think! Be part of it.
        </p>

        <p>
          <strong>One hack per participant</strong>
        </p>
        <p>
          To make this a fair competition, we only allow one hack per participant in the Fall of
          2017.
        </p>

        <p>
          <strong>Code of conduct</strong>
        </p>

        <p>
          To qualify for the award, you need to be the originator & submitter of your app. Even
          though we allow you to reuse others' code, your code should be written by yourself.
          Further, we follow the idea of openness and open source (you will learn more about it
          during the hack).
        </p>

        <p>
          <strong>Iteration encouraged</strong>
        </p>

        <p>
          Your first of four submissions does not have to be a shiny app. It is about getting
          started. A rough working prototype is fine to start off. The feedback from experts will
          help you to improve.
        </p>

        <p>
          <strong>Follow the process</strong>
        </p>

        <p>
          Our IronHacks follows a unique 4-stage process. In order to win a prize, there are a few
          rules to keep in mind. We are all about openness and community think. Be part of it!
        </p>

        <p>
          <strong>Technical requirements</strong>
        </p>

        <p>
          In each hack, the application should include at least 2 open data sets. Your application
          should be (mostly) written in JavaScript. For visualizations we ask you to use libraries
          like D3.js, etc.
        </p>

        <p>
          <strong>Evaluation in four categories</strong>
        </p>

        <p>
          Our experts judge your application in four categories: technology, user requirements,
          information visualization, and novelty. Stand out from the crowd.
        </p>
      </Col>
    </Row>
  )
}

export { RulesSection }
