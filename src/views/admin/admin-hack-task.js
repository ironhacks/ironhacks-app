import React from 'react';
import styled from 'styled-components';
import MarkdownEditor from '../../components/markdownEditor/markdownEditor.js';
import Button from '../../util/button.js';
import { Row, Col } from '../../components/layout';

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
    this.props.onTaskMarkdownUpdate(markdown);
  }

  render() {
    return (
        <>
          <h2 className="pb-2">
            Hack Task Document Editor
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
              onClick={this.props.updateTaskDocument}
            >
              Publish
            </Button>
          </AvailableActionsDiv>
      </>
    );
  }
}

export default AdminHackTask;
