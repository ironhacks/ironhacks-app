import { Component } from 'react'
import { Row, Col } from '../../components/layout'
import { userMetrics } from '../../util/user-metrics'
import { ExampleSubmissionsSummary, ExampleSubmissionsNotebook } from '../../components/example'

class ExampleView extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.getRegistrationCohorts()

    userMetrics({ event: 'view_example' })
  }

  getRegistrationCohorts = async () => {
    window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('registration')
      .doc('cohorts')
      .get()
      .then((doc) => {
        let data = doc.data()
        Object.entries(data).map(([key, value]) => {
          this.state.clst.push(key)
        })
        this.state.clst.sort()
        console.log(this.state.clst[1])
        if (this.props.userCohortId === this.state.clst[0]) {
          this.state.view = <ExampleSubmissionsSummary exampleData={this.state.examples} />
        } else {
          this.state.view = <ExampleSubmissionsNotebook exampleData={this.state.example_notebook} />
        }
        // if (data) {
        //   this.setState({
        //     cohortList: data,
        //   })
        // }
      })
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
    // this.setState({ examples: result })
  }

  render() {
    return (
      <Row>
        <Col>{this.state.view}</Col>
      </Row>
    )
  }
}

export default ExampleView
