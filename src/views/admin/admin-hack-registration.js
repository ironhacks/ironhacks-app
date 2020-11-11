import { Component } from 'react';
import { Section } from '../../components/layout';
import { AdminRegisteredUserList } from '../../components/admin';
import { fire2Date } from '../../util/date-utils'
import { downloadFileData } from '../../util/download-file-data'


class AdminHackRegistration extends Component {
  constructor(props) {
    super(props);


    this.state = {
      data: '',
      loading: false,
      registeredUsers: [],
      registeredUsersData: null,
      registrationEvents: [],
      tasks: [],
      defaultTask: this.props.defaultTask || null,
      taskSelect: [],
    }
  }


  componentDidMount() {
    this.getRegistrationSettings()
    this.getRegisteredUsers()
    this.getRegistrationEvents()
  }

  getRegistrationSettings = async () => {
    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('registration')
      .doc('settings')
      .get()
      .then(doc=>{
        let data = doc.data();
        if (data) {
          this.setState({
            cohorts: Object.values(data),
          });
        }
      })
  }

  getRegistrationEvents = async () => {
    let snap = await window.firebase.firestore()
      .collection('stats')
      .where('event', '==', 'register_hack')
      .where('hackId', '==', this.props.hackId)
      .get()

    let result = []
    for (let doc of snap.docs) {
      result.push(doc.data())
    }

    this.setState({registrationEvents: result})
  }

  getRegisteredUsers = async () => {
    let adminList = []
    let users = [];

    let adminsSnap = await window.firebase.firestore()
      .collection('admins')
      .get()

    adminsSnap.docs.forEach((item, index) => {
      adminList.push(item.id)
    })

    let participantDoc = await window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('registration')
      .doc('participants')
      .get()

      let data = participantDoc.data();
      if (!data) { return false }

      this.setState({registeredUsersData: data});

      for (let id of Object.keys(data)) {
        let user = data[id];
        let userDoc = await user.ref.get()

        users.push({
          isAdmin: adminList.includes(id),
          userId: id,
          userRef: user.ref,
          hackAlias: user.alias,
          ...userDoc.data()
        })
      }

      // users.filter(el=>{ return el.name })
      users
        .sort((a,b)=>{ return a.email.localeCompare(b.email) })
        .sort((a,b)=>{ if (a.isAdmin) { return -1 } else { return 1 } })

      this.setState({registeredUsers: users});
  }

  downloadRegistrationReport = () => {
    let users = this.state.registeredUsers
    let events = this.state.registrationEvents
    console.log(users);
    console.log(events);

    let headers = [
      'timestamp',
      'userId',
      'name',
      'alias',
      'email',
      'isAdmin',
    ].join(',')


    let registrationTimes = {}
    events.forEach((event, index) => {
      registrationTimes[event.userId] = fire2Date(event.timestamp).toISOString()
    })

    let result = []
    users.forEach((user, index) => {
      result.push([
        registrationTimes[user.userId],
        user.userId,
        user.name,
        user.alias,
        user.email,
        user.isAdmin,
      ].join(','))
    })

    result.sort((a,b)=>{ return a.localeCompare(b) })
    let reportDate = new Date()

    let meta = [
      `${this.props.hackData.name} - Registration Report`,
      `Date Created: ${reportDate.toLocaleString()}`,
      '=========================================='
    ].join('\n')

    let output = [
      meta,
      headers,
      ...result
    ]

    let reportTimestamp = [
      reportDate.getFullYear(),
      reportDate.getDate().toString().padStart(2, '0'),
      reportDate.getMonth().toString().padStart(2, '0'),
      reportDate.getHours().toString().padStart(2, '0'),
      reportDate.getMinutes().toString().padStart(2, '0'),
    ].join('')

    downloadFileData({
      data: output.join('\n'),
      name: `ironhacks-registration-${this.props.hackId}-${reportTimestamp}.csv`
    })
  }

  render() {
    return (
        <>
          <Section align={false} containerClass="mx-0">
          <div className="flex flex-between flex-align-center">
            <h2 className="h2">
              {this.props.hackData.name} Registration
            </h2>

            <div
              className="btn badge badge-info py-1"
              onClick={this.downloadRegistrationReport}
            >
              Download Report
            </div>
          </div>
          </Section>

          <Section align={false} containerClass="mx-0" sectionClass="py-2">
            <h3 className="h3 pb-2">
              Registered Users: {this.state.registeredUsers.length}
            </h3>

            {this.state.registeredUsers ? (
              <AdminRegisteredUserList
                registeredUsers={this.state.registeredUsers}
                hackId={this.props.hackId}
                onRemove={((userlist)=>{
                  this.setState({registeredUsers: userlist})
                })}
              />
            ):(
              <p>No registered users</p>
            )}
          </Section>

          <Section align={false} containerClass="mx-0" sectionClass="py-2">
            <h3 className="h3 pb-2">
              Registration Timeline
            </h3>
            <p>Timestamp - UserId</p>
          <ul>
          {this.state.registrationEvents.map((item, index)=>(
            <li key={index}>
              {fire2Date(item.timestamp).toISOString()} - {item.userId}
            </li>
          ))}
          </ul>
          </Section>

      </>
    )
  }
}

export default AdminHackRegistration;
