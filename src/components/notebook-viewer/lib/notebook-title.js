import React from 'react';
import {
  Col,
  Row,
  Typography,
} from 'antd';

function NotebookTitle ({title, subtitle, titleColor}) {
  return (
    <Row style={{
      margin: '1em 0 1.5em',
    }}>
      <Col span={1}/>
      <Col span={22}>
        <Typography.Title
          strong
          style={{
            color: titleColor,
            wordWrap: 'break-word',
            width: '100%',
          }}>
          {title}
        </Typography.Title>

        <Typography.Title
          level={4}
          style={{
            color: titleColor,
            wordWrap: 'break-word',
            margin: '.5em 0 0 0',
            width: '100%',
            display: subtitle ? '' : 'none'
          }}>
            {subtitle}
        </Typography.Title>
      </Col>

      <Col span={1}/>
    </Row>
  )
}

export { NotebookTitle }
