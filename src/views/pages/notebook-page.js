import React from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Page } from '../../components/layout';
import { NotebookViewer } from '../../components/notebook-viewer';

class NotebookPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
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
  }

  getNotebookPath() {

  }


  componentDidMount() {
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
