import React from 'react';
import {
  Col,
  Row,
  Typography,
} from 'antd';

function NotebookMdCell({
  display,
  bgColor,
  executionCount,
  gutterVisible,
  cellContent,
}) {
  const cellStyle = {
    display: display ? '' : 'none',
    // color: bgColor || '#E5496A',
    float: 'left',
    padding: '5px',
  }

  const gutterStyle = {
    textAlign: 'left',
  }

  const rowStyle = {
    display: display,
  }

  return (
    <Row style={rowStyle}>
      <Col span={gutterVisible}>
        <Typography.Text style={cellStyle}>
          O [{executionCount}]:
        </Typography.Text>
      </Col>

      <Col
        span={gutterVisible ? 20 : 22}
        style={gutterStyle}>
          {cellContent}
      </Col>
      <Col span={1}/>
    </Row>
  )
}



export { NotebookMdCell }
