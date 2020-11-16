import { useEffect, useState } from 'react';
import {useDropzone} from 'react-dropzone';

function AdminFileUpload(props) {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'text/*, .csv, .tsv',
    onDrop: acceptedFiles => {
      if (props.onFilesChanged) {
        props.onFilesChanged(acceptedFiles)
      }

      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })))
    },
    maxFiles: props.maxFiles,
  })

  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files])

  return (
    <div>
      <section className={props.containerClass}>
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <button className="dropzone_control btn button mb-4 btn-info btn-block btn-sm">Select</button>
        </div>
      </section>

      <div className='label_text font-bold'>
        {props.infoText}
      </div>

      <ul className="preview_list">
      {files.length > 0 ? (
      <>
      {files.map((item, index)=>(
        <li key={index} className='preview_list__item'>
          {item.name}
        </li>
      ))}
      </>
      ) : (
      <>
      {props.initialFiles.map((item, index)=>(
        <li key={index} className='preview_list__item'>
          {item.name}
        </li>
      ))}
      </>
      )}
      </ul>
    </div>
  )
}

AdminFileUpload.defaultProps = {
  containerClass: 'dropzone_container',
  infoText: 'Files',
  maxFiles: 1,
  initialFiles: [],
}


export { AdminFileUpload }
