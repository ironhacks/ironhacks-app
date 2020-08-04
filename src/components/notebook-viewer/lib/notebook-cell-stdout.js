import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2'
import { Tag } from 'antd';

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
        padding: '5px 3px',
        display: display,
      }}>

      <Tag color='#2db7f5'>
        stdout
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

export { NotebookStdOut }
