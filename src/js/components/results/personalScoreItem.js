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
  width: 100%;
  flex-direction: column;
  border-radius: 30px;
  margin-bottom: 30px;

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

const Contents = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-right: solid 1px ${(props) => Constants.personalFeddbackTheme[props.type].backgroundColor};
  border-left: solid 1px ${(props) => Constants.personalFeddbackTheme[props.type].backgroundColor};
  border-bottom: solid 1px ${(props) => Constants.personalFeddbackTheme[props.type].backgroundColor};
`;

const SubSection = styled('div')`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  .sub-category-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
  }

  .score {
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20%;
    height: 100%;
    background-color: ${(props) => Constants.personalFeddbackTheme[props.type].lightBackgroundColor};

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
        <Contents type={this.props.type}>
          <SubSection type={this.props.type}>
            <div className='sub-category-text'>
              <h3>Effort for excellence</h3>
              {Texts.personalFeddback[this.props.type].efe}
            </div>
            <div className="score">
              <h3>25</h3>
              <span>Total points</span>
            </div>
          </SubSection>
          <SubSection type={this.props.type}>
            <div className="sub-category-text">
              <h3>Progress on Requirements</h3>
              {Texts.personalFeddback[this.props.type].por}
            </div>
            <div className="score">
              <h3>25</h3>
              <span>Total points</span>
            </div>
          </SubSection>
        </Contents>
      </ItemContainer>
    );
  }
}

export default PersonalScoreItem;