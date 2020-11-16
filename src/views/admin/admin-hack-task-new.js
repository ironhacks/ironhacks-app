import { Component } from 'react';
import MarkdownEditor from '../../components/markdown-editor';
import { InputText, InputCheckbox } from '../../components/input';
import Button from '../../util/button.js';
import { userMetrics } from '../../util/user-metrics'

class AdminHackTaskNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      surveyEnabled: false,
      title: '',
      content: '',
      survey: '',
      created: '',
      updated: '',
    }
  }

  componentDidMount(){
    this.getTaskDocsCount()
  }

  getTaskDocsCount = async () => {
    let snap = await window.firebase.firestore()
      .doc(`hacks/${this.props.hackId}`)
      .collection('tasks')
      .get()

    console.log(snap.docs.length)
    this.setState({title: `Task ${snap.docs.length + 1}`})
  }

  onEditorChange = markdown => this.setState({content: markdown})
  onSurveyChanged = (name, value) => this.setState({survey: value})
  onTitleChanged = (name, value) => this.setState({title: value})
  onSurveyEnabledChanged = (name, value) => this.setState({surveyEnabled: value})

  encodeDocument(str) {
    let safeString = unescape(encodeURIComponent(str));
    return window.btoa(safeString);
  }

  publishTask = async () => {
    this.setState({loading: true})

    let encodedTask = this.encodeDocument(this.state.content)
    let timeCreated = new Date()

    const taskDoc = await window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('tasks')
      .add({
        created: timeCreated.toISOString(),
        doc: encodedTask,
        survey: this.state.survey,
        surveyEnabled: this.state.surveyEnabled,
        title: this.state.title,
        updated: timeCreated.toISOString(),
      })

    userMetrics({
      event: 'task-created',
      taskId: taskDoc.id,
      hackId: this.props.hackId,
    })

    window.location = `/admin/hacks/${this.props.hackId}/tasks`
  }

  render() {
    return (
        <>
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
            editorLayout='tabbed'
            onEditorChange={this.onEditorChange}
            value={this.state.content}
            disabled={this.state.loading}
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
              onClick={this.publishTask}
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
      </>
    );
  }
}

export default AdminHackTaskNew;
