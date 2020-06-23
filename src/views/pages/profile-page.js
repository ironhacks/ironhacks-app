import React from 'react';
import { withCookies } from 'react-cookie';
import styled from 'styled-components';
import { Page, Section, Row, Col } from '../../components/layout';
import { MaterialDesignIcon } from '../../components/icons/material-design-icon';

const ProfileContainer = styled('div')`
  display: flex;
  justify-content: center;
  padding: 0 10%;
  margin: 100px 0;
  width: 100%;


  .profile__initials {
    width: 200px;
    height: 200px;
    background-color: lightgray;
    font-size: 100px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 100%;
  }

  .profile__img {
    width: 200px;
    height: 200px;
    max-width: none;
    max-height: none;
    border-radius: 50%;
  }

  .user-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin-left: 50px;
  }
`;


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
        <Section sectionClass="py-5">
          <Row>
            <Col>
              <ProfileContainer>
                <div className="profile">
                  {this.props.user.provider[0].photoURL ? (
                    <img
                      className="profile__img"
                      alt="User Profile"
                      src={this.props.user.provider[0].photoURL}
                    />
                  ) : (
                    <span className="profile__initials">{this.props.user.profileLetters}</span>
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
              </ProfileContainer>
            </Col>
          </Row>
        </Section>
      </Page>
    )
  }
}


export default withCookies(ProfilePage);
