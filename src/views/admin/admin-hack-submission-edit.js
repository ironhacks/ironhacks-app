import { Component } from 'react'
import { Section, Row } from '../../components/layout'
import { AdminSubmissionEditForm } from '../../components/submission'
import { withRouter } from 'react-router'

class AdminHackSubmissionEdit extends Component {
  constructor(props) {
    super(props);

    this.submissionId = this.props.match.params.submissionId;

    this.state = {
      submissions: [],
      submissionData: null,
    }
  }

  componentDidMount(){
    this.getSubmissions()
    this.getSolutions()
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

  getSolutions = () => {
    let solutions = []
    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('submissions')
      .doc('solutions')
      .get()
      .then(doc=>{
        let data = doc.data()
        if (data[this.submissionId]) {
          solutions.push(data[this.submissionId])
        }

        this.setState({
          solutions: solutions
        })
      })
  }

  onSubmissionDataChanged(name, value){
    let form = this.state;
    form[name] = value;
    this.setState(form)
  }

  cancelEditSubmission(){
    window.history.back();
  }

  saveSubmission = data => {
    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('submissions')
      .doc('settings')
      .set({[data.submissionId]: data}, {merge: true})
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
          <h2 className="h3">
            {this.props.hackData.name} Submission: {this.submissionId}
          </h2>
        </Row>

        {this.state.submissionData && (
        <Row>
          <AdminSubmissionEditForm
            hackId={this.props.hackId}
            submissionId={this.submissionId}
            submissionData={this.state.submissionData}
            onSaveSubmission={this.saveSubmission}
            onCancelEdit={this.cancelEditSubmission}
            solutionFiles={this.state.solutions}
          />
        </Row>
      )}
      </Section>
    )
  }
}

export default withRouter(AdminHackSubmissionEdit);
