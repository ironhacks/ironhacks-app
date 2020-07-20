import React from 'react';
import styled from 'styled-components';
import MarkdownEditor from '../../components/markdownEditor/markdownEditor.js';
import Button from '../../util/button.js';

const AvailableActionsDiv = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  height: 50px;
`;

class AdminHackTask extends React.Component {
  constructor(props) {
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
  }

  onEditorChange(markdown) {
    this.props.onDocumentChange(markdown);
  }

  render() {
    return (
        <>
          <h2 className="pb-2">
            Hack Rules Document
          </h2>

          <MarkdownEditor
            editorLayout='tabbed'
            onEditorChange={this.onEditorChange}
            withContent={this.props.previousDocument}
          />

          <AvailableActionsDiv>
            <Button
              primary
              width='150px'
              margin='0 0 0 15px'
              onClick={this.props.updateDocument}
            >
              Publish
            </Button>
          </AvailableActionsDiv>
      </>
    );
  }
}

export default AdminHackTask;
