import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/seti.css'
import 'codemirror/mode/javascript/javascript.js'
import Swal from 'sweetalert2'
import { userMetrics } from '../../util/user-metrics'
import { MaterialDesignIcon } from '../../components/icons'
import { downloadFileData } from '../../util/download-file-data'

class AdminHackResultsEditor extends Component {
  constructor(props) {
    super(props)

    this.submissionId = this.props.match.params.submissionId

    this.editorOptions = {
      lineNumbers: true,
      mode: {
        name: 'javascript',
        json: true,
        statementIndent: 2,
      },
      lint: false,
      theme: 'seti',
      tabSize: 2,
      jsonMode: true,
      lineWrapping: true,
      matchBrackets: false,
      matchTags: false,
      autoCloseTags: false,
      autoCloseBrackets: false,
      autofocus: true,
    }

    this.state = {
      loading: true,
      showTemplate: false,
      content: '',
      resultsPublished: false,
      resultKeys: [],
    }
  }

  resultsTemplate = {
    USER_ID: [
      { name: 'score-key-1', label: 'Score Display Label', value: 0 },
      { name: 'score-key-2', label: 'Score Display Label', value: 0 },
    ],
  }

  componentDidMount() {
    this.getResultsPublished()
    this.getResults()
  }

  updateContent = (editor, data, value) => {
    this.setState({ content: value })
  }

  toggleTemplate = () => {
    this.setState({ showTemplate: !this.state.showTemplate })
  }

  getResultKeys = async (data) => {
    if (!data) {
      return false
    }

    let values = Object.values(data)
    let keys = []

    for (let i = 0; i < values.length; i++) {
      keys.push(...values[i].map((item) => item.name))
    }

    this.setState({ resultKeys: [...new Set(keys)] })
  }

  getResults = async () => {
    let doc = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('results')
      .doc(this.submissionId)
      .get()

    let data = doc.data()

    this.getResultKeys(data)

    this.setState({
      content: JSON.stringify(data, null, 2),
      loading: false,
    })
  }

  getResultsPublished = async () => {
    let doc = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('results')
      .doc('settings')
      .get()

    let data = doc.data()
    if (data) {
      this.setState({
        resultsPublished: data.isPublished[this.submissionId] || false,
      })
    }
  }

  validateResults = () => {
    let data
    let isValid = true
    try {
      data = JSON.parse(this.state.content)
      console.log(data)
    } catch (e) {
      isValid = false
    }
    return isValid
  }

  onValidateButton = () => {
    let isValid = this.validateResults()
    if (isValid) {
      this.showDataValidModal()
    } else {
      this.showDataErrorModal()
    }
  }

  updatePublished = async () => {
    let isPublished = !this.state.resultsPublished
    userMetrics({
      event: isPublished ? 'results-published' : 'results-unpublished',
      hackId: this.props.hackId,
      submissionId: this.submissionId,
    })

    await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('results')
      .doc('settings')
      .set(
        {
          isPublished: {
            [this.submissionId]: isPublished,
          },
        },
        { merge: true }
      )

    this.setState({ resultsPublished: isPublished })
  }

  saveResults = async () => {
    let isValid = this.validateResults()

    if (isValid) {
      let data = JSON.parse(this.state.content)
      await window.firebase
        .firestore()
        .collection('hacks')
        .doc(this.props.hackId)
        .collection('results')
        .doc(this.submissionId)
        .set(data)

      userMetrics({
        event: 'results-updated',
        hackId: this.props.hackId,
        submissionId: this.submissionId,
      })

      this.showSaveSuccessModal()
    } else {
      this.showDataErrorModal()
    }
  }

  downloadResults = () => {
    downloadFileData({
      data: this.state.content,
      name: `ironhacks-${this.props.hackId}-${this.submissionId}-results.json`,
    })
  }

  getStats = (list) => {
    list.sort((a, b) => {
      return a - b
    })

    let deltas = []
    let deltaSquared = []

    let count = list.length
    let min = Math.min(...list)
    let max = Math.max(...list)
    let median = list[Math.floor(count / 2)]
    let sum = list.reduce((a, b) => {
      return a + b
    })
    let mean = sum / count

    list.forEach((item) => {
      deltas.push(Math.abs(item - mean))
    })

    deltas.forEach((item) => {
      deltaSquared.push(item * item)
    })

    let variance =
      deltaSquared.reduce((a, b) => {
        return a + b
      }) / count
    let stdDev = Math.sqrt(variance)

    // FOR LARGE LISTS WITH BIG NUMBERS VARIANCE MAY GO OUT
    // OF RANGE. THIS METHOD MAY WORK INSTEAD
    // let altStdDev = 0
    // list.forEach((item)=>{
    //   let diff = Math.abs(item - mean)
    //   altStdDev = altStdDev + (diff*diff / count)
    // })
    // altStdDev = Math.sqrt(altStdDev)

    return {
      values: list.join(','),
      count: count,
      sum: parseFloat(sum.toFixed(2)),
      min: min,
      max: max,
      mean: parseFloat(mean.toFixed(2)),
      median: median,
      variance: parseFloat(variance.toFixed(2)),
      stdDev: parseFloat(stdDev.toFixed(2)),
    }
  }

