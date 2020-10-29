import React from 'react';
import MarkdownEditor from '../../components/markdown-editor';
import { InputText } from '../../components/input';
import Button from '../../util/button.js';


class AdminHackTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      content: '',
      survey: '',
      updated: '',
    }
  }

  componentDidMount(){
    this.getTask();
  }

  getTask = () => {
    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .get()
      .then((doc)=>{
        let data = doc.data()
        let task = data.task;
        this.setState({
          content: this.decodeDocument(task.doc),
          survey: task.survey,
          updated: task.updated,
          loading: false,
        })
      })

    // TODO: MULTIPLE TASK DOCS
    // window.firebase.firestore()
    //   .collection('hacks')
    //   .doc(this.props.hackId)
    //   .collection('tasks')
    //   .get()
    //   .then((docs)=>{
    //     let tasks = [];
    //     docs.forEach((item, index) => {
    //       tasks.push(item.data())
    //     });
    //     this.setState({ tasks: tasks })
    //   })
  };

  encodeDocument(str) {
    let safeString = unescape(encodeURIComponent(str));
    return window.btoa(safeString);
  }

  decodeDocument(enc) {
    let decoded = window.atob(enc);
    return decodeURIComponent(escape(decoded));
  }

  onEditorChange = markdown => {
    this.setState({content: markdown})
  };

  onSurveyChanged = (name, value) => {
    this.setState({survey: value})
  };

  updateTaskDocument = () => {
    this.setState({ loading: true })
    let encodedTask = this.encodeDocument(this.state.content);
    let timeUpdated = new Date();

    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .update({
        task: {
          survey: this.state.survey,
          updated: timeUpdated.toISOString(),
          doc: encodedTask,
        }
      })
      .then(() => {
        this.setState({loading: false})
        window.location.reload();
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };

  render() {
    return (
        <>
          <h2 className="pb-2">
            Hack Task Document Editor
          </h2>

          <InputText
            containerClass="flex py-2 flex-between flex-align-center"
            inputClass="ml-2 flex-1"
            labelClass="h4 mr-3 mb-0"
            name="task_survey"
            label="Task Survey"
            value={this.state.survey || ''}
            onInputChange={this.onSurveyChanged}
          />

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
              onClick={this.updateTaskDocument}
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

export default AdminHackTask;
