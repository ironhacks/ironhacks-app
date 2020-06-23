import React from 'react';
import styled from 'styled-components';
import forumIcon from '../../../assets/svg/forum-icon.svg';

const ForumItemContainer = styled('div')`
  margin: 10px 0 10px 15px;

  img {
    height: 20px;
    width: 20px;
    margin-right: 10px;
  }

  span {
    &.interval {
      font-weight: 300;
      font-size: 20px;
    };
  };

  input {
    text-align: right;
    padding-right: 10px;
  }

  .treatment-div{
    margin-top: 10px;
  }
`;

class AdminHackForumItem extends React.Component {
  constructor(props) {
    super(props);

    // const { cookies } = props;
    this.state = {
      currentHack: this.props.hackId || null,
      selectedForum: 0,
      hackForums: {},
      threads: [],
      selectedHack: 0,
    };
  }


  onNameChange(e) {
    const name = e.target.value
    this.props.onForumItemUpdate(name, false, this.props.forumIndex)
  }

  onTreatmentChange(e) {
    const treatment = e.target.value
    this.props.onForumItemUpdate(false, treatment, this.props.forumIndex)
  }


  render() {
    return (
      <div style={{
        display: 'block',
        width: '100%',
        padding: '1em 0',
      }}>
      <ForumItemContainer>
        <div>
          <img src={forumIcon} alt='forum-icon'/>
          <span className='interval'>{'Forum ' + (this.props.forumIndex + 1)}</span>
        </div>

        <div className='interval'>{'Id: ' + (this.props.forumId)}</div>

        <div>
          <input
            type='text'
            placeholder='Forum Name'
            onChange={this.onNameChange}
            value={this.props.name}
          />

          <div className='treatment-div'>

            <span>Treatment identifier:</span>

            <input
              type='number'
              name='treatmentIdentifier'
              defaultValue={this.props.treatment}
              min='0'
              onChange={this.onTreatmentChange}/>

          </div>

          <div>
            <h3>Participants:</h3>
            <pre style={{
              width: '100%',
              whiteSpace: 'break-spaces',
              padding: 0,
              margin: 0,
              position: 'relative',
            }}>
              {JSON.stringify(this.props.participants, null, '  ')}
            </pre>
          </div>
        </div>
      </ForumItemContainer>
    </div>
    )
  }
}


class AdminHackForumView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHack: this.props.hackId || null,
      selectedForum: 0,
      hackForums: [],
      threads: [],
      selectedHack: 0,
    }

  }

  componentDidMount() {
    this.getForums();
  }

  getForums() {
    const forums = [];
    window.firebase.firestore()
      .collection('forums')
      .where('hack', '==', this.props.hackId)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          forums.push({
            id: doc.id,
            data: doc.data(),
          });
        })

        console.log(forums);
        this.setState({
          hackForums: forums
        })

        // this.getThreads();
        // _this.getThreadsAdmin(0);
      })
      .catch(function(error) {
        console.error('Error getting documents: ', error);
      });
  }

  render(){
    return (
      <>
        {this.state.hackForums.map((forum, index, arr) => {
          return (
            <AdminHackForumItem
              hackId={forum.hackId}
              key={index}
              forumIndex={index}
              name={forum.data.name}
              participants={forum.data.participants}
              forumId={forum.id}
              onNameChange={()=>{console.log('test')}}
              treatment={index}
              onTreatmentChange={()=>{console.log('test2')}}
            />
          )
        })}
        </>
    )
  }
}

export default AdminHackForumView;
