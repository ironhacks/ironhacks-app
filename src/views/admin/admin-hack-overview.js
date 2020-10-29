import React from 'react';
import styled from 'styled-components';
import MarkdownEditor from '../../components/markdown-editor';
import Button from '../../util/button.js';


const AvailableActionsDiv = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  height: 50px;
`;


class AdminHackOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.previousDocument || '',
    }
  }

  onEditorChange = markdown => {
    this.setState({content: markdown});
  };

  updateHackOverview = () => {
    this.setState({ loading: true })
    let encodedDoc = this.encodeDocument(this.state.content);
    let timeUpdated = new Date();
    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .update({
        overview: {
          doc: encodedDoc,
          updated: timeUpdated.toISOString(),
        }
      })
      .then(() => {
        this.setState({
          loading: false,
          hackOverview: this.state.content,
        })
        window.location.reload();
      })
      .catch((error)=>{
        console.error('Error adding document: ', error);
      })
  };

  encodeDocument(str) {
    let safeString = unescape(encodeURIComponent(str));
    return window.btoa(safeString);
  }

  decodeDocument(enc) {
    let decoded = window.atob(enc);
    return decodeURIComponent(escape(decoded));
  }

  render() {
    return (
        <>
          <h2 className="pb-2">
            Hack Overview Editor
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
              onClick={this.updateHackOverview}
            >
              Publish
            </Button>
          </AvailableActionsDiv>
      </>
    )
  }
}

export default AdminHackOverview;
