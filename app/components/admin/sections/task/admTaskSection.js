// admTaskSection.js - Results Component


import React from 'react';

import styled, {ThemeProvider} from 'styled-components';
// Router
// import { Switch, Route, Redirect} from "react-router-dom";
// Customs components
import MarkdownEditor from '../../../markdownEditor/markdownEditor.js';
import AvailableActionsDiv from '../../../../utilities/availableActionsDiv.js';
import Button from '../../../../utilities/button.js';


import {Theme} from '../../theme';

const styles = Theme.STYLES.adminInnerSectionsTheme;

// Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: 100%;
  padding: 25px 50px 50px 50px;
`;

class AdmTaskSection extends React.Component {
  onEditorChange = (markdown) => {
    this.props.onTaskMarkdownUpdate(markdown);
  };

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

export default AdmTaskSection;
