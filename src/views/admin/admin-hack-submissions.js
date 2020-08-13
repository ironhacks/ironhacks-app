import React from 'react';
import { Section, Row } from '../../components/layout';
import Separator from '../../util/separator.js';
import { AdminSubmissionForm } from '../../components/submission';
import { fire2Date } from '../../util/date-utils'
import { Link } from 'react-router-dom';


// deadline: '',
// name: '',
// description: '',
// survey: '',
// fields: [],
// files: [],

function SubmissionItem({data, onEditSubmission}) {
  let { deadline } = data;

  if (deadline.seconds) {
    deadline = fire2Date(data.deadline);
  }

  let files = data.files.map((item, index)=>{ return item.name })
  let fields = data.fields.map((item, index)=>{ return item.title })

  return (
    <div className="admin-submission card p-3 mb-3">
      <div className="flex"><span className="font-bold mr-1">Name:</span>{data.name || ''}</div>
      <div className="flex"><span className="font-bold mr-1">Deadline: </span> {deadline.toISOString()}</div>
      <div className="flex"><span className="font-bold mr-1">Survey: </span> {data.survey}<br/></div>
      <div className=""><span className="font-bold mr-1">Description: </span></div>
      <div className=""><p className="mb-1">{data.description}</p></div>
      <div className="mb-1"><span className="font-bold mr-1">Fields: </span></div>
      {fields.map((item, index)=>(
        <p key={index} className="mb-1 ml-2">{`- ${item}`}</p>
      ))}
      <div className="flex"><span className="font-bold mr-1">Files:</span>{files.join(', ')}<br/></div>

      <Link
        to={`./submissions/edit/${data.submissionId}`}
        className={'btn btn-sm btn-success flex-self-end ml-auto'}
      >
        Edit Submission
      </Link>
    </div>
  )
}


class AdminHackSubmissions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submissions: [],
    }

    this.newSubmission = this.newSubmission.bind(this);
    this.saveSubmissions = this.saveSubmissions.bind(this);
    this.getSubmissions = this.getSubmissions.bind(this);
  }

  componentDidMount(){
    this.getSubmissions();
  }

  newSubmission(data) {
    let submissions = this.state.submissions;
    submissions.push(data);
    this.setState({submissions: submissions});
  }

  getSubmissions() {
    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('submissions')
      .doc('settings')
      .get()
      .then((doc)=>{
        let data = doc.data();
        let submissionData = Object.keys(data).map((item, index)=>{
          return data[item];
        })

        submissionData.sort((a,b)=>{ return a.deadline.seconds - b.deadline.seconds })

        this.setState({
          submissions: submissionData,
        })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  onSubmissionDataChanged(name, value){
    let form = this.state;
    form[name] = value;
    this.setState(form)
  }

  editSubmission(){
    console.log('click');
  }

  saveSubmissions(){
    let submissions = this.state.submissions;
    let submissionData = {};
    Object.keys(submissions).map((key, index)=>{
      let submission = submissions[key]
      let submissionId = submission.submissionId;
      submissionData[submissionId] = submission;
    })

    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('submissions')
      .doc('settings')
      .set(submissionData, {merge: true})
      .then(()=>{
        window.location.reload();
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  render() {
    return (
      <Section>
        <Row>
          <h2>
            {this.props.hackData.name} Submissions
          </h2>

          <Separator primary />
        </Row>

        <Row>
        {this.state.submissions.map((item, index)=>(
          <SubmissionItem
            key={index}
            data={item}
          />
        ))}
        </Row>

        <Row>
          <AdminSubmissionForm
            onCreate={this.newSubmission}
          />
        </Row>

        <Row rowClass="flex justify-content-center bg-grey-lt2 py-4 mt-3 mr-5">
          <button
            className="btn bg-primary px-8"
            onClick={this.saveSubmissions}
            >
            Save Submissions
          </button>
        </Row>
      </Section>
    )
  }
}

export default AdminHackSubmissions;
