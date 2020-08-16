import React from 'react';
import styled from 'styled-components';
import MarkdownEditor from '../../components/markdown-editor';
import {Loader} from '../../components/loader';

const SectionContainer = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 10%;
  height: ${(props) => props.theme.containerHeight};
  background-color: ${(props) => props.theme.backgroundColor};
  overflow: auto;
`;

const Header = styled('div')`
  width 100%;
  margin-top: 25px;

  label {
    font-weight: 700;
    font-size: 18px;

    span {
      font-weight: 500;
      font-style: italic;
      font-size: 12px;
      color: #c02222;
    }
  }
`;


const TitleInput = styled('input')`
  width: 50%;
  height: 30px;
  background-color: #f2f2f2;
  border: 1px solid #999999;
  border-radius: 3px;
  padding-left: 10px;
  margin-bottom: 10px;
`;

class NewThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHack: this.props.hackId,
      forumId: null,
      user: this.props.user,
      title: '',
      markdown: '',
      mustNavigate: false,
      selectedHack: 0,
      selectedForum: 0,
      submitDisabled: true,
    }

    this.firestore = window.firebase.firestore();
    this.handleInputChange = this.handleInputChange.bind(this)
    this.onEditorChange = this.onEditorChange.bind(this)
    this.submitIsDisabled = this.submitIsDisabled.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setForumId = this.setForumId.bind(this)
  }

  onEditorChange(markdown) {
    this.setState({ markdown: markdown })
    this.submitIsDisabled()
  }

  componentDidMount() {
    this.setForumId()
  }

  setForumId(){
    console.log(this.props.hackId);
    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('forums')
      .get()
      .then((forums)=>{
        console.log('forums', forums);
        let forumId = forums.docs[0].id;
        // TODO: temp workaround
        this.setState({forumId: forumId})
        // doc.forEach((forum)=>{
        //   let data=forum.data();
        //   console.log(forum.id, data)
        // })
      })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value })
    this.submitIsDisabled();
  }

  handleSubmit(event) {
    event.preventDefault();
    let hackId;
    const forumId = 'general';
    hackId = this.state.currentHack;

    const currentDate = new Date();
    const codedBody = this.utoa(this.state.markdown);

    let postData = {
      title: this.state.title,
      author: this.props.user.uid,
      adminPost: false,
      authorName: this.props.user.displayName,
      createdAt: currentDate,
      hackId: hackId,
      forumId: forumId,
      body: codedBody,
    };

    if (this.props.userIsAdmin){
      postData.adminPost = true;
    }

    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('forums')
      .doc(forumId)
      .collection('posts')
      .add(postData)
      .then((postDoc) => {
        const threadId = postDoc.id;
        this.setState({
          threadRef: threadId
        })
        window.history.back();
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      })
  }



  utoa(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  submitIsDisabled() {
    if (this.state.markdown === '' || this.state.title === '') {
      this.setState({submitDisabled: true});
      return true;
    } else {
      this.setState({submitDisabled: false});
    }
  }

  render() {
    return (
      <>
      {this.state.loading ? (
          <SectionContainer>
            <Loader />
          </SectionContainer>
      ) : (
        <SectionContainer>
          <Header>
            <label className="mr-2">
              Title
            </label>

            <TitleInput
              type='text'
              placeholder='Thread Title..'
              onChange={this.handleInputChange}
              name='title'
            />
          </Header>

          <MarkdownEditor
            editorLayout='tabbed'
            value={this.state.markdown}
            onEditorChange={this.onEditorChange}
          />

          <div className="flex flex-end my-2">
            <button
              className={'btn bg-primary px-2'}
              disabled={this.state.submitDisabled}
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </div>

          <p>
            Format your post Markdown, <strong> you can learn more about Markdown syntax<a target='_blank' rel='noopener noreferrer' href='https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet'> here.</a>)</strong>
            <br/>Click the 'Preview' button to see you post before submitting.
          </p>
        </SectionContainer>
    )}
    </>
    )
  }
}

export default NewThread;
