import React from 'react';
import AceEditor from 'react-ace';
// import 'ace-builds/src-noconflict/mode-python';
// import 'ace-builds/src-noconflict/theme-chaos';

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

      <AceEditor
        readOnly
        placeholder='--'
        mode='markdown'
        theme={codeTheme}
        name='stdout'
        style={{
          maxWidth: '700px',
          padding: '10px',
          margin: '10px 0px',
        }}
        width='100%'
        maxLines={maxLength}
        fontSize={14}
        showPrintMargin={false}
        showGutter={false}
        highlightActiveLine={false}
        value={cellContent}
        setOptions={displayOptions}
      />
    </div>
  )
}

export { NotebookStdOut }
