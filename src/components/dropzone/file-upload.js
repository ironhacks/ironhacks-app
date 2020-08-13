import React from 'react'
import Dropzone from 'react-dropzone'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      files: [],
      fileList: [],
    };
    this.onFiles = this.onFiles.bind(this)
    this.removeFile = this.removeFile.bind(this)
  }

  onFileStatus({ meta }, status) {
    console.log(status, meta)
  }

  onFiles(_files) {
    console.log('on files', _files);
    let fileList = this.state.fileList;
    let files = this.state.files;


    _files.forEach((item, i) => {
      if (this.props.acceptedFiles) {
        if (!this.props.acceptedFiles.includes(item.name)) {
          return false
        }
      }
      if(!fileList.includes(item.path)){
        files.push(item);
        fileList.push(item.path)
      }
    });

    this.setState({
      files: files,
      fileList: fileList,
    });

    if (this.props.onFilesChanged) {
      this.props.onFilesChanged(files)
    }
  }

  validateFile(files) {
    console.log('validate', files);
    return true
  }

  removeFile(position) {
    let files = this.state.files;
    let newFiles = files.filter((item, index)=>{
      return index !== position;
    })

    this.setState({files: newFiles});
  }

  render() {
    return (
      <Dropzone
        onDrop={this.onFiles}
        validate={this.validateFile}
        onChangeStatus={this.onFileStatus}
      >
        {({ getRootProps, getInputProps}) => (
          <section className="dropzone">
            <div {...getRootProps({style: baseStyle})}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop files here, or click to select files</p>
            </div>
            <aside>
              <h4>Files:</h4>

              <ul>
                {this.state.files.map((file, index) => (
                  <li key={file.path}>
                    {file.path} - {file.size} bytes
                    <span
                      style={{
                        display: 'inline',
                        cursor: 'pointer',
                        fontSize: '1.2em',
                        padding: '0 1em',
                      }}
                      onClick={(() => {this.removeFile(index)})}
                      >
                      X
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          </section>
        )}
      </Dropzone>
    )
  }
}

export { FileUpload }
