import { Component } from 'react'
import { Row, Col } from '../../components/layout'
import { userMetrics } from '../../util/user-metrics'
import { ExampleSubmissionsNotebook, ExampleSubmissionsSummary } from '../../components/example'

class ExampleView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      cohortList: [],
      clst: [],
      examples: [],
      example_notebook: [],
      view: '',
    }
  }

  componentDidMount() {
    this.getExamples()
    this.getExampleNotebooks()
    if (this.props.cohortSettings.showNotebooks) {
      return <ExampleSubmissionsNotebook exampleData={this.state.example_notebook} />
    }
    if (this.props.cohortSettings.showSummaries) {
      // return <ExampleSubmissionsNotebook exampleData={this.state.examples} />
      return <ExampleSubmissionsSummary exampleData={this.state.examples} />
    }

    userMetrics({ event: 'view_example' })
  }
  getExamples = async () => {
    // let result = []
    let snap = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('examples_summary')
      .get()

    snap.docs.forEach((item, i) => {
      this.state.examples.push({
        exampleId: item.id,
        ...item.data(),
      })
    })
    this.setState({
      loading: false,
    })
    // this.setState({ examples: result })
  }

  getExampleNotebooks = async () => {
    // let result = []
    let snap = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('examples_notebook')
      .get()

    snap.docs.forEach((item, i) => {
      this.state.example_notebook.push({
        exampleId: item.id,
        ...item.data(),
      })
    })
    this.setState({
      loading: false,
    })
  }

  render() {
    return (
      <Row>
        {!this.state.loading && (
          <Col>
            {/* {this.state.view} */}
            {(() => {
              if (this.props.cohortSettings.showNotebooks) {
                return <ExampleSubmissionsNotebook exampleData={this.state.example_notebook} />
              }
              if (this.props.cohortSettings.showSummaries) {
                // return <ExampleSubmissionsNotebook exampleData={this.state.examples} />
                return <ExampleSubmissionsSummary exampleData={this.state.examples} />
              }
            })()}
          </Col>
        )}
      </Row>
    )
  }
}

export default ExampleView
