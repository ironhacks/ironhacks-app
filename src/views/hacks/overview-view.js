import { Component } from 'react'
import { Row, Col } from '../../components/layout'
import { MdContentView } from '../../components/markdown-viewer'
import { userMetrics } from '../../util/user-metrics'

class OverviewView extends Component {
  componentDidMount() {
    userMetrics({ event: 'view_overview' })
  }

  render() {
    return (
      <Row>
        <Col>
          <MdContentView
            enableTracking={true}
            content={this.props.document}
            encoded={false}
            emptyText="Hack Overview not available yet."
          />
        </Col>
      </Row>
    )
  }
}

export default OverviewView
