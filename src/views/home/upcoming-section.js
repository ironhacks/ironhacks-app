import { Row, Col } from '../../components/layout'
import { Img } from '../../components/img'

const UpcomingSection = () => {
  return (
    <Row>
      <h2 className="h2 text-center mb-4">
        UPCOMING <span className="font-extrabold">IRONHACKS</span>
      </h2>
      <Col colClass="text-center">
        <a href="/covid19" className="nohover">
          <Img
            responsive={true}
            baseUrl={
              'https://firebasestorage.googleapis.com/v0/b/the-ironhacks-platform-dev.appspot.com/o'
            }
            filePath={'media%2Fimg%2F'}
            fileName={
              'covid19-fall-hack-cta-2.png?alt=media&token=e3f36e30-06f1-4ee4-893a-d7b22ccf7858'
            }
            imgClass="banner_img mb-4"
            alt="Upcoming Hack"
          />
        </a>
      </Col>
    </Row>
  )
}

export { UpcomingSection }
