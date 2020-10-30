import {Controlled as CodeMirror} from 'react-codemirror2'

function NotebookErrorCell({
  codeTheme,
  display,
  cellContent,
  displayOptions,
  imgSrc,
  maxLength,
}) {
  const cellStyle = {
    padding: '5px 3px',
    display: display
  }

  return (
      <div style={cellStyle}>
        <CodeMirror
          value={cellContent}
          className=""
          style={{
            padding: '0',
            margin: '0',
          }}
          options={displayOptions}
        />
      </div>
  )
}

export { NotebookErrorCell }
