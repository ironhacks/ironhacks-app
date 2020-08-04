import React from 'react';
import { Tag } from 'antd';
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
        <Tag color='#f50'>
          error
        </Tag>

        <br/>

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

export { NotebookErrorCell }
