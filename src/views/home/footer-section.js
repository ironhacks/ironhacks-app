import { useState } from 'react'
import { Img } from '../../components/img'
import { Row, Col } from '../../components/layout'
import { MaterialDesignIcon } from '../../components/icons'
import FsLightbox from 'fslightbox-react'

function FooterVideo() {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  })

  function openLightboxOnSlide(number) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number,
    })
  }

  return (
    <>
      <div className="card" style={{ cursor: 'pointer' }} onClick={() => openLightboxOnSlide(1)}>
        <Img
          responsive={false}
          baseUrl={'https://firebasestorage.googleapis.com/v0/b/the-ironhacks-platform-dev.appspot.com/o'}
          filePath={'media%2Fimg%2Foptim%2F'}
          fileName={'video-ironhacks-promo_360x200.png?alt=media&token=d1dd80ad-010e-47dc-b0b9-66c1660f58ab'}
          alt={'IronHacks Video Promo'}
          imgClass="card__image bd-0 mb-0 depth-2"
          imgStyle={{ objectFit: 'cover' }}
        />
      </div>

      <FsLightbox
        toggler={lightboxController.toggler}
        sources={['https://www.youtube.com/watch?v=q2R4Tvpou0c']}
        slide={lightboxController.slide}
      />
    </>
  )
}

const FooterSection = () => {
  return (
    <>
      <Row>
        <Col>
          <h2 className="h2 text-center my-2">
            GET IN <span className="font-extrabold">TOUCH</span>
          </h2>
        </Col>
      </Row>

      <Row>
        <Col>
          <p className="text-center py-2">
            You can connect with us via phone, email, or just come to the Research Center for Open Digital Innovation,
            West Lafayette, IN.
          </p>
        </Col>
      </Row>

      <Row flex={true} rowClass={'py-2 fs-1 flex-align-center flex-wrap'}>
        <Col colClass="flex-1 min-w-350">
          <p>ironhacks.team@gmail.com</p>
          <p>
            Ernest C. Young Hall, Room 305
            <br /> 155 S. Grant St.
            <br /> West Lafayette, IN 47907
          </p>
          <p>
            Discovery Learning Research Center
            <br />
            298 Nimitz Dr.
            <br />
            West Lafayette, IN 47906
          </p>
          <p>
            <a href="https://www.facebook.com/OpenDigitalPurdue" target="_blank">
              <MaterialDesignIcon name="facebook" />
            </a>

            <a href="https://twitter.com/Purdue_RCODI" target="_blank">
              <MaterialDesignIcon iconClass="ml-3" name="twitter" />
            </a>

            <a href="mailto:ironhacks.team@gmail.com" target="_blank">
              <MaterialDesignIcon iconClass="ml-3" name="email" />
            </a>
          </p>
        </Col>

        <Col colClass="flex-1 hide--med">
          <div className="flex flex-center flex-align-center w-full relative">
            <FooterVideo />
          </div>
        </Col>
      </Row>
      <Row>
        <Col colClass="text-center">
          <div>
            <small>IronHacks is an initiative of the Research Center for Open Digital Innovation (RCODI).</small>
          </div>
          <div>
            <small>It is financially supported by the National Science Foundation (Award #1462044).</small>
          </div>
        </Col>
      </Row>
    </>
  )
}

export { FooterSection }
