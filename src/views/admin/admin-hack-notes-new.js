import { Component } from 'react'
import MarkdownEditor from '../../components/markdown-editor'
import { Button } from '../../components/buttons'
import { InputText } from '../../components/input'
import { userMetrics } from '../../util/user-metrics'
import { Section } from '../../components/layout'

class AdminNoteNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      noteData: {
        title: '',
        content: '',
        created_at: '',
        updated: '',
        tags: [],
        created_by: '',
        email: '',
        photo_url: '',
        uid: '',
      },
      loading: false,
    }
  }

  onEditorChange = (value) => {
    let data = this.state.noteData
    data.content = value
    this.setState({ noteData: data })
  }

  cancelNew = () => {
    window.history.back()
  }

  onInputChanged = (name, value) => {
    let data = this.state.noteData
    data[name] = value
    this.setState({ noteData: data })
  }

  publishNote = async () => {
    this.setState({ loading: true })

    let timeUpdated = new Date()
    let data = this.state.noteData
    data.content = data.content.trim()
    data.created = timeUpdated.toISOString()
    data.updated = timeUpdated.toDateString()
    data.created_by = this.props.username
    data.created_at = timeUpdated.toDateString()
    data.email = this.props.useremail
    data.photo_url = this.props.userphotourl
    data.uid = this.props.nid

    let doc = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('notes')
      .add(data)

    userMetrics({
      event: 'note-created',
      noteId: doc.id,
      hackId: this.props.hackId,
    })

    this.setState({ loading: false })
    window.location = `/admin/hacks/${this.props.hackId}/notes`
  }

  render() {
    return (
      <>
        <Section sectionClass="py-2">
          <h2 className="h3 font-bold">{`${this.props.hackName} New Note`}</h2>

          <InputText
            containerClass="flex py-2 flex-between flex-align-center"
            inputClass="ml-2 flex-1"
            labelClass="h4 mr-3 mb-0"
            name="title"
            label="Title"
            value={this.state.noteData.title || ''}
            onInputChange={this.onInputChanged}
            disabled={this.state.loading}
          />

          <MarkdownEditor
            editorLayout="tabbed"
            onEditorChange={this.onEditorChange}
            value={this.state.noteData.content}
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
              onClick={this.publishNote}
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

export default AdminNoteNew
