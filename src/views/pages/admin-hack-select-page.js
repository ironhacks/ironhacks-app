import { Component } from 'react';
import { AdminHackCardList } from '../../components/hacks';
import { Page, Section, Row, Col } from '../../components/layout';

class AdminHackSelectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDashboardNav: false,
      hacks: [],
    }
  }

  componentDidMount() {
    this.getHacks();
  }

  getHacks = async () => {
    const hacks = [];
    let hackDocs = await window.firebase.firestore()
      .collection('hacks')
      .get();

    for (let hack of hackDocs.docs){
      hacks.push({
        ...hack.data(),
        id: hack.id
      })
    }

    hacks.sort((a,b)=>{ return a.name.localeCompare(b.name) })
    this.setState({hacks: hacks})
  };

  render() {
    return (
      <Page
        user={this.props.user}
        userIsAdmin={this.props.userIsAdmin}
      >
        <Section sectionClass="py-2">
          <Row>
            <Col>
              <div className="flex flex-between bd-b1 py-2 mb-2 flex-center">
                <h1>Hack Admin Dashboard</h1>

                <a
                  className="badge cursor btn"
                  href="/admin/new-hack"
                  >
                    &#43;New Hack
                </a>
              </div>

              <AdminHackCardList
                hacks={this.state.hacks}
              />
            </Col>
          </Row>
        </Section>
      </Page>
    )
  }
}

export default AdminHackSelectPage;
