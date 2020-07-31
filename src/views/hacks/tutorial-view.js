import React from 'react';
import { Row, Col } from '../../components/layout';
import { MdContentView }  from '../../components/markdown-viewer';

class TutorialView extends React.Component {
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
