import React from 'react';
import { Redirect } from 'react-router-dom';

import { Page } from '../../components/layout';

class HubPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }

  }

  componentDidMount() {
  }


  render() {
    if (!this.props.user) {
      return (<Redirect push to='/hacks'/>)
    } else {
      return (
        <Page
          pageClass="admin-page"
          user={this.props.user}
          userIsAdmin={this.props.userIsAdmin}
        >
        <iframe style={{
            width: '100%',
            height: '500px',
          }}
          src="https://hub.ironhacks.com/login"
          title="IronHacks Hub"
        />
      </Page>
    )
  }
  }
}

export default HubPage;
