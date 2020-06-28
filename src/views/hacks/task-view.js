import React from 'react';
import { Row, Col } from '../../components/layout';
import { MdContentView }  from '../../components/markdownEditor/md-content-view';

class TaskView extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <MdContentView
            content={this.props.task}
            encoded={true}
            emptyText="Task Document is not available yet."
          />
        </Col>
      </Row>

    )
  }
}

export default TaskView
