import React from 'react';
import { Row, Col } from '../../components/layout';
import { MdContentView }  from '../../components/markdownEditor/md-content-view';

class OverviewView extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <MdContentView
            content={this.props.document}
            encoded={true}
            emptyText="Hack Overview not available yet."
          />
        </Col>
      </Row>

    )
  }
}

export default OverviewView
