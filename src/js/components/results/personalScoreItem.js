// IronHacks Platform
// personalScoreItem.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, { ThemeProvider, css } from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
import * as Texts from './staticTexts.js';

const ItemContainer = styled('div')`
  display: flex;
  width: 32%;
  flex-direction: column;
  border-radius: 30px;

  h2 {
    margin-bottom: 0;
    font-weight: 700;
  }

  h3 {
    margin: 15px 0 12px 0;
  }

  span {
    &.category-weight {
      font-size: 14px;
      margin-bottom: 10px;
      margin-top: -8px;
    }
  }

  p {
    text-align: justify;
    padding: 0 40px;
  }

  .contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-top: 10px;
    border-right: solid 1px ${(props) => Constants.personalFeddbackTheme[props.type].backgroundColor};
    border-left: solid 1px ${(props) => Constants.personalFeddbackTheme[props.type].backgroundColor};
  }

  .score {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: ${(props) => Constants.personalFeddbackTheme[props.type].backgroundColor};
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    border-right: solid 1px ${(props) => Constants.personalFeddbackTheme[props.type].backgroundColor};
    border-left: solid 1px ${(props) => Constants.personalFeddbackTheme[props.type].backgroundColor};
    border-bottom: solid 1px ${(props) => Constants.personalFeddbackTheme[props.type].backgroundColor};

    h3 {
      font-size: 70px;
      margin-top: 0;
      margin-bottom: 0;
    }

    span {
      margin-top: -20px;
      margin-bottom: 20px;
    }
  }

`;

const Title = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 15px;
  margin-top: -1px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: ${(props) => Constants.personalFeddbackTheme[props.type].backgroundColor};
`;

class PersonalScoreItem extends React.Component {
  constructor(props){
    super(props)
    this.state =  {
      subSection: 'efe',
    }
  }

  componentDidMount() {
    
  }

  render() {
    console.log(this.props)
    return (
      <ItemContainer type={this.props.type}>
        <Title type={this.props.type}>
          <h2>{this.props.type.toUpperCase()}</h2>
          <span className='category-weight'>{`(${Texts.personalFeddback[this.props.type].weight} of total value)`}</span>
        </Title>
        {this.state.subSection === 'efe' &&
          <React.Fragment>
            <div className="contents">
              <h3>Effort for excellence</h3>
              {Texts.personalFeddback[this.props.type].efe}
            </div>
            <div className="score">
              <h3>25</h3>
              <span>Total points</span>
            </div>
          </React.Fragment>
        }
      </ItemContainer>
    );
  }
}

export default PersonalScoreItem;