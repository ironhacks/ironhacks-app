import { Timeline, Hashtag } from 'react-twitter-widgets'
import { Row, Col } from '../../components/layout'


const TwitterSection = () => {
  return (
      <Row rowClass={'w-70p mx-auto'}>
        <Col>
          <h2 className="h2 text-center my-2">
            WHAT PEOPLE <span className="font-extrabold">ARE SAYING.</span>
          </h2>

          <div className="flex flex-center">
            <Hashtag
              hashtag="IronHacks"
              options={{
                size: 'large',
                dnt: true
              }}
            />
          </div>

          <Timeline
            dataSource={{
              sourceType: 'list',
              ownerScreenName: '__matt_harris__',
              id: '1324514845899841536'
            }}
            options={{
              dnt: true,
              height: 500,
              width: 1200,
              chrome: 'noheader, nofooter',
            }}
          />

        </Col>
      </Row>
  )
};



export { TwitterSection }
