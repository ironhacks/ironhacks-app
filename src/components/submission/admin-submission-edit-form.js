import { Component } from 'react';
import DatePicker from 'react-datepicker';
import MarkdownEditor from '../../components/markdown-editor';
import 'react-datepicker/dist/react-datepicker.css';
import { InputText, InputCheckbox } from '../input';
import { fire2Date } from '../../util/date-utils'
import { AdminFileUpload } from '../../components/admin'

const filterUrl = (path) => {
  return path.toLowerCase()
    .replace(/[^a-zA-Z0-9- ]/g, '')
    .replace(/ /g, '-')
}

class AdminSubmissionEditForm extends Component {
  constructor(props) {
    super(props);

    let defaultSubmission = {
      loading: false,
      deadline: '',
      submissionId: '',
      name: '',
      description: '',
      survey: '',
      fields: [],
      files: [],
    }

    let stateData = Object.assign({}, defaultSubmission, this.props.submissionData);
    stateData.deadline = fire2Date(stateData.deadline);

    this.state = stateData;
  }

  cancelChanges = () => {
    if (this.props.onCancelEdit) {
      this.props.onCancelEdit()
    }
  };

  addFile = () => {
    let _files = this.state.files;
    _files.push({
      name: '',
      required: false,
    })
    this.setState({files: _files})
  };

  removeFile = index => {
    let _files = this.state.files;
    delete _files[index];
    _files = [..._files.slice(0, index), ..._files.slice(index + 1, _files.length)]
    this.setState({files: _files})
  };

  addField = () => {
    let _fields = this.state.fields;
    _fields.push({
      title: '',
      type: 'textarea',
      required: true,
    })
    this.setState({fields: _fields})
  };

  removeField = index => {
    let _fields = this.state.fields;
    delete _fields[index];
    _fields = [..._fields.slice(0, index), ..._fields.slice(index + 1, _fields.length)]
    this.setState({fields: _fields})
  };

  onFormDataChanged = (name, value) => {
    let form = this.state;
    form[name] = value;
    this.setState(form)
  };

  onFormDescriptionChanged = content => {
    this.setState({
      description: content,
    })
  };

  onSubmissionIdChanged = (name, value) => {
    let id = filterUrl(value.trim());
    this.setState({submissionId: id})
  };

  onFileChanged = (name, value, index) => {
    let files = this.state.files;
    files[index][name] = value;
    this.setState({files: files});
  }

  onFieldChanged = (name, value, index) => {
    let fields = this.state.fields;
    fields[index][name] = value;
    this.setState({fields: fields});
  }

  onSolutionAdded = (solutionFiles) => {
    this.setState({loading: true})

    var storageRef = window.firebase.storage().ref()
    var solutionFileRef = storageRef.child(`/data/hacks/${this.props.hackId}/solutions/${this.props.submissionId}/${solutionFiles[0].name}`)

    solutionFileRef
      .put(solutionFiles[0])
      .then((snapshot) => {
        let fileRef = snapshot.ref
        fileRef.getDownloadURL().then(downloadURL=>{
          let solutionData = {
            name: solutionFileRef.name,
            path: solutionFileRef.fullPath,
            url: downloadURL,
          }

          window.firebase.firestore()
            .collection('hacks')
            .doc(this.props.hackId)
            .collection('submissions')
            .doc('solutions')
            .set({
              [this.props.submissionId]: solutionData,
            }, {merge: true})
            .then(()=>{
              this.setState({
                submitDisabled: false,
                loading: false,
              })
            })
        })
      })

  }

  saveChanges = () => {

    let data = {
      deadline: this.state.deadline,
      submissionId: this.state.submissionId,
      name: this.state.name,
      description: this.state.description,
      survey: this.state.survey,
      fields: this.state.fields,
      files: this.state.files,
    }

    if (!data.name){
      console.log('please fill out the form');
      return false;
    }

    if (!data.submissionId){
      data.submissionId = filterUrl(data.name);
    }

    if (this.props.onSaveSubmission) {
      this.props.onSaveSubmission(data);

      this.setState({
        deadline: '',
        submissionId: '',
        name: '',
        description: '',
        survey: '',
        fields: [],
        files: [],
      })
    }
  };

