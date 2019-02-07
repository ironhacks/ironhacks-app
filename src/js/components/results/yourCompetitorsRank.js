// IronHacks Platform
// yourCompetitorsRank.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
import ComperitorRow from './comperitorRow.js';
//Custom Constants
import * as Constants from '../../../constants.js';
// import * as Texts from './staticTexts.js';


const SectionContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  border-radius: ${Constants.universalBorderRadius};

  .save-button {
    margin-top: 10px;
    border: none;
    border-radius: ${Constants.universalBorderRadius};
    background-color: #FFD75F;
    cursor: pointer;
  }
`;

const Table = styled('table')`
  border-collapse: collapse;
  border-radius: 1em;
  overflow: hidden;
  width: 100%;
  
  thead {
    background-color: #FFD75F;
  }

  tr {
    position: relative;
    height: 60px;

    :nth-child(even) {
      background-color: #fff1c7;
    }

    td, th {
      text-align: center;
    }
  }

  a {
    padding: 10px;
    font-weight: 700;
    color: white;
    background-color: #e6b92f;
    border-radius: 4px;
  }
`;

class YourCompetitorsRank extends React.Component {
  constructor(props){
    super(props)
    this.state =  {
      likedUsers: [],
    }
  }

  componentDidMount() {
    
  }

  onLike = (hakerId) => {
    const likedUsers = this.state.likedUsers;
    likedUsers[hakerId] = !likedUsers[hakerId];
    this.setState({likedUsers});
  }

  saveLikes = () => {
    let likedUsers= [];
    for(const k in this.state.likedUsers) {
      if (this.state.likedUsers[k]) likedUsers.push(k);
    }
    this.props.onLikedCompetitors(likedUsers);
  }

  render() {
    return (
      <SectionContainer>
        <Table>
          <thead>
            <tr>
              <th>Hacker</th>
              <th>Project Link</th>
              {this.props.treatment === "1" && 
              <th>similarity</th>
              }
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.scores.similarity).map((key, i) => {
              return (
                <ComperitorRow
                  key={i}
                  hacker={this.props.participants[key]}
                  hackerId={key}
                  hackName={this.props.hackName}
                  score={this.props.treatment === "1" ? this.props.scores.similarity[key] : null}
                  onLike={this.onLike}
                />
              );
            })}
          </tbody>
        </Table>
        <button onClick={this.saveLikes} className='save-button'>Save likes</button>
      </SectionContainer>
    );
  }
}

export default YourCompetitorsRank;