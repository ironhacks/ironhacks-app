import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import MarkdownEditor from '../../components/markdownEditor/markdownEditor.js';
import Button from '../../util/button.js';
import { Theme } from '../../theme';


const AvailableActionsDiv = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  height: 50px;
`;


const styles = Theme.STYLES.adminInnerSectionsTheme;
const SectionContainer = styled('div')`
  width: 100%;
  height: 100%;
  padding: 25px 50px 50px 50px;
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
      <ThemeProvider theme={styles}>
        <SectionContainer>
          <h2>Task document editor</h2>

          <p>
            Here you can edit and preview the Task document. You can also
            publish the document or schedule it (check bellow).
          </p>

          <MarkdownEditor
            editorLayout='tabbed'
            onEditorChange={this.onEditorChange}
            withContent={this.props.previousDocument}
          />

          <p>Here you will find the instrictions to publish your task.</p>

          <AvailableActionsDiv>
            <Button
              primary
              width='150px'
              margin='0 0 0 15px'
              onClick={this.props.updateTaskDocument}
            >
              Publish Task
            </Button>
          </AvailableActionsDiv>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default AdminHackTask;
