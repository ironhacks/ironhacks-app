import React from 'react';
import { withCookies } from 'react-cookie';
import styled, { ThemeProvider } from 'styled-components';
import { Theme } from '../../theme';

// const colors = Theme.COLORS;
const styles = Theme.STYLES.AppSectionTheme;

const SectionContainer = styled('div')`
  width: 100%;
  height: ${(props) => props.theme.containerHeight};
  background-color: ${(props) => props.theme.backgroundColor};

  h1 {
    margin-bottom: 20px;

    &:first-child {
      margin-top: 150px;
    }
  }

  h2 {
    margin-top: 50px;
  }

  .padding {
    padding: 0 10%;
  }
`;

const ProfileContainer = styled('div')`
  display: flex;
  justify-content: center;
  padding: 0 10%;
  margin: 100px 0 20px 0;
  width: 100%;

  span {
    width: 250px;
    height: 250px;
    background-color: lightgray;
    text-align: center;
    font-size: 140px;
    border-radius: 125px;
    padding: 17px 0;
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
    //
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
      <ThemeProvider theme={styles}>
        <SectionContainer>
          <ProfileContainer>
            <span>{this.props.user.profileLetters}</span>
            <div className='user-data'>
              <h3>Personal Info:</h3>
              <p>
                Name: {this.props.user.displayName} <br />
                Email: {this.props.user.email}
              </p>
              <pre>
              {JSON.stringify(this.props.user,null, '\t')}
              </pre>
            </div>
          </ProfileContainer>

        </SectionContainer>
      </ThemeProvider>
    );
  }
}


export default withCookies(ProfilePage);
