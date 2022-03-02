import { Component } from 'react'
import MarkdownEditor from '../../components/markdown-editor'
import { InputText } from '../../components/input'
import { Button } from '../../components/buttons'
import { withRouter } from 'react-router-dom'
import { userMetrics } from '../../util/user-metrics'
import { Section } from '../../components/layout'

class AdminExampleEditNotebook extends Component {
  constructor(props) {
    super(props)

    this.exampleId = this.props.match.params.exampleId

    this.state = {
      exampleData: {
        title: '',
        content: '',
      },
      loading: false,
    }
  }

  componentDidMount() {
    this.getExample()
  }

  onEditorChange = (value) => {
    let data = this.state.exampleData
    data.content = value
    this.setState({ exampleData: data })
  }

  onInputChanged = (name, value) => {
    let data = this.state.exampleData
    data[name] = value
    this.setState({ exampleData: data })
  }

  getExample = async () => {
    this.setState({ loading: true })

    let doc = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('examples_notebook')
      .doc(this.exampleId)
      .get()

    let example = {
      exampleId: this.exampleId,
      ...doc.data(),
    }

    this.setState({
      exampleData: example,
      loading: false,
    })
  }

  updateExample = async () => {
    this.setState({ loading: true })

    let data = this.state.exampleData

    await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('examples_notebook')
      .doc(this.exampleId)
      .update(data)

    userMetrics({
      event: 'example-notebook-created',
      exampleId: this.exampleId,
      hackId: this.props.hackId,
    })

    this.setState({ loading: false })
    window.location = `/admin/hacks/${this.props.hackId}/examples`
  }

  cancelEdit = () => {
    window.history.back()
  }

  render() {
    return (
      <>
        <Section sectionClass="py-2">
          <h2 className="h3 font-bold">{`${this.props.hackName} Edit Example`}</h2>

          <InputText
            containerClass="flex py-2 flex-between flex-align-center"
            inputClass="ml-2 flex-1"
            labelClass="h4 mr-3 mb-0"
            name="title"
            label="Title"
            value={this.state.exampleData.title || ''}
            onInputChange={this.onInputChanged}
            disabled={this.state.loading}
          />

          <MarkdownEditor
            editorLayout="tabbed"
            onEditorChange={this.onEditorChange}
            value={this.state.exampleData.content}
          />

          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row-reverse',
              height: '50px',
            }}
          >
            <Button
              primary
              width="150px"
              margin="0 0 0 15px"
              onClick={this.updateExample}
              disabled={this.state.loading}
            >
              Update
            </Button>
            <Button width="150px" onClick={this.cancelEdit}>
              Cancel
            </Button>
          </div>
        </Section>
      </>
    )
  }
}

export default withRouter(AdminExampleEditNotebook)
