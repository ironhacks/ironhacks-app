import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Page } from '../../components/layout';
import { NotebookViewer } from '../../components/notebook-viewer';
import { userMetrics } from '../../util/user-metrics'

class NotebookPage extends Component {
  constructor(props) {
    super(props);

    // NOTE: THIS METHOD STRIPS OUT FIREBASE &TOKEN PARAM CAUSING ERROR
    // let queryPath = this.notebookPath = this.props.location.search;
    // if (queryPath) {
      // let urlSearch = new URLSearchParams(window.location.search);
      // let found = urlSearch.get('path');
      // this.path = found ? window.encodeURI(found) : '';

    let found = window.location.href.indexOf('?path=') >= 0;
    if (found) {
      this.path = window.location.href.split('?path=').pop();
      this.name = decodeURIComponent(this.path).split('/').pop();
      if (this.name.indexOf('?') >= 0) {
        this.name = this.name.split('?')[0];
      }
    } else {
      this.path = '';
      this.name = 'File not found';
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
      data: {
        fileName: this.name,
        filePath: this.path,
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
