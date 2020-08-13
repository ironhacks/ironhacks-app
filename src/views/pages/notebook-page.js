import React from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Page } from '../../components/layout';
import { NotebookViewer } from '../../components/notebook-viewer';
import { userMetrics } from '../../util/user-metrics'

class NotebookPage extends React.Component {
  constructor(props) {
    super(props);
    let queryPath = this.notebookPath = this.props.location.search;
    if (queryPath) {
      let urlSearch = new URLSearchParams(window.location.search);
      let found = urlSearch.get('path');
      let name = found.split('/').pop();
      this.name = name;
      this.path = found ? window.encodeURI(found) : '';
    } else {
      this.path = '';
    }
    this.state = {
      loading: false,
    }
  }

  componentDidMount() {
    window.firebase.analytics()
      .logEvent('view_notebook', {
        filePath: this.path,
        fileName: this.name,
      })

    userMetrics({
      event: 'view_notebook',
      metadata: {
        fileName: this.name,
        filePath: this.path,
        location: '/notebook-viewer',
      }
    })
  }


  render() {
    if (!this.props.user) {
      return (<Redirect push to='/'/>)
    } else {
      return (
        <Page
          pageClass="admin-page"
          user={this.props.user}
          userIsAdmin={this.props.userIsAdmin}
          pageTitle="IronHacks | Notebook Viewer"
          pageDescription="Juptyer Notebook Viewer"
          pageUrl="https://ironhacks.com/notebook-viewer"
        >
        <NotebookViewer
          title="Notebook Viewer"
          subtitle={this.name}
          file={this.path}
        />
      </Page>
    )
  }
  }
}

export default withRouter(NotebookPage)
