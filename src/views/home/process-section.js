import { Row, Col } from '../../components/layout'
import { Img } from '../../components/img'

const ProcessSection = () => {
  return (
    <>
    <Row>
      <Col colClass="text-center">
      <h2 className="h2 text-center mb-4">
        THE IRONHACKS <span className="font-extrabold">PROCESS</span>
      </h2>
      <p>
        During an iterative multiphase process, the competing participants have access
        to tutorials, standardized libraries and packages, and virtual help sessions.
        After each phase, submissions are being evaluated within a few hours or days
        with the help of machine intelligence and human experts. Real time and targeted
        feedback accelerate learning and facilitate participants in hacking complex problems.
      </p>

      </Col>
    </Row>
    <Row>
      <Col>
        <Img
          responsive={false}
          baseUrl={'https://firebasestorage.googleapis.com/v0/b/the-ironhacks-platform-dev.appspot.com/o'}
          filePath={'media%2Fimg%2F'}
          fileName={'ironhacks-process.jpg?alt=media&token=0b68c710-36fb-4992-9c02-604dff758a5e'}
          alt="IronHacks Process Figure"
        />
      </Col>
    </Row>
    </>
  )
};

export { ProcessSection }