  downloadStats = () => {
    let isValid = this.validateResults()

    if (!isValid) {
      return false
    }

    let data = JSON.parse(this.state.content)

    let values = {}

    this.state.resultKeys.forEach((metric) => {
      values[metric] = []
    })

    Object.values(data).forEach((user) => {
      user.forEach((item) => {
        values[item.name].push(item.value)
      })
    })

    Object.keys(values).forEach((key) => {
      values[key] = values[key].filter((item) => {
        return item
      })
    })

    let stats = {}

    Object.keys(values).forEach((key) => {
      stats[key] = this.getStats(values[key])
    })

    downloadFileData({
      data: JSON.stringify(stats, null, 2),
      name: `ironhacks-${this.props.hackId}-${this.submissionId}-results-summary.json`,
    })
  }

  showDataValidModal = () => {
    this.setState({ loading: true })
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Data is free of errors',
      footer: '<small>Open the browser javascript console to explore the data further<small>',
    }).then(() => {
      this.setState({ loading: false })
    })
  }

  showDataErrorModal = () => {
    this.setState({ loading: true })
    Swal.fire({
      icon: 'error',
      title: 'Invalid Data',
      text: 'There was an issue parsing the data',
    }).then(() => {
      this.setState({ loading: false })
    })
  }

  showSaveSuccessModal = () => {
    this.setState({ loading: true })
    Swal.fire({
      icon: 'success',
      title: 'Results saved',
      text: 'Results were saved sucessfully',
    }).then(() => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <>
        <h2 className="h3 font-bold">{`${this.props.hackName} Results: ${this.submissionId}`}</h2>

        <div className="flex flex-align-center pb-2 border-bottom">
          {this.state.resultsPublished ? (
            <>
              <div className="font-italic">
                Submission Results are <span className="badge badge-success">visible</span> in the
                dashboard now
              </div>

              <div
                className="btn-sm button ml-auto bg-secondary cl-white"
                onClick={this.updatePublished}
              >
                Unpublish Results
              </div>
            </>
          ) : (
            <>
              <div className="font-italic">
                Submission Results are <span className="badge badge-secondary">not visible</span> in
                the dashboard now
              </div>

              <div
                className="btn-sm button ml-auto bg-info cl-white"
                onClick={this.updatePublished}
              >
                Publish Results
              </div>
            </>
          )}
        </div>

        <div>
          <div className="flex flex-between">
            <div className="button btn-sm" onClick={this.toggleTemplate}>
              Show Template
            </div>
            <div>
              <div className="button btn-sm" onClick={this.downloadStats}>
                <MaterialDesignIcon name="chart" />
              </div>
              <div className="button btn-sm" onClick={this.downloadResults}>
                <MaterialDesignIcon name="download" />
              </div>
            </div>
          </div>
          {this.state.showTemplate && (
            <pre className="code-block">
              <code>{JSON.stringify(this.resultsTemplate, null, 2)}</code>
            </pre>
          )}
        </div>

        <div>
          <CodeMirror
            value={this.state.content}
            className="admin_results_editor"
            options={{
              ...this.editorOptions,
              readOnly: this.state.loading,
            }}
            onBeforeChange={(editor, data, value) => {
              this.updateContent(editor, data, value)
            }}
          />
        </div>

        <div className="flex flex-align-center flex-between bg-grey-lt4 py-2">
          <div className="btn btn-sm bg-primary px-8" onClick={this.onValidateButton}>
            Validate
          </div>

          <div className="btn btn-sm bg-primary px-8" onClick={this.saveResults}>
            Save Results
          </div>
        </div>

        <p className="mb-1 mt-2">
          Enter results data in the field above to upload them the server.
        </p>

        <p className="font-italic fs-m1 mt-0">*Valid JSON syntax style is required</p>

        <h3 className="h4 my-2">Result Keys:</h3>

        <div className="flex">
          {this.state.resultKeys.map((item, index) => (
            <div key={index} className="mx-1">
              <code>{item}</code>
            </div>
          ))}
        </div>
      </>
    )
  }
}

export default withRouter(AdminHackResultsEditor)
