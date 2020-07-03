import React from 'react';
import { withCookies } from 'react-cookie';
import { Page, Section, Row, Col } from '../../components/layout';
import { MaterialDesignIcon } from '../../components/icons/material-design-icon';
import '../../styles/css/profile.css';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    // const { cookies } = props;

    this.state = {
      // currentHack: cookies.get('currentHack') || null,
      currentHack: '',
      // forum: cookies.get('currentForum') || null,
      forum: '',
      startNewProjecNav: false,
      startProjectEditorNav: false,
      projects: [],
      hackData: null,
      user: this.props.user,
    };

    // if (this.props.location.state) {
    //   this.state.user = this.props.location.state.user;
    // }

    this.firestore = window.firebase.firestore();
  }

  setProjects(projects) {
    console.log('set projects', projects);
    this.setState({'projects': projects})
  }

  componentDidMount() {
    // const userid = this.state.user.userId;
    // var projectsPromise = ProjectApi.getProjects(userid);
    // const _this = this;
    // projectsPromise.then(function(projects){
    //   console.log('projects', projects);
    //   _this.setProjects(projects);
    // })
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
                </div>

                <div className='user-data'>
                  <h2 className="h2 profile__name mb-2">{this.props.user.displayName}</h2>
                  <div>
                    <div className="mb-2"><MaterialDesignIcon name="email"/> Email: {this.props.user.email} </div>
                    <div className="mb-2"><MaterialDesignIcon name="key"/> UserId: {this.props.user.userId} </div>
                    <div className="mb-2"><MaterialDesignIcon name="time"/> Joined: {this.props.user.createdAt} </div>
                    <div className="mb-2"><MaterialDesignIcon name="time"/> Last Login: {this.props.user.lastLoginAt} </div>
                    <div className="">Auth Providers: {this.props.user.provider.map((type, index)=>{
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
                  </div>
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
              disabled={this.state.updateDisabled}
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
