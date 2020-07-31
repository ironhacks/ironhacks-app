import React from 'react';
import { Tag } from 'antd';

function NotebookImgCell({
  display,
  imgSrc,
}) {
  return (
    <div style={{display: display}}>
      <Tag color='#87d068'>
        data:image/png
      </Tag>

      <br/>

      <img
        src={imgSrc}
        alt="Notebook Cell Figure"
        style={{
          display: display,
          width: '100%',
          backgroundColor: 'white'
        }}
      />
    </div>
  )
}

export { NotebookImgCell }
