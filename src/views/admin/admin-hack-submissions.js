import { Component } from 'react';
import { Section, Row } from '../../components/layout';
import { AdminSubmissionItem } from '../../components/submission';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

class AdminHackSubmissions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      submissions: [],
    }
  }

  componentDidMount(){
    this.getSubmissions()
  }

  newSubmission = data => {
    let submissions = this.state.submissions;
    submissions.push(data);
    this.setState({submissions: submissions});
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
  }

  showConfirmDeleteModal = (submissionIndex) => {
    this.setState({loading: true})
    let submissions = this.state.submissions
    let selected = submissions[submissionIndex]

    Swal.fire({
      title: 'Are you sure?',
      html: `
        <p>Confirm you want to delete this Submission.</p>
        <code>${selected.submissionId}</code>`,
      icon: 'question',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    })
    .then((result) => {
      if (result.value) {
        this.deleteSubmission(submissionIndex)
      } else {
        this.setState({loading: false})
      }
    })
  }

  deleteSubmission = submissionIndex => {
    let submissions = this.state.submissions
    let selected = submissions[submissionIndex]
    let selectedId = selected.submissionId

    submissions = [
      ...submissions.slice(0, submissionIndex),
      ...submissions.slice(submissionIndex+ 1, submissions.length)
    ]

    let submissionData = {};

    Object.keys(submissions).forEach((key, index)=>{
      if (index !== submissionIndex) {
        let submission = submissions[key]
        let submissionId = submission.submissionId;
        submissionData[submissionId] = submission;
      }
    })

    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('submissions')
      .doc('settings')
      .set({
        [selectedId]: window.firebase.firestore.FieldValue.delete()
      }, {merge: true})
      .then(()=>{
        this.setState({
          loading: false,
          submissions: submissions
        })
      })
      .catch((error)=>{
        console.log(error);
      })

  }

  render() {
    return (
      <Section sectionClass="pt-2">
        <h2 className="h3">
          {this.props.hackData.name} Submissions
        </h2>

        <Link to="submissions/new">
          <div className="button py-1 px-2 bg-primary font-bold fs-m2">
            + New Submisison
          </div>
        </Link>

        <Row rowClass="pt-2">
        {this.state.submissions.map((item, index)=>(
          <AdminSubmissionItem
            key={index}
            submissionData={item}
            submissionIndex={index}
            onDeleteSubmisison={()=>{this.showConfirmDeleteModal(index)}}
          />
        ))}
        </Row>
      </Section>
    )
  }
}

export default AdminHackSubmissions;
