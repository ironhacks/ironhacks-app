import React from 'react';
import {
  Col,
  Row,
} from 'antd';


function NotebookImg({imgSrc}) {
  return (
    <Row>
      <Col span={1}/>
      <Col span={22}>
        <img
          alt='Notebook Cover'
          style={{
            display: imgSrc ? '' : 'none',
            width: '100%'
          }}
          src={imgSrc ? imgSrc : ''}
        />
      </Col>
      <Col span={1}/>
    </Row>
  )
}
export { NotebookImg }
