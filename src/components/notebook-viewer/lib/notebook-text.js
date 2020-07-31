import React from 'react';
import AceEditor from 'react-ace';
// import 'ace-builds/src-noconflict/theme-chaos';
// import 'ace-builds/src-noconflict/mode-python';

function NotebookText({
  display,
  codeTheme,
  maxLength,
  cellContent,
  displayOptions,
}) {

  //
  // <Tag
  //   color='#333333'
  //   style={{
    //     fontSize: '.9em',
    //     color: 'inherit',
    //     backgroundColor: 'inherit',
    //   }}
    //   >
    //   data:text/plain
    // </Tag>
    // <br/>
  return (
    <div style={{
       padding: '5px 3px',
       display: display,
     }}>
      <AceEditor
        readOnly
        placeholder='--'
        mode='markdown'
        theme={codeTheme}
        name='text'
        style={{
          padding: '10px',
          margin: '10px 0px',
          verticalAlign: 'middle',
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

export { NotebookText }
