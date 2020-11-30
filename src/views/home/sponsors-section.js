import { Row, Col } from '../../components/layout'
import SponsorsBanner from '../../components/sponsorsBanner'

const SponsorsSection = () => {
  return (
    <Row rowClass="">
      <Col>
        <h2 className="h2 text-center my-2">
          OUR <span className="font-extrabold">SPONSORS</span>
        </h2>
        <SponsorsBanner />
      </Col>
    </Row>
  )
}

export { SponsorsSection }
