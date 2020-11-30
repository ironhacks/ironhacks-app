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
    whiteSpace: 'nowrap',
    fontSize: '0.9em',
  }

  if (!executionCount) {
    executionCount = '  '
  }

  if (cellContent) {
    return (
      <Row rowClass="mt-1 mx-0 text-left flex flex-nowrap">
        <span style={tagStyle}>
          {`Out[${executionCount}]:`}
        </span>

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
