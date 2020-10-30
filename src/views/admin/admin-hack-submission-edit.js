import { Component } from 'react';
import { Section, Row } from '../../components/layout';
import Separator from '../../util/separator.js';
import { AdminSubmissionEditForm } from '../../components/submission';
import { withRouter } from 'react-router';

class AdminHackSubmissionEdit extends Component {
  constructor(props) {
    super(props);

    this.submissionId = this.props.match.params.submissionId;

    this.state = {
      submissions: [],
    }
  }

  componentDidMount(){
    this.getSubmissions();
  }


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
          submissionData: data[this.submissionId],
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

  cancelEditSubmission(){
    window.history.back();
  }

  saveSubmission = data => {
    let submissions = this.state.submissions;
    let submissionData = {};
    Object.keys(submissions).forEach((key, index)=>{
      let submission = submissions[key]
      let submissionId = submission.submissionId;
      submissionData[submissionId] = submission;
    })
    
    let updateId = data.submissionId;
    submissionData[updateId] = data;

    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('submissions')
      .doc('settings')
      .set(submissionData, {merge: true})
      .then(()=>{
        window.history.back();
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
            {this.props.hackData.name} Submission: {this.submissionId}
          </h2>

          <Separator primary />
        </Row>

        {this.state.submissionData && (
        <Row>
          <AdminSubmissionEditForm
            submissionId={this.submissionId}
            submissionData={this.state.submissionData}
            onCreate={this.newSubmission}
            onSaveSubmission={this.saveSubmission}
            onCancelEdit={this.cancelEditSubmission}
          />
        </Row>
      )}
      </Section>
    )
  }
}

export default withRouter(AdminHackSubmissionEdit);
