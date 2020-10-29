import { Component } from 'react';
import { Link, Redirect, Switch, Route, withRouter } from 'react-router-dom';
import { Page, Section, Row, Col } from '../../components/layout';
import { AdminUtils } from '../admin';


class AdminUtilsNav extends Component {
  constructor(props) {
    super(props);
    this.baseUrl = '/admin/utils';
  }

  render() {
    return (
      <div className='admin-sidebar col-md-2'>
        {this.props.items.map((item, index)=>(
          <Link
            key={index}
            to={`${this.baseUrl}/${item.path}`}
            className="nav-item"
            >

            <div className="admin-sidebar__item">
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    )
  }
}

AdminUtilsNav.defaultProps = {
  items: [],
}

class AdminUtilsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  render() {
    if (!this.props.userIsAdmin) {
      return (<Redirect push to='/hacks'/>)
    } else {
      return (
        <Page
          pageClass="admin-page"
          user={this.props.user}
          userIsAdmin={this.props.userIsAdmin}
        >

        <Section sectionClass='container-fluid' containerClass="flex">
          <AdminUtilsNav
            hackId={''}
            items={[
              {name: 'Users', path: 'users'},
              {name: 'Metrics', path: 'metrics'},
            ]}
          />

          <div className="admin-hack-content">
            <Row rowClass='no-gutters py-2'>
              <Col colClass="">
                <Switch>
                  <Route exact path={this.props.match.url + '/metrics'}>
                    <AdminUtils.Metrics

                    />
                  </Route>

                  <Route exact path={this.props.match.url + '/users'}>
                    <AdminUtils.Users

                    />
                  </Route>

                </Switch>
              </Col>
            </Row>
          </div>
        </Section>
      </Page>
    )
  }
  }
}

export default withRouter(AdminUtilsPage)
