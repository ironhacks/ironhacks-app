import React from 'react';
import { Row, Col } from '../../components/layout';
import { MdContentView }  from '../../components/markdown-viewer';
import { userMetrics } from '../../util/user-metrics'

class OverviewView extends React.Component {
  componentDidMount() {
    userMetrics({event: 'view_tutorial'})
  }

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
