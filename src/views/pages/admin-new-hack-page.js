import { Component } from 'react'
import { Page, Section, Row, Col } from '../../components/layout'
import { Redirect } from 'react-router-dom'
import { Button } from '../../components/buttons'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import randomTeamname from '../../services/random-teamname'
import { userMetrics } from '../../util/user-metrics'

class AdminNewHackPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hackName: '',
      startDate: new Date(),
      isCreateEnable: true,
      mustNavigate: false,
    }
  }

  onHackStartDateChanged = (value) => {
    this.setState({ startDate: value })
  }

  hackNameEventHandler = (event) => {
    this.setState({
      hackName: event.target.value,
      isCreateEnable: event.target.value ? false : true,
    })
  }

  cancelCreateHack = () => {
    window.location = '/admin'
  }

  createHack = async () => {
    const hackInstance = {
      name: this.state.hackName,
      startDate: this.state.startDate,
    }

    this.setState({ hack: hackInstance })

    const hackDoc = await window.firebase
      .firestore()
      .collection('hacks')
      .add(hackInstance)

    const hackId = hackDoc.id

    await window.firebase
      .firestore()
      .collection('hacks')
      .doc(hackId)
      .collection('registration')
      .doc('participants')
      .set({})

    let cohortName = randomTeamname()
    let cohortId = [
      cohortName.replace(/ /g, '-').toLowerCase(),
      Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, '0'),
    ].join('-')

    await window.firebase
      .firestore()
      .collection('hacks')
      .doc(hackId)
      .collection('registration')
      .doc('settings')
      .set({
        [cohortId]: {
          name: cohortName,
          id: cohortId,
          label: 'default cohort',
          properties: {
            forumEnabled: false,
            showNotebooks: false,
            showSummaries: false,
          },
        },
      })

    await window.firebase
      .firestore()
      .collection('hacks')
      .doc(hackId)
      .collection('registration')
      .doc('cohorts')
      .set({
        [cohortId]: [],
      })

    await window.firebase
      .firestore()
      .collection('hacks')
      .doc(hackId)
      .collection('forums')
      .doc('general')
      .set({})

    await window.firebase
      .firestore()
      .collection('hacks')
      .doc(hackId)
      .collection('submissions')
      .doc('settings')
      .set({})

    await window.firebase
      .firestore()
      .collection('hacks')
      .doc(hackId)
      .collection('results')
      .doc('final')
      .set({})

    userMetrics({
      event: 'hack-created',
      hackId: hackId,
    })

    window.location = `/admin/hacks/${hackId}`
  }

  render() {
    if (!this.props.userIsAdmin) {
      return <Redirect push to="/hacks" />
    } else {
      return (
        <Page
          user={this.props.user}
          userIsAdmin={this.props.userIsAdmin}
          pageClass="admin-hack-create"
        >
          <Section sectionClass="py-2">
            <Row>
              <Col>
                <div className="row">
                  <div className="col-md-8 offset-md-2">
                    <h1>Create a new Hack</h1>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-8 offset-md-2">
                    <h2>Hack name</h2>
                    <input
                      type="text"
                      placeholder="Hack Name"
                      onChange={this.hackNameEventHandler}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-7 offset-md-2">
                    <div className="flex align-content-center py-2">
                      <h3 className="h3 my-0 mr-2" style={{ verticalAlign: 'center' }}>
                        Start Date
                      </h3>
                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.onHackStartDateChanged}
                        showTimeSelect
                        timeFormat="HH:mm"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="time"
                        timeIntervals={60}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-8 offset-md-2 finish-cancel-button-container">
                    <Button className="mr-3" width="150px" onClick={this.cancelCreateHack}>
                      Cancel
                    </Button>

                    <Button
                      primary
                      width="150px"
                      margin="0 0 0 15px"
                      onClick={this.createHack}
                      disabled={this.state.isCreateEnable}
                    >
                      Create Hack
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Section>
        </Page>
      )
    }
  }
}

export default AdminNewHackPage
