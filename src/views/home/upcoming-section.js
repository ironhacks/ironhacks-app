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
            baseUrl={'https://firebasestorage.googleapis.com/v0/b/the-ironhacks-platform-dev.appspot.com/o'}
            filePath={'media%2Fimg%2F'}
            fileName={'covid19-fall-hack-cta.png?alt=media&token=91d93297-57d2-48de-959a-06965c5bb8c9'}
            imgClass="banner_img mb-4"
            alt="Upcoming Hack"
          />
          </a>
        </Col>
      </Row>
  )
};

export { UpcomingSection }
