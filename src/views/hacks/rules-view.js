import React from 'react';
import { Row, Col } from '../../components/layout';
import { MdContentView }  from '../../components/markdownEditor/md-content-view';

class RulesView extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <MdContentView
            content={this.props.content}
            encoded={true}
            emptyText="Rules not available yet."
          />
        </Col>
      </Row>

    )
  }
}

export default RulesView
