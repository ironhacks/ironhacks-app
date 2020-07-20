import React from 'react';
import { withCookies } from 'react-cookie';
import { Page, Section, Row, Col } from '../../components/layout';
import { MaterialDesignIcon } from '../../components/icons/material-design-icon';
import { SkillsTable } from '../../components/skills-table';
import '../../styles/css/profile.css';


function getHackName(hackId) {
  return window.firebase.firestore()
    .collection('hacks')
    .doc(hackId)
    .get()
    .then((doc)=>{
      if (doc.exists) {
        return doc.data().name
      } else {
        return '';
      }
    })
}

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registeredHacks: null,
      userData: {
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
            python:null,
            r: null,
            ruby: null,
            sas_stata: null,
            scala: null,
            sql: null,
            vba: null,
          },
          demographicData: {
            highestDegree: { label: '', value: null },
            educationStatus: { label: '', value: null },
            country: { label: '', value: null },
            city: null,
            state: null,
          },
          socialMedia: {
            facebook: null,
            linkedin: null,
            instagram: null,
          }
      }
    }
  }

  getHackList(hacks){
    let result = [];
    hacks.forEach((item, i) => {
      result.push(getHackName(item))
    })

    Promise.all(result).then((names)=>{
      this.setState({
        registeredHacks: names
      })
    })
  }

  getUserData(userId) {
    window.firebase.firestore()
      .collection('users')
      .doc(userId)
      .get()
      .then((doc)=>{
        if (doc.exists) {
          let data = doc.data();
          console.log(data);
          this.getHackList(data.hacks);
          let defaultUserData = this.state.userData;
          
          this.setState({
            userData: Object.assign({}, defaultUserData, data.profileData),
          })
        }
      })
  }
  componentDidMount() {
    console.log(this.props.user)
    let userId = this.props.user.userId;
    if (userId) {
      this.getUserData(userId);
    }
  }

  render() {
    return (
      <Page
        user={this.props.user}
        userIsAdmin={this.props.userIsAdmin}
      >
        <Section sectionClass="pt-5">
          <Row>
            <Col>
              {/* LEFT COLUMN */}
              <div className="profile">
                <div className="">
                  {this.props.user.provider[0].photoURL ? (
                    <img
                      className="profile__img"
                      alt="User Profile"
                      src={this.props.user.provider[0].photoURL}
                    />
                  ) : (
                    <span className="profile__initials">
                      {this.props.user.profileLetters}
                    </span>
                  )}

                  {this.state.registeredHacks && (
                    <div className="registered-hack-list">
                      <h3 className="mt-6 h3 font-bold">
                        Registered Hacks
                      </h3>

                      <ul className="pl-2 fs-m2">
                      {this.state.registeredHacks.map((item, index)=>(
                        <li key={index}>
                          <span>{item}</span>
                        </li>
                      ))}
                      </ul>

                    </div>
                  )}
                  </div>

                {/* RIGHT COLUMN */}

                <div className='user-data'>
                  <h2 className="h2 profile__name mb-1">{this.props.user.displayName}</h2>

                  <div className="mb-2">
                    Auth Providers: {this.props.user.provider.map((type, index)=>{
                    if (type.providerId === 'github.com') {
                      return (<MaterialDesignIcon key={index} iconClass="mx-1" name='github'/>)
                    } else if (type.providerId === 'google.com') {
                      return (<MaterialDesignIcon key={index} iconClass="mx-1" name={'google'}/>)
                    } else if (type.providerId === 'password') {
                      return (<MaterialDesignIcon key={index} iconClass="mx-1" name={'lock'}/>)
                    } else {
                      return false;
                    }
                  })}
                  </div>
                  <div>
                    <div className="mb-2"><MaterialDesignIcon name="email"/> Email: {this.props.user.email} </div>
                    <div className="mb-2"><MaterialDesignIcon name="key"/> UserId: {this.props.user.userId} </div>
                    {this.state.userData && this.state.userData.demographicData && (
                        <>
                        <div className="mb-2">
                        <MaterialDesignIcon name="book"/> Current Student: {this.state.userData.demographicData.educationStatus.label}
                        </div>
                        <div className="mb-2">
                        <MaterialDesignIcon name="graduation-cap"/> Highest Degree Earned: {this.state.userData.demographicData.highestDegree.label}
                        </div>
                        <div className="mb-2"><MaterialDesignIcon name="map"/> Country: {this.state.userData.demographicData.country.label}</div>
                        <div className="mb-2"><MaterialDesignIcon name="map"/> City: {this.state.userData.demographicData.city}</div>
                        <div className="mb-2"><MaterialDesignIcon name="map"/> State: {this.state.userData.demographicData.state}</div>
                        </>
                      )}
                      <div className="py-2 bd-t1 mt-3 cl-grey">
                      <div className="mb-2"><MaterialDesignIcon name="time"/> Joined: {this.props.user.createdAt} </div>
                      <div className="mb-2"><MaterialDesignIcon name="time"/> Last Login: {this.props.user.lastLoginAt} </div>
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
              </div>
            </Col>
          </Row>
        </Section>
        <Section>
          <Row rowClass="flex justify-content-center py-4 mr-5 mb-5">
            <a href="/profile/edit">
            <button
              className="btn btn- bg-primary px-8"
              onClick={this.updateProfileData}
            >
              Edit Profile
            </button>
            </a>
          </Row>
        </Section>
      </Page>
    )
  }
}


export default withCookies(ProfilePage);
