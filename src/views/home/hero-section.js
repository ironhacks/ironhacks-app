import { Row, Col } from '../../components/layout'
import { SvgImg } from '../../components/svg'
import { BulbSvg } from '../../components/svg/jsx'
import { LoginButton } from '../../components/buttons'

const HeroSection = () => {
  return (
    <Row flex={true} rowClass={'py-2 fs-2 flex-align-center flex-wrap'}>
      <Col colClass="flex-1 min-w-300">
        <h1 className={'h1 site-title'}>
          <span className="font-light">PURDUE </span>
          <span className="font-extrabold">IRONHACKS</span>
        </h1>

        <h2 className="h3 mb-3 mt-1">Hack for innovation to solve global challenges.</h2>

        <LoginButton to="/login?mode=select">Sign up here now</LoginButton>

        <LoginButton to="/login">Sign in</LoginButton>
      </Col>

      <Col colClass="flex-1 hide--med">
        <SvgImg containerClass="" imgClass={''} imgComponent={BulbSvg} />
      </Col>
    </Row>
  )
}

export { HeroSection }
