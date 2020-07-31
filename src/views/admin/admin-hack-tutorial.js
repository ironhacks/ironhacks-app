import React from 'react';
import MarkdownEditor from '../../components/markdown-editor';
import Button from '../../util/button';
import styled from 'styled-components';

const AvailableActionsDiv = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
  height: 50px;
`;

class AdminTutorialSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.previousDocument || '',
    }
    this.onEditorChange = this.onEditorChange.bind(this);
    this.updateTutorialDocument = this.updateTutorialDocument.bind(this)
  }

  encodeDocument(str) {
    let safeString = unescape(encodeURIComponent(str));
    return window.btoa(safeString);
  }

  decodeDocument(enc) {
    let decoded = window.atob(enc);
    return decodeURIComponent(escape(decoded));
  }

  onEditorChange(md) {
    this.setState({content: md})
  }

  updateTutorialDocument() {
    this.setState({loading: true})
    const hackTutorial = this.encodeDocument(this.state.content);
    let timeUpdated = new Date();
    let tutorialDoc = {
      doc: hackTutorial,
      updated: timeUpdated.toISOString(),
    };

    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .update({ tutorial: tutorialDoc })
      .then(() => {
        this.setState({ loading: false});
        window.location.reload();
      })
      .catch((error)=>{
        console.error('Error adding document: ', error);
      })
  }

  render() {
    return (
        <>
          <h2 className="pb-2">
            Tutorial document editor
          </h2>

          <MarkdownEditor
            editorLayout='tabbed'
            onEditorChange={this.onEditorChange}
            value={this.state.content}
          />

          <AvailableActionsDiv>
            <Button
              primary
              width='150px'
              margin='0 0 0 15px'
              onClick={this.updateTutorialDocument}
            >
              Publish
            </Button>
            <a
              href={`/hacks/${this.props.hackSlug}/tutorial`}
              target="_blank"
              rel="noopener noreferrer"
              >
              View live document
            </a>
          </AvailableActionsDiv>
      </>
    )
  }
}

export default AdminTutorialSection;
