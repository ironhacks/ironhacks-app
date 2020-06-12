import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
// import { Switch, Route, Redirect} from "react-router-dom";
import MarkdownEditor from '../../../components/markdownEditor/markdownEditor.js';
import AvailableActionsDiv from '../../../util/availableActionsDiv.js';
import Button from '../../../util/button.js';
import { Theme } from '../../../theme';

const styles = Theme.STYLES.adminInnerSectionsTheme;
const SectionContainer = styled('div')`
  width: 100%;
  padding: 25px 50px 50px 50px;
  height: ${(props) => props.theme.containerHeight};
`;

class AdmTutorialSection extends React.Component {
  state = { previousDocument: this.props.previousDocument };

  onEditorChange = (markdown) => {
    this.props.onTutorialMarkdownUpdate(markdown);
  };

  render() {
    return (
      <ThemeProvider theme={styles}>
        <SectionContainer>
          <h2>Tutorial document editor</h2>
          <p>
            Here you can edit and preview the tutorial document. You can also
            publish the document or schedule it (check bellow).
          </p>
          <MarkdownEditor
            editorLayout='tabbed'
            onEditorChange={this.onEditorChange}
            withContent={this.state.previousDocument}
          />
          <p>Here you will find the instrictions to publish your task.</p>
          <AvailableActionsDiv>
            <Button
              primary
              width='150px'
              margin='0 0 0 15px'
              onClick={this.props.updateTutorialDocument}
            >
              Publish tutorial
            </Button>
          </AvailableActionsDiv>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default AdmTutorialSection;
