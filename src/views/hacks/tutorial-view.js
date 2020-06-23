import React from 'react';
import { MdContentView }  from '../../components/markdownEditor/md-content-view';
import { Row, Col } from '../../components/layout';

class TutorialView extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <MdContentView
            content={this.props.hackTutorial}
            emptyText="Tutorial is not available yet."
            encoded={true}
          />
        </Col>
      </Row>
    )
  }
}

export default TutorialView
