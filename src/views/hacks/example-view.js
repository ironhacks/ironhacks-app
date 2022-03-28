import { Component } from 'react'
import { Row, Col } from '../../components/layout'
import { userMetrics } from '../../util/user-metrics'
import { ExampleSubmissionsSummary, ExampleSubmissionsNotebook } from '../../components/example'

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
    userMetrics({ event: 'view_example' })
  }

  componentWillUnmount() {
    if (this.props.userCohortId === Object.keys(this.props.cohortList)[0]) {
      return <ExampleSubmissionsNotebook exampleData={this.state.example_notebook} />
    } else {
      return <ExampleSubmissionsSummary exampleData={this.state.examples} />
    }
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
              if (this.props.userCohortId === Object.keys(this.props.cohortList).sort()[0]) {
                return <ExampleSubmissionsNotebook exampleData={this.state.example_notebook} />
              } else {
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
