import { Component } from 'react'
import MarkdownEditor from '../../components/markdown-editor'
import { withRouter } from 'react-router-dom'
import { userMetrics } from '../../util/user-metrics'
import { Row, Col } from '../../components/layout'
import { InputText } from '../../components/input'

class NewThread extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentHack: this.props.hackId,
      forumId: null,
      user: this.props.user,
      title: '',
      markdown: '',
      mustNavigate: false,
      selectedHack: 0,
      selectedForum: 0,
      submitDisabled: false,
    }

    this.firestore = window.firebase.firestore()
  }

  onEditorChange = (markdown) => {
    this.setState({ markdown: markdown })
  }

  handleInputChange = (name, value) => {
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    this.setState({ loading: true })

    const forumId = 'general'
    const currentDate = new Date()
    const encodedBody = this.utoa(this.state.markdown)

    let postData = {
      title: this.state.title,
      author: this.props.user.uid,
      adminPost: false,
      authorName: this.props.user.displayName,
      createdAt: currentDate,
      hackId: this.props.hackId,
      forumId: forumId,
      body: encodedBody,
    }

    if (this.props.userIsAdmin) {
      postData.adminPost = true
    }

    userMetrics({ event: 'submit_post' })

    window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('forums')
      .doc(forumId)
      .collection('posts')
      .add(postData)
      .then((postDoc) => {
        const threadId = postDoc.id

        this.setState({
          threadRef: threadId,
        })

        this.setState({ loading: false })
        window.history.back()
      })
      .catch(function(error) {
        console.error('Error adding document: ', error)
      })
  }

  utoa(str) {
    return window.btoa(unescape(encodeURIComponent(str)))
  }

  render() {
    return (
      <Row rowClass="my-2">
        <Col>
          <InputText
            containerClass="my-2 flex flex-align-center"
            inputClass="px-1 flex-1"
            labelClass="mr-2 font-extrabold mb-0"
            name="title"
            placeholder="Post Title"
            label="Title:"
            value={this.state.title || ''}
            onInputChange={this.handleInputChange}
          />

          <MarkdownEditor
            editorLayout="tabbed"
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
            Format your post Markdown,{' '}
            <strong>
              {' '}
              you can learn more about Markdown syntax{' '}
              <a
                className="text-underline"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
              >
                here.
              </a>
            </strong>
            <br />
            Click the 'Preview' button to see you post before submitting.
          </p>
        </Col>
      </Row>
    )
  }
}

export default withRouter(NewThread)
