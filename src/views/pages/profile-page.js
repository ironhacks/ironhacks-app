import React from 'react';
import { Page, Section, Row, Col } from '../../components/layout';
import { MaterialDesignIcon } from '../../components/icons/material-design-icon';
import { SkillsTable } from '../../components/skills-table';
import { ErrorBoundary } from '../../util';
import { userMetrics } from '../../util/user-metrics'

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

class TrainingKeyLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUrl: false,
    }
    this.onResolve = this.onResolve.bind(this)
  }

  onResolve(foundURL) {
    this.setState({fileUrl: foundURL});
  }

  onReject(error) {
    // console.log('Training key file not found')
  }

  getFileUrl() {
    window.firebase.storage()
      .ref('/data/ DeKE13nHvqzolDUa0Fg9/keys/competition')
      .child(`${this.props.userId}.json`)
      .getDownloadURL()
      .then(this.onResolve, this.onReject);
  }

  componentDidMount() {
    this.getFileUrl()
  }


  downloadFileUrl() {
    window.firebase.analytics().logEvent('download_file', {type: 'key_file'})
    userMetrics({
      event: 'download_file',
      data: {
        fileType: 'key_file',
        filePath: this.state.fileUrl,
      }
    })

    fetch(this.state.fileUrl, {
      method: 'GET',
    })
    .then(response => response.text())
    .then(fileContents => {
      var element = window.document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContents));
      element.setAttribute('download', this.props.fileName);
      element.style.display = 'none';
      window.document.body.appendChild(element);
      element.click();
      window.document.body.removeChild(element);
    }).catch(error => console.error(error));

  }

  render() {
    return(
      <>
      {this.state.fileUrl && (
        <div className="flex flex-center">
          <div
            type="submit"
            className="badge badge-primary py-2 px-10 h4 font-semibold m-0"
            onClick={(()=>{this.downloadFileUrl()})}
          >
            Download your hack dataset api key
          </div>
        </div>
        )}
        </>
      )
    }
}


class RegisteredHackList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registeredHacks: [],
    }

    this.renderList = this.renderList.bind(this)
    this.getHackList = this.getHackList.bind(this)
  }

  componentDidMount() {
    if (this.props.hacks) {
      this.getHackList(this.props.hacks);
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

  renderList() {
    return  (
      this.state.registeredHacks.map((item, index)=>(
        <li key={index}>
          <span>{item}</span>
        </li>
      ))
    )
  }

  render() {
    return (
      <div className="registered-hack-list">
        <h3 className="mt-6 h3 font-bold">
          Registered Hacks
        </h3>

        <ul className="pl-2 fs-m2">
          {this.renderList()}
        </ul>
      </div>
    )
  }
}


class ProfileDemographicData extends React.Component {
  render() {
    return (
      <div className="mb-2">
        <MaterialDesignIcon name={this.props.icon}/>
        <span> {this.props.title}: {this.props.label}</span>
      </div>
    )
  }
}




class ProfileSocialAccounts extends React.Component {
  render(){
    return (
    <div className="registered-hack-list">
      <h3 className="mt-6 h3 font-bold">
        Social
      </h3>
      <ul className="pl-2 fs-m2">
        {this.props.data.map((item, index)=>(
          <li key={index}>
            <MaterialDesignIcon iconClass="mx-1" name={item.name}/>
            <span style={{display: 'none', textTransform: 'capitalize'}}>{item.name}:</span>
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
    )
  }
}


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hacks: null,
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
      },
      socialData: [],
    }
  }

  componentDidMount() {
    window.firebase.analytics().logEvent('view_profile')
    userMetrics({event: 'view_profile'})
    let userId = this.props.user.userId;
    if (userId) {
      this.getUserData(userId);
    }
  }


  getUserData(userId) {
    window.firebase.firestore()
      .collection('users')
      .doc(userId)
      .get()
      .then((doc)=>{
        if (doc.exists) {
          var programming = {};
          var demographic = {};
          var social = [];
          let data = doc.data();
          let prgExp = this.state.userData.programmingExperience;
          let demDat = this.state.userData.demographicData;

          if (data.profileData){
            if (data.profileData.socialMedia) {
              social = Object.keys(data.profileData.socialMedia).map((key, index)=>{
                return {name: key, value: data.profileData.socialMedia[key] }
              }).filter((item)=>{
                return item.value;
              })
            }
            if (data.profileData.programmingExperience) {
              programming = Object.assign({}, prgExp, data.profileData.programmingExperience);
            }
            if (data.profileData.demographicData) {
              demographic = Object.assign({}, prgExp, data.profileData.demographicData);
            }
          }

          this.setState({
            hacks: data.hacks,
            socialData: social,
            userData: {
              programmingExperience: {
                ...prgExp,
                ...programming,
              },
              demographicData: {
                ...demDat,
                ...demographic
              }
            }
          })
        }
      })
  }

  render() {
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
          <TrainingKeyLink
            fileName={'service-account.json'}
            userId={this.props.user.uid}
          />
        </Row>
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

                  {this.state.socialData.length > 0 && (
                    <ProfileSocialAccounts
                      data={this.state.socialData}
                    />
                  )}

                  {this.state.hacks && (
                    <RegisteredHackList
                      hacks={this.state.hacks}
                    />
                  )}
                  </div>

                {/* RIGHT COLUMN */}
                <ErrorBoundary>
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
                        <ProfileDemographicData
                          icon="book"
                          title="Current Student"
                          label={this.state.userData.demographicData.educationStatus.label || ''}
                        />
                        <ProfileDemographicData
                          icon="graduation-cap"
                          title="Highest Degree Earned"
                          label={this.state.userData.demographicData.highestDegree.label || ''}
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

                </ErrorBoundary>
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


export default ProfilePage;
