import {Controlled as CodeMirror} from 'react-codemirror2'

function NotebookText({
  display,
  codeTheme,
  maxLength,
  cellContent,
  displayOptions,
}) {
  return (
    <div style={{
       display: display,
     }}>
      <CodeMirror
        value={cellContent}
        className="notebook-text"
        style={{
          padding: '0',
          margin: '0',
        }}
        options={displayOptions}
      />
    </div>
  )
}

export { NotebookText }
