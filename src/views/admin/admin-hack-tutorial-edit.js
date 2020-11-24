import { Component } from 'react';
import MarkdownEditor from '../../components/markdown-editor';
import { InputText } from '../../components/input';
import Button from '../../util/button';
import { withRouter } from 'react-router-dom'
import { userMetrics } from '../../util/user-metrics'
import { Section } from '../../components/layout'

class AdminTutorialEdit extends Component {
  constructor(props) {
    super(props);

    this.tutorialId = this.props.match.params.tutorialId

    this.state = {
      tutorialData: {
        title: '',
        slug: '',
        content: '',
        created: '',
        updated: '',
        tags: [],
      },
      loading: true,
    }
  }

  componentDidMount() {
    this.getTutorial()
  }

  onEditorChange = value => {
    let data = this.state.tutorialData
    data.content = value
    this.setState({tutorialData: data})
  }

  onInputChanged = (name, value) => {
    let data = this.state.tutorialData
    data[name] = value
    this.setState({tutorialData: data})
  }

  getTutorial = async () => {
    let doc = await window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('tutorials')
      .doc(this.tutorialId)
      .get()

    let tutorial = {
      tutorialId: this.tutorialId,
      ...doc.data()
    }

    this.setState({
      tutorialData: tutorial,
      loading: false,
    })
  }

  updateTutorial = async () => {
    this.setState({loading: true})

    let timeUpdated = new Date()
    let data = this.state.tutorialData
    data.updated = timeUpdated.toISOString()
    data.content = data.content.trim()

    await window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('tutorials')
      .doc(this.tutorialId)
      .update(data)

    userMetrics({
      event: 'tutorial-created',
      tutorialId: this.tutorialId,
      hackId: this.props.hackId,
    })

    this.setState({loading: false})
    window.location = `/admin/hacks/${this.props.hackId}/tutorials`
  }

  cancelEdit = () => {
    window.history.back()
  }

  render() {
    return (
      <>
        <Section sectionClass="py-2">
          <h2 className="h3 font-bold">
            {`${this.props.hackName} Edit Tutorial`}
          </h2>

          <InputText
            containerClass="flex py-2 flex-between flex-align-center"
            inputClass="ml-2 flex-1"
            labelClass="h4 mr-3 mb-0"
            name="title"
            label="Title"
            value={this.state.tutorialData.title || ''}
            onInputChange={this.onInputChanged}
            disabled={this.state.loading}
          />

          <MarkdownEditor
            editorLayout='tabbed'
            onEditorChange={this.onEditorChange}
            value={this.state.tutorialData.content}
          />

          <div style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row-reverse',
            height: '50px',
          }}>
            <Button
              primary
              width='150px'
              margin='0 0 0 15px'
              onClick={this.updateTutorial}
            >
              Publish
            </Button>
            <a
              href={`/hacks/${this.props.hackSlug}/tutorials/${this.tutorialId}`}
              target="_blank"
              rel="noopener noreferrer"
              >
              View live document
            </a>
            <Button
              width='150px'
              onClick={this.cancelEdit}
            >
              Cancel
            </Button>
          </div>
        </Section>
      </>
    )
  }
}

export default withRouter(AdminTutorialEdit)