  render() {
    return (
      <div className="mt-3 p-2 px-4" style={{ border: '1px solid rgba(0,0,0,.2)'}}>
        <h3 className="h3" style={{verticalAlign: 'center'}}>
          {this.props.submissionId}
        </h3>

        <InputText
          containerClass="py-1 flex flex-between"
          inputClass="mx-2 flex-1"
          labelClass="flex-1 h4"
          name="name"
          label="Name"
          value={this.state.name || ''}
          onInputChange={this.onFormDataChanged}
        />

        <InputText
          containerClass="py-1 flex flex-between"
          inputClass="mx-2 flex-1"
          labelClass="flex-1 h4"
          name="submissionId"
          label="Submission Id"
          value={this.state.submissionId || ''}
          onInputChange={this.onSubmissionIdChanged}
          disabled={true}
        />

        <div className="flex py-1 flex-between">
          <h3 className="h4 flex-1">
            Deadline
          </h3>

          <div className="pr-2 flex-1">
            <DatePicker
              selected={this.state.deadline}
              onChange={(value)=>this.onFormDataChanged('deadline', value)}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="yyyy-MM-dd h:mm aa"
              timeCaption="time"
              timeIntervals={15}
            />
          </div>
        </div>

        <InputText
          containerClass="py-1 flex flex-between"
          inputClass="mx-2 flex-1"
          labelClass="h4 mr-3"
          name="survey"
          label="Survey Url"
          value={this.state.survey || ''}
          onInputChange={this.onFormDataChanged}
        />


        <h3 className="h4 pr-4">
          Description
        </h3>

        <MarkdownEditor
          editorLayout='tabbed'
          height={300}
          onEditorChange={this.onFormDescriptionChanged}
          value={this.state.description}
          disabled={this.state.loading}
        />

        <h3 className="mt-3 h4">
          Submission Fields
        </h3>

        <div className="flex py-1 flex-between my-2">
          <div className="flex flex-col w-full">
            {this.state.fields.map((item, index)=>(
              <div key={index} className="pr-2 flex flex-align-center">
                <InputText
                  containerClass="py-1 flex flex-1 flex-between flex-align-center"
                  inputClass="mx-2 flex-1"
                  labelClass="h4 mb-0 mr-3"
                  name="title"
                  label="Title"
                  value={item.title || ''}
                  onInputChange={((name, value)=>{this.onFieldChanged(name, value, index)})}
                />
                <InputCheckbox
                  name='required'
                  label='Required'
                  containerClass='my-0 mr-2 badge badge-dark flex flex-align-center'
                  labelClass='mr-2'
                  inputClass=''
                  isChecked={item.required}
                  onInputChange={((name, value)=>{this.onFieldChanged(name, value, index)})}
                />
                <div
                  className="btn btn-outline-danger ml-2 px-1 py-0"
                  onClick={()=>{this.removeField(index)}}
                  >
                  X
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="btn btn-outline-dark btn-sm font-bold px-4"
          onClick={this.addField}
          >
          +Add Fields
        </button>

        <div className="flex py-1 flex-between my-2">
          <h3 className="h4">
            Submission Files
          </h3>

          <div className="flex flex-col">
            {this.state.files.map((item, index)=>(
              <div key={index} className="pr-2 flex flex-align-center">
                <InputText
                  containerClass="flex py-1 flex-between flex-align-center"
                  inputClass="mx-2 flex-1"
                  labelClass="flex-1 h4 mb-0"
                  name="name"
                  label="Filename"
                  value={item.name || ''}
                  onInputChange={((name, value)=>{this.onFileChanged(name, value, index)})}
                />
                <InputCheckbox
                  name='required'
                  label='Required'
                  containerClass='my-0 mr-2 badge badge-dark flex flex-align-center'
                  labelClass='mr-2'
                  inputClass=''
                  isChecked={item.required}
                  onInputChange={((name, value)=>{this.onFileChanged(name, value, index)})}
                />
                <div
                  className="btn btn-outline-danger ml-2 px-1 py-0"
                  onClick={()=>{this.removeFile(index)}}
                >
                  X
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="btn btn-outline-dark btn-sm font-bold px-4"
          onClick={this.addFile}
          >
          +Add Files
        </button>

        <div className="py-2 mt-3">
          <h3 className="h4 font-bold">
            Attach Solution
          </h3>

          <p className="fs-m1 font-italic">
            *Optional: Store the submission solution file for retrieval during evalution stage
          </p>

          <AdminFileUpload
            disabled={this.state.loading}
            onFilesChanged={this.onSolutionAdded}
            initialFiles={this.props.solutionFiles}
            containerClass='dropzone_container fs-m2'
            infoText='Solution File:'
            maxFiles={1}
          />
        </div>

        <div className="flex justify-content-between py-2 mt-3">
          <button
            className="btn btn-sm btn-dark px-8"
            onClick={this.cancelChanges}
          >
            Cancel Edit
          </button>

          <button
            className="btn btn-sm btn-success px-8"
            onClick={this.saveChanges}
          >
            Save Submission
          </button>
        </div>
      </div>
    )
  }
}

export { AdminSubmissionEditForm }
