import React from 'react';
import { Tag } from 'antd';
import AceEditor from 'react-ace';
// import 'ace-builds/src-noconflict/theme-chaos';
// import 'ace-builds/src-noconflict/mode-python';

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

        <AceEditor
          readOnly
          placeholder='--'
          mode='markdown'
          theme={codeTheme}
          name='error'
          style={{
            maxWidth: '700px',
            padding: '10px',
            margin: '10px 0px'
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

export { NotebookErrorCell }
