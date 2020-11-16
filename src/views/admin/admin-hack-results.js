import { Component } from 'react'
import MarkdownEditor from '../../components/markdown-editor'
import Button from '../../util/button.js'
import { fire2Ms } from '../../util/date-utils'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { userMetrics } from '../../util/user-metrics'

class AdminHackResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      content: '',
      survey: '',
      updated: '',
      submissions: [],
      isPublished: {},
    }
  }

  componentDidMount(){
    this.getResultsSettings()
    this.getSubmissions()
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
          content: data.content ? data.content : '',
          updated: data.updated,
          isPublished: data.isPublished || {},
          loading: false,
        })
      })
  }

  getSubmissions = async () => {
    let doc = await window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('submissions')
      .doc('settings')
      .get()

    let data = doc.data()
    let submissions = Object.keys(data)

    submissions.sort((a,b)=>{ return fire2Ms(data[a].deadline) - fire2Ms(data[b].deadline) })

    this.setState({
      submissions: submissions,
    })
  }

  updateContent = async () => {
    this.setState({ loading: true })

    await window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('results')
      .doc('settings')
      .set({content: this.state.content}, {merge: true})

    userMetrics({
      event: 'results-updated',
      hackId: this.props.hackId,
      submissionId: this.submissionId,
    })

    this.showSaveSuccessModal()
    this.setState({loading: false})
  }

  showSaveSuccessModal = () => {
    this.setState({loading: true})
    Swal.fire({
      icon: 'success',
      title: 'Document saved',
    })
    .then(() => {
      this.setState({loading: false})
    })
  }

  render() {
    return (
        <>
          <h2 className="h3 pb-2">
            Submission Results
          </h2>

          <h3 className="h4 fm-1 font-bold">
            Manage Results:
          </h3>

          <div className="bg-grey-lt2 py-1">
            <ul className="list my-0">
              {this.state.submissions.map((item, index)=>(
                <li key={index}>
                  <Link to={`results/${item}`}>
                    {item}
                  </Link>
                  {this.state.isPublished[item] ? (
                    <span className="ml-3 badge badge-info">published</span>
                  ) : (
                    <span className="ml-3 badge badge-secondary">not published</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <h2 className="h3 pt-2">
            Results Dashboard Document
          </h2>

          <p>
            Default information related to the results data displayd above in the dashboard
          </p>

          <MarkdownEditor
            editorLayout='tabbed'
            onEditorChange={(value)=>this.setState({content: value})}
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
    )
  }
}

export default AdminHackResults;
