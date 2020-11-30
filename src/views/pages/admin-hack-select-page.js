import { Component } from 'react'
import { Page, Section, Row } from '../../components/layout'
import { Link } from 'react-router-dom'

class AdminHackCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDashboardNav: false,
      participants: null,
    }
  }

  componentDidMount() {
    this.getHackParticipants()
  }

  getHackParticipants = async () => {
    let participantDoc = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('registration')
      .doc('participants')
      .get()

    let participantData = participantDoc.data()

    if (participantData) {
      this.setState({ participants: Object.keys(participantData).length })
    } else {
      this.setState({ participants: 0 })
    }
  }

  render() {
    return (
      <a href={`/admin/hacks/${this.props.hackId}/settings`}>
        <div className={'admin_hack_card py-2 px-4'}>
          <h3 className="hack_title font-bold text-center">
            {this.props.name}
            <div className="ml-3 badge font-italic">({this.props.hackId})</div>
          </h3>

          <div className="ml-3 badge badge-dark">{this.state.participants} Participants</div>
        </div>
      </a>
    )
  }
}

AdminHackCard.defaultProps = {
  name: 'Hack Name',
  hackId: '',
}

const AdminHackCardList = ({ hacks, emptyText }) => {
  if (!hacks || hacks.length === 0) {
    return <span className="empty-list">{emptyText || 'There are no hacks available.'}</span>
  } else {
    return (
      <ul className="hack_card_list">
        {hacks.map((hack, index) => (
          <li key={index} className="hack_card_list__item w-full" index={index}>
            <AdminHackCard name={hack.name} hackId={hack.id} hack={hack} />
          </li>
        ))}
      </ul>
    )
  }
}

class AdminHackSelectPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDashboardNav: false,
      hacks: [],
      userCount: null,
    }
  }

  componentDidMount() {
    this.getHacks()
    this.getUserCount()
  }

  getUserCount = async () => {
    let userSnap = await window.firebase
      .firestore()
      .collection('users')
      .get()

    if (userSnap.docs) {
      this.setState({ userCount: userSnap.docs.length })
    } else {
      this.setState({ userCount: 0 })
    }
  }

  getHacks = async () => {
    const hacks = []
    let hackDocs = await window.firebase
      .firestore()
      .collection('hacks')
      .get()

    for (let hack of hackDocs.docs) {
      hacks.push({
        ...hack.data(),
        id: hack.id,
      })
    }

    hacks.sort((a, b) => {
      return b.startDate.localeCompare(a.startDate)
    })
    this.setState({ hacks: hacks })
  }

  render() {
    return (
      <Page user={this.props.user} userIsAdmin={this.props.userIsAdmin} pageClass="admin-hack-select">
        <Section sectionClass="py-2">
          <Row>
            <div className="flex flex-between bd-b1 py-2 mb-2 flex-center">
              <h1>
                Hack Admin Dashboard
                <div className="ml-3 badge badge-dark">Total Users: {this.state.userCount}</div>
              </h1>
              <Link to="/admin/new-hack" className="badge cursor btn">
                &#43;New Hack
              </Link>
            </div>

            <AdminHackCardList hacks={this.state.hacks} />
          </Row>
        </Section>
      </Page>
    )
  }
}

export default AdminHackSelectPage
