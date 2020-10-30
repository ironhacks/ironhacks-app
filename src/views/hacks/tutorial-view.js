import { Component } from 'react';
import { Row, Col } from '../../components/layout';
import { MdContentView }  from '../../components/markdown-viewer';
import { userMetrics } from '../../util/user-metrics'

class TutorialView extends Component {
  componentDidMount() {
    userMetrics({event: 'view_tutorial'})
  }

  render() {
    return (
      <Row>
        <Col>
          <MdContentView
            content={this.props.hackTutorial}
            encoded={true}
            emptyText="Tutorial is not available yet."
          />
        </Col>
      </Row>
    )
  }
}

export default TutorialView
