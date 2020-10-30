import {Controlled as CodeMirror} from 'react-codemirror2'

function NotebookStdOut({
  stdout_found,
  display,
  codeTheme,
  maxLength,
  cellContent,
  displayOptions,
}) {
  return (
      <div style={{
        padding: '0 3px .5em 3px',
        display: display,
      }}>
      <CodeMirror
        className=""
        value={cellContent}
        style={{
          padding: '0',
          margin: '0',
        }}
        options={displayOptions}
      />
    </div>
  )
}

export { NotebookStdOut }
