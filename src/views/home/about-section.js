import { Row, Col } from '../../components/layout'


const AboutSection = () => {
  return (
      <Row rowClass={'py-6 w-70p mx-auto'}>
        <Col>
          <h2 className="h2 text-center my-2">WHAT ARE <span className="font-extrabold">IRONHACKS?</span></h2>
          <p>
            IronHacks brings together a virtual hacking community who participate in high-energy IronHacks challenges. The IronHacks platform offers participants a no setup workspace and many powerful features. Participants get access to a Juypter Lab, BIG datasets, dashboards, tutorials  so that they can excel in data exploration, prediction and visualization.
          </p>
        </Col>
      </Row>
  )
};

export { AboutSection }
