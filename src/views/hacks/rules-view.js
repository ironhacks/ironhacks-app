import { Component } from 'react'
import { Row, Col } from '../../components/layout'
import { MdContentView } from '../../components/markdown-viewer'
import { userMetrics } from '../../util/user-metrics'

class RulesView extends Component {
  componentDidMount() {
    userMetrics({ event: 'view_rules' })
  }

  render() {
    return (
      <Row>
        <Col>
          <MdContentView
            enableTracking={true}
            content={this.props.content}
            encoded={false}
            emptyText="Rules not available yet."
          />
        </Col>
      </Row>
    )
  }
}

export default RulesView
