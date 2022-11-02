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
    let result = []
    let snap = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('examples_summary')
      .get()

    snap.docs.forEach((item, i) => {
      result.push({
        exampleId: item.id,
        ...item.data(),
      })
    })
    this.setState({
      loading: false,
    })
    result.sort((a, b) => {
      return a.title.localeCompare(b.title)
    })
    this.setState({ examples: result })
  }

  getExampleNotebooks = async () => {
    let result = []
    let snap = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('examples_notebook')
      .get()

    snap.docs.forEach((item, i) => {
      result.push({
        exampleId: item.id,
        ...item.data(),
      })
    })
    this.setState({
      loading: false,
    })
    result.sort((a, b) => {
      return a.title.localeCompare(b.title)
    })
    this.setState({ example_notebook: result })
  }

  render() {
    return (
      <Row>
        {!this.state.loading && (
          <Col>
            {/* {this.state.view} */}
            {(() => {
              if (
                this.props.cohortSettings.showNotebooks === true &&
                this.props.cohortSettings.showSummaries === false
              ) {
                return (
                  <Col>
                    <h2 className="h4 py-1 badge badge-dark">Example Notebooks</h2>
                    <ExampleSubmissionsNotebook exampleData={this.state.example_notebook} />
                  </Col>
                )
              } else if (
                this.props.cohortSettings.showNotebooks === false &&
                this.props.cohortSettings.showSummaries === true
              ) {
                return (
                  <Col>
                    <h2 className="h4 py-1 badge badge-dark">Example Summaries</h2>
                    <ExampleSubmissionsSummary exampleData={this.state.examples} />
                  </Col>
                )
              } else if (
                this.props.cohortSettings.showNotebooks === true &&
                this.props.cohortSettings.showSummaries === true
              ) {
                // return <ExampleSubmissionsNotebook exampleData={this.state.examples} />
                return (
                  // <ExampleSumNotebook
                  //   exampleDataNB={this.state.example_notebook}
                  //   exampleDataSM={this.state.examples}
                  // />
                  <Col>
                    <div>
                      <h2 className="h4 py-1 badge badge-dark">Example Summaries</h2>
                      <ExampleSubmissionsSummary exampleData={this.state.examples} />
                    </div>
                    <div>
                      <h2 className="h4 py-1 badge badge-dark">Example Notebooks</h2>
                      <ExampleSubmissionsNotebook exampleData={this.state.example_notebook} />
                    </div>
                  </Col>
                )
              }
            })()}
          </Col>
        )}
      </Row>
    )
  }
}

export default ExampleView
