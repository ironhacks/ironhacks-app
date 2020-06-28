import React from 'react';
import styled from 'styled-components';
import HackWhitelistItem from './hack-whitelist-item';
import AvailableActionsDiv from '../../util/availableActionsDiv.js';
import Button from '../../util/button';

const WhitelistContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 15px;
  overflow-x: auto;
`;

const NewWhitelistItem = styled('input')`
  width: 100%;
`;

class AdminHackWhitelist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whitelist: this.props.whitelist,
    }
    this.onWhitelistItemChange = this.onWhitelistItemChange.bind(this);
    this.onWhitelistChange = this.onWhitelistChange.bind(this);
    this.onWhitelistItemDelete = this.onWhitelistItemDelete.bind(this);
    this.normalizeEmailArray = this.normalizeEmailArray.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.validateEmailStructure = this.validateEmailStructure.bind(this);
  }

  onWhitelistChange(e) {
    if (e.target.value.split(/,| |\n/).length > 1) {
      this.normalizeInputContent(e.target.value);
    }
  }

  onWhitelistItemChange(email, index) {
    this.setState((prevState, props) => {
      prevState.whitelist[index] = email;
      return { whitelist: prevState.whitelist };
    })
  }

  onWhitelistItemDelete(index) {
    this.setState((prevState, props) => {
      if (prevState.whitelist.length === 1) {
        return {
          whitelist: ['']
        }
      } else {
        prevState.whitelist.splice(index, 1);
        return {
          whitelist: prevState.whitelist
        }
      }
    })
  }

  // This function sort the emails array, then remove the duplicates.
  normalizeEmailArray(array) {
    let validArray = [];
    for (let item of array){
      if (this.validateEmailStructure(item)) {
        validArray.push(item);
      }
    }

    if (validArray.length > 0) {
      validArray.sort(function(a, b) {
        return a.localeCompare(b);
      })
    }
    return validArray;
  }

  validateEmailStructure(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }


  saveChanges(e) {
    e.preventDefault();
    let whitelist = this.state.whitelist;
    let normalizedWhitelist = this.normalizeEmailArray(whitelist);
    this.props.onSaveSettings(normalizedWhitelist);

    this.setState({
      whitelist: normalizedWhitelist
    })

  }


  normalizeInputContent(textareaContent) {
    const emailList = textareaContent.split(/,| |\n/);
    emailList.splice(1, 1);
    this.setState((prevState, props) => {
      const joinedList = prevState.whitelist.concat(emailList);
      if (joinedList[0] === '') {
        joinedList.splice(0, 1);
      }
      return { whitelist: joinedList };
    })
  }

  render() {
    return (
      <>
        <WhitelistContainer>
          {this.props.whitelist &&
            this.props.whitelist.map((item, index, arr) => {
              return (
                  <HackWhitelistItem
                    key={index + item}
                    index={index}
                    userEmail={item}
                    onItemChange={this.onWhitelistItemChange}
                    onItemDelete={this.onWhitelistItemDelete}
                    isValid={this.validateEmailStructure(item)}
                  />
              )
            })}

        <NewWhitelistItem
          id='whitelist'
          name="new_items"
          onChange={this.onWhitelistChange}
          type="text"
          autoComplete="off"
          autoFocus
        />

        </WhitelistContainer>

        <AvailableActionsDiv>
          <Button
            primary
            width='150px'
            margin='0 0 0 15px'
            onClick={this.saveChanges}
          >
            Save
          </Button>
        </AvailableActionsDiv>
        </>
    )
  }
}

export default AdminHackWhitelist;
