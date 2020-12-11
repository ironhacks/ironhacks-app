import { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { Page, Section, Row, Col } from '../../components/layout'
import { MaterialDesignIcon } from '../../components/icons/material-design-icon'
import { SkillsTable } from '../../components/skills-table'
import { ErrorBoundary } from '../../util'
import { userMetrics } from '../../util/user-metrics'
import { fire2Date } from '../../util/date-utils'

function getHackName(hackId) {
  return window.firebase
    .firestore()
    .collection('hacks')
    .doc(hackId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data().name
      } else {
        return ''
      }
    })
}

class RegisteredHackList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      registeredHacks: [],
    }
  }

  componentDidMount() {
    if (this.props.hacks) {
      this.getHackList(this.props.hacks)
    }
  }

  getHackList = (hacks) => {
    let result = []
    hacks.forEach((item, i) => {
      result.push(getHackName(item))
    })
    Promise.all(result).then((names) => {
      this.setState({
        registeredHacks: names,
      })
    })
  }

  renderList = () => {
    return this.state.registeredHacks.map((item, index) => (
      <li key={index}>
        <span>{item}</span>
      </li>
    ))
  }

  render() {
    return (
      <div className="registered-hack-list">
        <h3 className="mt-6 h3 font-bold">Registered Hacks</h3>

        <ul className="pl-2 fs-m2">{this.renderList()}</ul>
      </div>
    )
  }
}

const ProfileDemographicData = ({ icon, title, label }) => {
  return (
    <div className="mb-2">
      <MaterialDesignIcon name={icon} />
      <span>
        {' '}
        {title}: {label}
      </span>
    </div>
  )
}

