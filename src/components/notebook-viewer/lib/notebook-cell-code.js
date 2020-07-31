import React from 'react';
import AceEditor from 'react-ace';
// import 'ace-builds/src-noconflict/theme-chaos';
// import 'ace-builds/src-noconflict/mode-python';

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

  const editorStyle = {
    // maxWidth: '700px',
    padding: '0',
    margin: '0'
  }

  return (
    <div style={containerStyle}>
      <AceEditor
        readOnly
        placeholder='---'
        mode='python'
        className="ace-chaos"
        theme={codeTheme}
        name='code'
        style={editorStyle}
        width='100%'
        maxLines={maxLength}
        onLoad={onLoad}
        onChange={onChange}
        fontSize={14}
        showGutter={true}
        value={cellContent}
        setOptions={displayOptions}
      />
    </div>
  )
}


export { NotebookCodeCell }
