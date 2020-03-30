import React from 'react';
import styled from 'styled-components';
// import {Theme} from '../../theme';
import forumIcon from '../../assets/svg/forum-icon.svg';

const ForumItemContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 70px;
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

class ForumItem extends React.Component {
  onNameChange = (e) => {
    const name = e.target.value;
    this.props.onForumItemUpdate(name, false, this.props.forumIndex);
  };

  onTreatmentChange = (e) => {
    const treatment = e.target.value;
    this.props.onForumItemUpdate(false, treatment, this.props.forumIndex);
  };

  render() {
    return (
      <ForumItemContainer>
        <div>
          <img src={forumIcon} alt='forum-icon'/>
          <span className='interval'>{'Forum ' + (this.props.forumIndex + 1)}</span>
        </div>
        <div>
          <input type='text' placeholder='Forum Name' onChange={this.onNameChange}/>
          <div className='treatment-div'>
            <span>Treatment identifier:</span>
            <input type='number' name='treatmentIdentifier' defaultValue={this.props.treatment} min='0' onChange={this.onTreatmentChange}/>
          </div>
        </div>
      </ForumItemContainer>
    );
  }
}

export default ForumItem;