const ProfileSocialAccounts = ({ data }) => {
  return (
    <div className="registered-hack-list">
      <h3 className="mt-6 h3 font-bold">Social</h3>
      <ul className="pl-2 fs-m2">
        {data.map((item, index) => (
          <li key={index}>
            <MaterialDesignIcon iconClass="mx-1" name={item.name} />
            <span style={{ display: 'none', textTransform: 'capitalize' }}>{item.name}:</span>
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

class ProfileViewPage extends Component {
  constructor(props) {
    super(props)

    this.profileId = props.match.params.profileId

    this.state = {
      hacks: null,
      userExists: true,
      userData: {
        name: '',
        email: '',
        userId: '',
        profileLetters: 'IH',
        programmingExperience: {
          bash: null,
          c_cplus: null,
          csharp_dotnet: null,
          d3js: null,
          go: null,
          java: null,
          js_js: null,
          julia: null,
          matlab: null,
          other: null,
          php: null,
          python: null,
          r: null,
          ruby: null,
          sas_stata: null,
          scala: null,
          sql: null,
          vba: null,
        },
        demographicData: {
          highestDegree: { label: '', value: '' },
          educationStatus: { label: '', value: '' },
          country: { label: '', value: null },
          city: null,
          state: null,
        },
      },
      socialData: [],
    }
  }

  componentDidMount() {
    window.firebase.analytics().logEvent('view_profile')
    userMetrics({ event: 'view_profile' })
    this.getUserData()
  }

  getUserData() {
    window.firebase
      .firestore()
      .collection('users')
      .doc(this.profileId)
      .get()
      .then((doc) => {
        console.log(doc)

        if (doc.exists) {
          var programming = {}
          var demographic = {}
          var social = []
          let data = doc.data()
          let prgExp = this.state.userData.programmingExperience
          let demDat = this.state.userData.demographicData

          console.log(data)

          if (data.profileData) {
            if (data.profileData.socialMedia) {
              social = Object.keys(data.profileData.socialMedia)
                .map((key, index) => {
                  return { name: key, value: data.profileData.socialMedia[key] }
                })
                .filter((item) => {
                  return item.value
                })
            }
            if (data.profileData.programmingExperience) {
              programming = Object.assign({}, prgExp, data.profileData.programmingExperience)
            }
            if (data.profileData.demographicData) {
              demographic = Object.assign({}, prgExp, data.profileData.demographicData)
            }
          }

          let profileLetters = 'IH'
          if (data.name && data.name.split(' ').length >= 2) {
            profileLetters = [
              data.name
                .split(' ')[0]
                .slice(0, 1)
                .toUpperCase(),
              data.name
                .split(' ')[1]
                .slice(0, 1)
                .toUpperCase(),
            ].join('')
          }

          this.setState({
            hacks: data.hacks,
            socialData: social,
            userData: {
              profileLetters: profileLetters,
              name: data.name,
              email: data.email,
              createdAt: fire2Date(data.created).toISOString(),
              userId: this.profileId,
              programmingExperience: {
                ...prgExp,
                ...programming,
              },
              demographicData: {
                ...demDat,
                ...demographic,
              },
            },
          })
        } else {
          this.setState({ userExists: false })
        }
      })
  }

  render() {
    if (!this.props.userIsAdmin) {
      return <Redirect to="/profile" />
    } else {
      return (
        <Page
          user={this.props.user}
          userIsAdmin={this.props.userIsAdmin}
          pageTitle="IronHacks | User Profile"
          pageDescription="IronHacks User Profile Page"
          pageUrl="https://ironhacks.com/profile"
        >
          <Section sectionClass="pt-5">
            <Row>
              <Col>
                {/* LEFT COLUMN */}
                {this.state.userExists ? (
                  <div className="profile">
                    <div className="">
                      <span className="profile__initials">
                        {this.state.userData.profileLetters}
                      </span>

                      {this.state.socialData.length > 0 && (
                        <ProfileSocialAccounts data={this.state.socialData} />
                      )}

                      {this.state.hacks && <RegisteredHackList hacks={this.state.hacks} />}
                    </div>

                    {/* RIGHT COLUMN */}
                    <ErrorBoundary>
                      <div className="user-data">
                        <h2 className="h2 profile__name mb-1">{this.state.userData.name}</h2>

                        <div className="mb-2">
                          Auth Providers:{' '}
                          {this.props.user.provider.map((type, index) => {
                            if (type.providerId === 'github.com') {
                              return (
                                <MaterialDesignIcon key={index} iconClass="mx-1" name="github" />
                              )
                            } else if (type.providerId === 'google.com') {
                              return (
                                <MaterialDesignIcon key={index} iconClass="mx-1" name={'google'} />
                              )
                            } else if (type.providerId === 'password') {
                              return (
                                <MaterialDesignIcon key={index} iconClass="mx-1" name={'lock'} />
                              )
                            } else {
                              return false
                            }
                          })}
                        </div>
                        <div>
                          <div className="mb-2">
                            <span>
                              <MaterialDesignIcon name="email" /> Email: {this.state.userData.email}
                            </span>
                          </div>
                          <div className="mb-2">
                            <span>
                              <MaterialDesignIcon name="key" /> UserId: {this.profileId}
                            </span>
                          </div>
                          {this.state.userData && this.state.userData.demographicData && (
                            <>
                              <ProfileDemographicData
                                icon="book"
                                title="Current Student"
                                label={
                                  this.state.userData.demographicData.educationStatus.label || ''
                                }
                              />
                              <ProfileDemographicData
                                icon="graduation-cap"
                                title="Highest Degree Earned"
                                label={
                                  this.state.userData.demographicData.highestDegree.label || ''
                                }
                              />
                              <ProfileDemographicData
                                icon="map"
                                title="Country"
                                label={this.state.userData.demographicData.country.label || ''}
                              />
                              <ProfileDemographicData
                                icon="map"
                                title="City"
                                label={this.state.userData.demographicData.state}
                              />
                              <ProfileDemographicData
                                icon="map"
                                title="State"
                                label={this.state.userData.demographicData.state}
                              />
                            </>
                          )}
                          <div className="py-2 bd-t1 mt-3 cl-grey">
                            <div className="mb-2">
                              <MaterialDesignIcon name="time" /> Joined: {this.props.user.createdAt}{' '}
                            </div>
                            <div className="mb-2">
                              <MaterialDesignIcon name="time" /> Last Login:{' '}
                              {this.props.user.lastLoginAt}{' '}
                            </div>
                          </div>
                        </div>

                        {this.state.userData && this.state.userData.programmingExperience && (
                          <div className="py-2 mt-3">
                            <SkillsTable
                              sorted="alpha"
                              title="Programming Experience"
                              items={Object.entries(this.state.userData.programmingExperience)}
                            />
                          </div>
                        )}
                      </div>
                    </ErrorBoundary>
                  </div>
                ) : (
                  <div className="profile">
                    <div className="">
                      <p>
                        User <span>{this.profileId}</span> does not exist.
                      </p>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          </Section>
        </Page>
      )
    }
  }
}

export default withRouter(ProfileViewPage)
