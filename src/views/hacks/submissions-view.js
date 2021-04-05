import { Component } from 'react'
import { withRouter } from 'react-router'
import { Row, Col } from '../../components/layout'
import { CountdownTimer } from '../../components/timer'
import { MaterialDesignIcon } from '../../components/icons/material-design-icon'
import { fire2Date, fire2Ms } from '../../util/date-utils'

function SubmissionListItem({ status, hackSlug, submissionId, userSubmitted, name, deadline }) {
  let dateSettings = {
    // weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }

  if (userSubmitted) {
    return (
      <>
        <a
          href={`/hacks/${hackSlug}/submit/${submissionId}`}
          className="link--underline flex-1 cl-green-ac4"
        >
          <MaterialDesignIcon iconClass="icon_fs-1 mr-1" name="check" />
          {name}
        </a>

        <div className="flex-1 text-center">
          <span className="text-center badge badge-pill bg-green-ac4 cl-white">
            {fire2Date(deadline).toLocaleString('en-US', dateSettings)}
          </span>
        </div>

        <span className="font-italic cl-green-ac4 flex-1 text-center">Submitted</span>
      </>
    )
  }

  if (status === 'closed') {
    return (
      <>
        <span className="flex-1 cl-grey">
          <MaterialDesignIcon iconClass="icon_fs-1 mr-1" name="block" />
          {name}
        </span>

        <div className="flex-1 text-center">
          <span className="text-center badge badge-pill bg-grey cl-white">
            {fire2Date(deadline).toLocaleString('en-US', dateSettings)}
          </span>
        </div>

        <span className="font-italic flex-1 text-center cl-grey">Closed</span>
      </>
    )
  } else if (status === 'current') {
    return (
      <>
        <a href={`/hacks/${hackSlug}/submit/${submissionId}`} className="link--underline flex-1">
          <MaterialDesignIcon iconClass="icon_fs-1 mr-1" name="arrow-forward" />
          {name}
        </a>

        <div className="flex-1 text-center">
          <span className="text-center badge badge-pill badge-dark">
            {fire2Date(deadline).toLocaleString('en-US', dateSettings)}
          </span>
        </div>

        <CountdownTimer timerClass="flex-1 text-center" endTime={fire2Date(deadline)} />
      </>
    )
  } else {
    return (
      <>
        <span className="flex-1">
          <MaterialDesignIcon iconClass="icon_fs-1 mr-1" name="alarm" />
          {name}
        </span>

        <div className="flex-1 text-center">
          <span className="badge badge-pill badge-dark">
            {fire2Date(deadline).toLocaleString('en-US', dateSettings)}
          </span>
        </div>

        <span className="font-italic flex-1 text-center">Upcoming</span>
      </>
    )
  }
}

class SubmissionsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      submissions: [],
      userSubmitted: [],
      now: Date.now(),
      current: null,
    }
  }

  componentDidMount() {
    this.getSubmissions()
  }

  getUserSubmission = (submissionId) => {
    const hackId = this.props.hackId
    const userId = this.props.userId
    return window.firebase
      .firestore()
      .doc(`hacks/${hackId}/submissions/${submissionId}/users/${userId}`)
      .get()
      .then((doc) => {
        return doc.exists
      })
  }

  getSubmissions = () => {
    const hackId = this.props.hackId
    window.firebase
      .firestore()
      .collection('hacks')
      .doc(hackId)
      .collection('submissions')
      .doc('settings')
      .get()
      .then((doc) => {
        let submissionData = doc.data()
        let userSubmitted = []
        let submissions = []
        let currentSubmission = null
        if (submissionData) {
          for (let submission of Object.values(submissionData)) {
            submissions.push(submission)
          }

          submissions.sort((a, b) => {
            return a.deadline.seconds - b.deadline.seconds
          })

          for (let submission of submissions) {
            if (fire2Ms(submission.deadline) < Date.now()) {
              submission.status = 'closed'
            } else if (!currentSubmission) {
              currentSubmission = fire2Ms(submission.deadline)
              submission.status = 'current'
            } else {
              submission.status = 'upcoming'
            }

            userSubmitted.push(this.getUserSubmission(submission.submissionId))
          }

          Promise.all(userSubmitted).then((result) => {
            this.setState({ userSubmitted: result })
          })

          this.setState({ submissions: submissions })
        }
      })
  }

  render() {
    return (
      <Row>
        <Col>
          {this.state.submissions.length > 0 ? (
            <ul className="">
              {this.state.submissions.map((item, index) => (
                <li key={index} className="my-4 mx-auto">
                  <div className="flex flex-between flex-align-center">
                    <SubmissionListItem
                      deadline={item.deadline}
                      userSubmitted={this.state.userSubmitted[index]}
                      name={item.name}
                      status={item.status}
                      hackSlug={this.props.hackSlug}
                      submissionId={item.submissionId}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Submissions have not opened yet</p>
          )}
        </Col>
      </Row>
    )
  }
}

export default withRouter(SubmissionsView)
