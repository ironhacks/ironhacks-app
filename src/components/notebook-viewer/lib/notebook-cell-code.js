import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2'

function NotebookCodeCell({
  bgColor,
  codeTheme,
  maxLength,
  onLoad,
  onChange,
  cellContent,
  displayOptions,
}) {

  const containerStyle = {
    padding: '5px 0px',
    borderColor: 'rgba(0,0,0,.4)',
    borderStyle: 'solid',
    borderWidth: '0',
    backgroundColor: bgColor,
  }

  return (
    <div style={containerStyle}>
      <CodeMirror
        value={cellContent}
        className=""
        style={{
          padding: '0',
          margin: '0',
        }}
        options={{
          lineNumbers: true,
          mode: 'python',
          lint: false,
          theme: 'seti',
          tabSize: 2,
          lineWrapping: true,
          matchBrackets: false,
          matchTags: false,
          autoCloseTags: false,
          autoCloseBrackets: false,
          readOnly: true,
        }}
      />
    </div>
  )
}


export { NotebookCodeCell }
