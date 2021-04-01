import { Component } from 'react'
import { Row, Col } from '../../components/layout'
import { MdContentView } from '../../components/markdown-viewer'
import { userMetrics } from '../../util/user-metrics'
import { withRouter } from 'react-router-dom'

class TutorialView extends Component {
  constructor(props) {
    super(props)
    this.tutorialId = this.props.match.params.tutorialId
    this.state = {
      loading: true,
      content: '',
      title: '',
    }
  }

  componentDidMount() {
    this.getTutorial()
    userMetrics({
      event: 'view_tutorial',
      tutorialId: this.tutorialId,
    })
  }

  getTutorial = async () => {
    let doc = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('tutorials')
      .doc(this.tutorialId)
      .get()

    let data = doc.data()

    this.setState({
      content: data.content,
      title: data.title,
      loading: false,
    })
  }

  render() {
    return (
      <Row>
        {!this.state.loading && (
          <Col>
            <h2 className="h3 my-2 font-bold tutorial_title">{this.state.title}</h2>

            <MdContentView
              enableTracking={true}
              content={this.state.content}
              encoded={false}
              emptyText="Tutorial is not available yet."
            />
          </Col>
        )}
      </Row>
    )
  }
}

export default withRouter(TutorialView)
