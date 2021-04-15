import { Row, Col } from '../../components/layout'
import { MaterialDesignIcon } from '../../components/icons'

const UpcomingSection = () => {
  return (
    <Row>
      <h2 className="h2 text-center mb-4">
        UPCOMING <span className="font-extrabold">IRONHACKS</span>
      </h2>
      <Col colClass="text-center">
        <h3 className="h3">
          <div className="pb-5">Learn more about upcoming news and events on the</div>
          <a href="https://blog.ironhacks.com" className="nohover">
            <div>
              <MaterialDesignIcon name="arrow-forward" iconClass="pr-2" />
              <span className="text-underline">IronHacks Blog</span>
            </div>
          </a>
        </h3>
      </Col>
    </Row>
  )
}

export { UpcomingSection }
