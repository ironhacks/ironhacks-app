import { Component } from 'react'
import MarkdownEditor from '../../components/markdown-editor'
import { InputText, InputCheckbox } from '../../components/input'
import { Button } from '../../components/buttons'
import { userMetrics } from '../../util/user-metrics'
import { withRouter } from 'react-router-dom'
import { Section } from '../../components/layout'
import { saveSuccessModal } from '../../components/alerts'

class AdminHackTaskEdit extends Component {
  constructor(props) {
    super(props)

    this.taskId = this.props.match.params.taskId

    this.state = {
      loading: true,
      content: '',
      created: '',
      survey: '',
      surveyEnabled: false,
      title: '',
      updated: '',
    }
  }

  componentDidMount() {
    this.getTask()
  }

  onEditorChange = (markdown) => this.setState({ content: markdown })
  onSurveyChanged = (name, value) => this.setState({ survey: value })
  onTitleChanged = (name, value) => this.setState({ title: value })
  onSurveyEnabledChanged = (name, value) => this.setState({ surveyEnabled: value })

  encodeDocument(str) {
    let safeString = unescape(encodeURIComponent(str))
    return window.btoa(safeString)
  }

  decodeDocument(enc) {
    let decoded = window.atob(enc)
    return decodeURIComponent(escape(decoded))
  }

  getTask = async () => {
    this.setState({ loading: true })

    let taskDoc = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('tasks')
      .doc(this.taskId)
      .get()

    let taskData = taskDoc.data()

    this.setState({
      loading: false,
      content: this.decodeDocument(taskData.doc),
      created: taskData.created,
      survey: taskData.survey,
      surveyEnabled: taskData.surveyEnabled,
      title: taskData.title,
      updated: taskData.updated,
    })
  }

  updateTaskDocument = async () => {
    this.setState({ loading: true })

    let encodedTask = this.encodeDocument(this.state.content)
    let timeUpdated = new Date()

    await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('tasks')
      .doc(this.taskId)
      .update({
        created: this.state.created,
        doc: encodedTask,
        survey: this.state.survey,
        surveyEnabled: this.state.surveyEnabled,
        title: this.state.title,
        updated: timeUpdated.toISOString(),
      })
      .then(() => {
        userMetrics({
          event: 'task-updated',
          taskId: this.taskId,
          hackId: this.props.hackId,
        })

        saveSuccessModal('Task')
        this.setState({ loading: false })
      })
  }

  render() {
    return (
      <>
        <Section sectionClass="py-2">
          <h2 className="h3 font-bold">{`${this.props.hackName} Edit Task`}</h2>

          <InputText
            containerClass="flex py-2 flex-between flex-align-center"
            inputClass="ml-2 flex-1"
            labelClass="h4 mr-3 mb-0"
            name="task_title"
            label="Title"
            value={this.state.title || ''}
            onInputChange={this.onTitleChanged}
            disabled={this.state.loading}
          />

          <InputCheckbox
            label="Enable Survey"
            name="surveyEnabled"
            onInputChange={this.onSurveyEnabledChanged}
            isChecked={this.state.surveyEnabled}
            disabled={this.state.loading}
          />

          {this.state.surveyEnabled && (
            <InputText
              containerClass="flex py-2 flex-between flex-align-center"
              inputClass="ml-2 flex-1"
              labelClass="h4 mr-3 mb-0"
              name="task_survey"
              label="Task Survey"
              value={this.state.survey || ''}
              onInputChange={this.onSurveyChanged}
              disabled={this.state.loading}
            />
          )}

          <MarkdownEditor
            editorLayout="tabbed"
            onEditorChange={this.onEditorChange}
            value={this.state.content}
            disabled={this.state.loading}
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
              onClick={this.updateTaskDocument}
              disabled={this.state.loading}
            >
              Publish
            </Button>
            <a
              href={`/hacks/${this.props.hackSlug}/task`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View live document
            </a>
          </div>
        </Section>
      </>
    )
  }
}

export default withRouter(AdminHackTaskEdit)
