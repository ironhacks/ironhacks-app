import React from 'react';
import { Redirect } from 'react-router-dom';
import { AdminHackCardList, AdminNewHackCard } from '../../components/hacks';
import Separator from '../../util/separator';
import { Page, Section, Row, Col } from '../../components/layout';
import { Breadcrumb } from 'react-bootstrap'


class AdminHackSelectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startNewHackNav: false,
      startDashboardNav: false,
      hacks: [],
    };
    this.goToNewHack = this.goToNewHack.bind(this);
    this.getHacks = this.getHacks.bind(this);
  }

  componentDidMount() {
    this.getHacks();
  }

  async getHack(hackId) {
    let hack = await window.firebase.firestore()
      .collection('hacks')
      .doc(hackId)
      .get();

    if (hack.exists) {
      var hackData = hack.data();
      return hackData;
    }

    return false;
  }

  async getHacks() {
    const hacks = [];
    let hacksData = await window.firebase.firestore()
      .collection('hacks')
      .get();

    Promise.resolve(hacksData);

    for (let hack of hacksData.docs){
      let hackData = hack.data();
      hackData.id = hack.id;
      hacks.push(hackData);
    }

    this.setState({
      hacks: hacks,
    })
  }

  goToNewHack() {
    this.setState({ startNewHackNav: true });
  }

  goToHackDashBoard(hackIndex) {
    this.setState((prevState, props) => {
      return {
        startDashboardNav: true,
        selectedHack: prevState.hacks[hackIndex],
      };
    });
  }

  render() {
    if (this.state.startNewHackNav === true) {
      return <Redirect push to='admin/new-hack' />;
    }

    if (this.state.startDashboardNav === true) {
      const selectedHack = this.state.selectedHack;
      const selectedHackId = this.state.selectedHack.id;
      const hackName = selectedHack.name;
      const pathname = '/admin/dashboard/' + hackName;

      return (
        <Redirect
          push
          to={{
            pathname: pathname,
            state: {
              hack: selectedHack,
              hackId: selectedHackId
            },
          }}
        />
      )
    }

    return (
      <Page
        user={this.props.user}
        userIsAdmin={this.props.userIsAdmin}
      >
        <Breadcrumb>
          <Breadcrumb.Item href="/admin">
            Admin
          </Breadcrumb.Item>
        </Breadcrumb>

        <Section sectionClass="py-2">
          <Row>
            <Col colClass="">
              <h1>Hack Admin Dashboard</h1>

              <Separator primary />

              <AdminNewHackCard onClick={this.goToNewHack} />
              <div className="">
                <AdminHackCardList
                  emptyText={'There are no hacks.'}
                  hacks={this.state.hacks}
                />
              </div>
            </Col>
          </Row>
        </Section>
      </Page>
    )
  }
}

export default AdminHackSelectPage;
