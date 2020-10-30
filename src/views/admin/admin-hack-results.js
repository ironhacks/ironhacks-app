import { Component } from 'react';
import MarkdownEditor from '../../components/markdown-editor';
import Button from '../../util/button.js';


class AdminHackResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      content: '',
      survey: '',
      updated: '',
    }
  }

  componentDidMount(){
    this.getResultsSettings();
  }

  getResultsSettings = () => {
    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('results')
      .doc('settings')
      .get()
      .then((doc)=>{
        if (!doc.exists) {
          this.setState({loading: false});
          return false;
        }

        let data = doc.data()
        this.setState({
          content: data.content ? this.decodeDocument(data.content) : '',
          updated: data.updated,
          loading: false,
        })
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

  onEditorChange = markdown => {
    this.setState({content: markdown})
  };

  updateContent = () => {
    this.setState({ loading: true })
    let encodedContent = this.encodeDocument(this.state.content);
    let timeUpdated = new Date();
    let authorId = this.props.userId;

    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('results')
      .doc('settings')
      .update({
        updated: timeUpdated.toISOString(),
        content: encodedContent,
        authorId: authorId,
      })
      .then(() => {
        this.setState({loading: false})
        window.location.reload();
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };

  render() {
    return (
        <>
          <h2 className="pb-2">
            Dashboard Document Editor
          </h2>

          <MarkdownEditor
            editorLayout='tabbed'
            onEditorChange={this.onEditorChange}
            value={this.state.content}
            disabled={this.state.loading}
          />

          <div style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row-reverse',
            height: '50px',
          }}>
            <Button
              primary
              width='150px'
              margin='0 0 0 15px'
              onClick={this.updateContent}
            >
              Publish
            </Button>

            <a
              href={`/hacks/${this.props.hackSlug}/results`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View live document
            </a>
          </div>
      </>
    );
  }
}

export default AdminHackResults;
