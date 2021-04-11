import { Component } from 'react'
import MarkdownEditor from '../../components/markdown-editor'
import { InputText } from '../../components/input'
import { Button } from '../../components/buttons'
import { withRouter } from 'react-router-dom'
import { userMetrics } from '../../util/user-metrics'
import { Section } from '../../components/layout'
import userDetails from './admin-hack-notes-new'

class AdminNoteEdit extends Component {
  constructor(props) {
    super(props)

    this.noteId = this.props.match.params.noteId

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

  componentDidMount() {
    this.getNote()
  }

  onEditorChange = (value) => {
    let data = this.state.noteData
    data.content = value
    this.setState({ noteData: data })
  }

  onInputChanged = (name, value) => {
    let data = this.state.noteData
    data[name] = value
    this.setState({ noteData: data })
  }

  getNote = async () => {
    this.setState({ loading: true })

    let doc = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('notes')
      .doc(this.noteId)
      .get()

    let note = {
      noteId: this.noteId,
      ...doc.data(),
    }

    this.setState({
      noteData: note,
      loading: false,
    })
  }

  updateNote = async () => {
    this.setState({ loading: true })

    let timeUpdated = new Date()
    let data = this.state.noteData
    data.updated = timeUpdated.toDateString()
    data.created = timeUpdated.toISOString()
    data.content = data.content.trim()
    data.created_by = userDetails.name
    data.email = userDetails.email
    data.photo_url = userDetails.photo
    data.uid = userDetails.nid

    await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('notes')
      .doc(this.noteId)
      .update(data)

    userMetrics({
      event: 'note-created',
      noteId: this.noteId,
      hackId: this.props.hackId,
    })

    this.setState({ loading: false })
    window.location = `/admin/hacks/${this.props.hackId}/notes`
  }

  cancelEdit = () => {
    window.history.back()
  }

  render() {
    return (
      <>
        <Section sectionClass="py-2">
          <h2 className="h3 font-bold">{`${this.props.hackName} Edit Note`}</h2>

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
              onClick={this.updateNote}
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

export default withRouter(AdminNoteEdit)
