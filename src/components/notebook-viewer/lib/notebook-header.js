import React from 'react';
import { Col, Row } from '../../../components/layout';
import { userMetrics } from '../../../util/user-metrics'

function NotebookHeader({title, fileUrl, fileName}) {
  const downloadNotebookFile = () => {
    window.firebase.analytics().logEvent('download_file', {type: 'notebook_file'})
    userMetrics({
      event: 'download_file',
      data: {
        fileType: 'notebook_file',
        filePath: fileUrl,
      }
    })

    fetch(fileUrl, {
      method: 'GET',
    })
    .then(response => response.text())
    .then(fileContents => {
      var element = window.document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContents));
      element.setAttribute('download', fileName);
      element.style.display = 'none';
      window.document.body.appendChild(element);
      element.click();
      window.document.body.removeChild(element);
    }).catch(error => console.error(error));

  }

  return (
    <Row rowClass="bg-grey-lt2 mx-0 py-2">
      <Col>
        <h1 className="h4">
          {title}
        </h1>

        {fileName && (
          <h2 className="h3 mb-0">
            {fileName}
            <div className="badge btn btn-outline-info ml-2" onClick={downloadNotebookFile}>
              Download
            </div>
          </h2>
        )}

      </Col>
    </Row>
  )
}

export { NotebookHeader }
