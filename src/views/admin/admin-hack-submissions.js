import React from 'react';
import { Section, Row } from '../../components/layout';
import Separator from '../../util/separator.js';
import { AdminSubmissionForm, AdminSubmissionItem } from '../../components/submission';

class AdminHackSubmissions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submissions: [],
    }
  }

  componentDidMount(){
    this.getSubmissions();
  }

  newSubmission = data => {
    let submissions = this.state.submissions;
    submissions.push(data);
    this.setState({submissions: submissions});
  };

  getSubmissions = () => {
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
  };

  onSubmissionDataChanged(name, value){
    let form = this.state;
    form[name] = value;
    this.setState(form)
  }

  editSubmission(){
    console.log('click');
  }

  saveSubmissions = () => {
    let submissions = this.state.submissions;
    let submissionData = {};
    Object.keys(submissions).forEach((key, index)=>{
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
  };

  deleteSubmission = submissionIndex => {
    let submissions = this.state.submissions;

    submissions = [
      ...submissions.slice(0, submissionIndex),
      ...submissions.slice(submissionIndex+ 1, submissions.length)
    ];

    let submissionData = {};

    Object.keys(submissions).forEach((key, index)=>{
      if (index !== submissionIndex) {
        let submission = submissions[key]
        let submissionId = submission.submissionId;
        submissionData[submissionId] = submission;
      }
    })

    this.setState({ submissions: submissions })

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

  };

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
          <AdminSubmissionItem
            key={index}
            submissionData={item}
            submissionIndex={index}
            onDeleteSubmisison={()=>{this.deleteSubmission(index)}}
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
