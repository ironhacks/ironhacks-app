import React from 'react';
import { withRouter } from 'react-router';
import { Row, Col } from '../../components/layout';
import { CountdownTimer } from '../../components/timer';
import { fire2Date, fire2Ms } from '../../util/date-utils'

class SubmissionsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      submissions: [],
      now: Date.now(),
      current: null,
    }

    this.getSubmissions = this.getSubmissions.bind(this);
  }

  componentDidMount() {
    this.getSubmissions()
  }

  getSubmissions() {
    // const userId = this.props.userId;
    const hackId = this.props.hackId;
    window.firebase.firestore()
      .collection('hacks')
      .doc(hackId)
      .collection('submissions')
      .doc('settings')
      .get()
      .then((doc)=>{
        let submissionData = doc.data();
        let submissions = [];
        let currentSubmission = null;
        for (let submission of Object.values(submissionData)) {
          submissions.push(submission);
        }

        submissions.sort((a,b)=>{ return a.deadline.seconds - b.deadline.seconds })

        for (let submission of submissions) {
          if (fire2Ms(submission.deadline) < Date.now()){
            submission.status = 'closed';
          } else if (!currentSubmission) {
            currentSubmission = fire2Ms(submission.deadline);
            submission.status = 'current';
          } else {
            submission.status = 'upcoming';
          }
        }

        this.setState({submissions: submissions});
      })
  }

  render() {
    return (
      <Row>
        <Col>
        <ul className="list">
          {this.state.submissions.map((item, index)=>{
            if (item.status === 'closed') {
              return (
                <li key={index} className="list-item w-500 mx-auto">
                  <div className="flex flex-between">
                    <span>{item.name}</span>
                    <span className="font-italic">Closed</span>
                  </div>
                </li>
              )
            } else if (item.status === 'current') {
              return (
                <li key={index} className="list-item w-500 mx-auto">
                  <div className="flex flex-between">
                  <a href={`/hacks/${this.props.hackSlug}/submit/${item.submissionId}`} className="link--underline">
                    {item.name}
                    </a>

                    <CountdownTimer
                      endTime={fire2Date(item.deadline)}
                    />
                  </div>
                </li>
              )
            } else {
              return (
                <li key={index} className="list-item w-500 mx-auto">
                  <div className="flex flex-between">
                    <span>{item.name}</span>
                    <span className="font-italic">Upcoming</span>
                  </div>
                </li>
              )
            }
          })}
        </ul>
        </Col>
      </Row>
    )
  }
}

export default withRouter(SubmissionsView)
