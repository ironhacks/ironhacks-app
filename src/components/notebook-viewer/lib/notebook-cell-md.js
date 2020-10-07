import React from 'react';
import { Row } from  '../../../components/layout';

function NotebookMdCell({
  bgColor,
  executionCount,
  gutterVisible,
  cellContent,
}) {

  const tagStyle = {
    padding: '5px',
    color: 'var(--red)',
    fontFamily: 'monospace',
    fontSize: '0.9em',
  }

  if (cellContent) {
    return (
      <Row rowClass="mt-1 mx-0 text-left flex flex-nowrap">
        <div className="px-0">
          <span style={tagStyle}>
            {`Out[${executionCount}]:`}
          </span>
        </div>

        <div className="flex-1">
          {cellContent}
        </div>
      </Row>
    )
  } else {
    return (<></>)
  }
}



export { NotebookMdCell }
