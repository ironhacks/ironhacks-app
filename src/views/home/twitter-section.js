import { Row, Col } from '../../components/layout'
import { TwitterButton, TwitterTimeline } from '../../components/twitter'

const TwitterSection = () => {
  return (
      <Row rowClass={'w-70p mx-auto'}>
        <Col>
          <h2 className="h2 text-center my-2">
            WHAT PEOPLE <span className="font-extrabold">ARE SAYING.</span>
          </h2>

          <div className="flex flex-center mb-3">
            <TwitterButton
              hashtag="IronHacks"
            />
          </div>

          <div style={{
            maxHeight: '500px',
            overflow: 'auto',
          }}>
            <TwitterTimeline
              src="https://twitter.com/__matt_harris__/lists/ironhacks-com-14752?ref_src=twsrc%5Etfw"
            />
          </div>
        </Col>
      </Row>
  )
}

export { TwitterSection }
