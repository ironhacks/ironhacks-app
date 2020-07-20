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

  onFiles(_files) {
    let fileList = this.state.fileList;
    let files = this.state.files;

    console.log('files added', _files)
    console.log('fileList', fileList)

    _files.forEach((item, i) => {
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

  removeFile(position) {
    let files = this.state.files;
    let newFiles = files.filter((item, index)=>{
      return index !== position;
    })

    this.setState({files: newFiles});
  }

  render() {
    return (
      <Dropzone onDrop={this.onFiles}>
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
