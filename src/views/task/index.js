import React from 'react';
import { HackTask }  from './hack-task';
import { Row, Col } from '../../components/layout';

class TaskView extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <HackTask task={this.props.task} />
        </Col>
      </Row>

    )
  }
}

export default TaskView
