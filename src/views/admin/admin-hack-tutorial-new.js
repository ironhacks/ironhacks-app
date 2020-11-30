import { Component } from 'react'
import MarkdownEditor from '../../components/markdown-editor'
import { Button } from '../../components/buttons'
import { InputText } from '../../components/input'
import { userMetrics } from '../../util/user-metrics'
import { Section } from '../../components/layout'

class AdminTutorialNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorialData: {
        title: '',
        slug: '',
        content: '',
        created: '',
        updated: '',
        tags: [],
      },
      loading: false,
    }
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

  publishTutorial = async () => {
    this.setState({loading: true})

    let timeUpdated = new Date()
    let data = this.state.tutorialData
    data.content = data.content.trim()
    data.created = timeUpdated.toISOString()
    data.updated = timeUpdated.toISOString()

    let doc = await window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('tutorials')
      .add(data)

    userMetrics({
      event: 'tutorial-created',
      tutorialId: doc.id,
      hackId: this.props.hackId,
    })

    this.setState({loading: false})
    window.location = `/admin/hacks/${this.props.hackId}/tutorials`
  }

  render() {
    return (
      <>
        <Section sectionClass="py-2">
          <h2 className="h3 font-bold">
            {`${this.props.hackName} New Tutorial`}
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
              onClick={this.publishTutorial}
              disabled={this.state.loading}
            >
              Publish
            </Button>
          </div>
        </Section>
      </>
    )
  }
}

export default AdminTutorialNew;
