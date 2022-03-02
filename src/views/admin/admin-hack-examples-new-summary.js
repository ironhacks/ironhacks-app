import { Component } from 'react'
import MarkdownEditor from '../../components/markdown-editor'
import { Button } from '../../components/buttons'
import { InputText } from '../../components/input'
import { userMetrics } from '../../util/user-metrics'
import { Section } from '../../components/layout'

class AdminExampleNewSummary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exampleData: {
        title: '',
        content: '',
      },
      loading: false,
    }
  }

  onEditorChange = (value) => {
    let data = this.state.exampleData
    data.content = value
    this.setState({ exampleData: data })
  }

  cancelNew = () => {
    window.history.back()
  }

  onInputChanged = (name, value) => {
    let data = this.state.exampleData
    data[name] = value
    this.setState({ exampleData: data })
  }

  publishExample = async () => {
    this.setState({ loading: true })

    let data = this.state.exampleData
    data.content = data.content.trim()

    let doc = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('examples_summary')
      .add(data)

    userMetrics({
      event: 'example-created',
      exampleId: doc.id,
      hackId: this.props.hackId,
    })

    this.setState({ loading: false })
    window.location = `/admin/hacks/${this.props.hackId}/examples`
  }

  render() {
    return (
      <>
        <Section sectionClass="py-2">
          <h2 className="h3 font-bold">{`${this.props.hackName} New Example`}</h2>

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
              onClick={this.publishExample}
              disabled={this.state.loading}
            >
              Create
            </Button>
            <Button width="150px" onClick={this.cancelNew}>
              Cancel
            </Button>
          </div>
        </Section>
      </>
    )
  }
}

export default AdminExampleNewSummary
