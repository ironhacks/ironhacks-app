import React from 'react';
import ForumSelector from './forum-selector';

class AdminForumView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hacks: [],
      selectedHack: 0,
    }
  }

  componentDidMount() {
    this.getHacks()
  }

  getHacks = () => {
    const hacks = [];
    window.firebase.firestore()
      .collection('hacks')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const hackData = doc.data();
          hackData.id = doc.id;
          hacks.push(hackData);
        })

        this.setState({
          hacks: hacks,
          selectedHack: 0
        });
        this.getForums();
      })
      .catch(function(error) {
        console.error('Error getting documents: ', error);
      });
  };

  onhackSelector = hackIndex => {
    this.setState({
      selectedHack: hackIndex,
      forum: 0
    })
    this.getForums(hackIndex);
  };

  onForumSelection = forumIndex => {
    this.setState({ forum: forumIndex });
    this.getThreadsAdmin(forumIndex);
  };


  render() {
    return (
      <>
      <ForumSelector
        onSelection={this.onhackSelector}
        selector={this.state.hacks}
      />
      <ForumSelector
        onSelection={this.onForumSelection}
        selector={this.state.hacks[this.state.selectedHack].forums}
      />
      </>
    )
  }
}


export { AdminForumView }
