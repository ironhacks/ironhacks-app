import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

function AdminImageUpload(props) {
  const [files, setFiles] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      if (props.onFilesChanged) {
        props.onFilesChanged(acceptedFiles)
      }

      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
    maxFiles: props.maxFiles,
  })

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  return (
    <section className={props.containerClass}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <aside className="dropzone_preview dropzone_control">
          <div className="preview_img__outer">
            <div className="preview_img__inner">
              <div
                className="preview_img"
                style={{
                  backgroundImage: files[0]
                    ? `url(${files[0].preview})`
                    : `url(${props.initialImage})`,
                }}
              />
            </div>
          </div>
          <div className="label_container">
            <div className="label">
              <div className="label_text">{props.infoText}</div>
              <div className="label_size">{props.infoSize}</div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

AdminImageUpload.defaultProps = {
  containerClass: 'dropzone_container',
  infoText: 'Banner Image',
  infoSize: '1200 x 250',
  maxFiles: 1,
  initialImage: null,
}

export { AdminImageUpload }
