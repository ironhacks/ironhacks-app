import React from 'react';
import styled, { css } from 'styled-components';
import { Theme } from '../../../theme';
import { PersonalFeedbackContent } from './personal-feedback-content';
const styles = Theme.STYLES.personalFeddbackTheme;

const ItemContainer = styled('div')`
  display: flex;
  width: 100%;
  flex-direction: column;
  border-radius: 30px;

  h2 {
    margin-bottom: 0;
    font-weight: 700;
  }

  h3 {
    font-size: 30px;
    margin: 15px 0 12px 0;
  }

  span {
    &.category-weight {
      font-size: 20px;
      margin-bottom: 10px;
      margin-top: -8px;
    }
  }

  p {
    text-align: justify;
    padding: 0 15px;
  }
`;

const Title = styled('button')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 15px;
  margin-top: -1px;
  border: none;
  background-color: ${(props) => styles[props.type].backgroundColor};
  cursor: pointer;
`;

const Contents = styled('div')`
  display: flex;
  max-height: ${(props) => (props.active ? '10000px' : '0px')};
  flex-direction: row;
  width: 100%;
  overflow: hidden;
  border-right: solid 1px ${(props) => styles[props.type].backgroundColor};
  border-left: solid 1px ${(props) => styles[props.type].backgroundColor};
  border-bottom: solid 1px ${(props) => styles[props.type].backgroundColor};

  transition: max-height 1s ease-out;
  ${(props) =>
    props.active &&
    css`
      transition: max-height 1s ease-in 0s;
    `};
`;

const VerticalContainer = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 166%;
  flex-grow: 1;

  .horizontal {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`;

const SubSection = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .sub-category-text {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
    width: 100%;
    text-align: center;
  }

  span {
    margin-top: -20px;
    margin-bottom: 5px;
  }

  .score {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: ${(props) => styles[props.type].lightBackgroundColor};

    h3 {
      font-size: 45px;
      margin-top: 0;
      margin-bottom: 0;
      text-overflow: ellipsis;
    }

    span {
      margin-top: -17px;
      margin-bottom: 20px;
    }
  }
`;

class PersonalScoreItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  componentDidMount() {}

  toggleSection = () => {
    this.setState((prevState, props) => {
      const active = !prevState.active;
      return { active };
    });
  };

  render() {
    return (
      <ItemContainer type={this.props.type}>

        <Title type={this.props.type} onClick={this.toggleSection}>
          <h2>{this.props.type.toUpperCase()}</h2>
          <span className='category-weight'>{`(${
            PersonalFeedbackContent[this.props.type].weight
          } of total points)`}</span>
        </Title>

        <Contents type={this.props.type} active={this.state.active}>
          <SubSection type={this.props.type}>
            <div className='sub-category-text'>
              <h3>Points on Requirements</h3>
            </div>
            <div className='score'>
              <h3>{this.props.score[0]}</h3>
              <span>Total points</span>
            </div>
          </SubSection>

          {this.props.type !== 'visualization' && (
            <SubSection type={this.props.type}>
              <div className='sub-category-text'>
                <h3>Points for Excellence</h3>
              </div>
              <div className='score'>
                <h3>{this.props.score[1].toString().slice(0, 5)}</h3>
                <span>Total points</span>
              </div>
            </SubSection>
          )}

          {this.props.type === 'visualization' && (
            <VerticalContainer type={this.props.type}>
              <div className='horizontal'>
                <SubSection type={this.props.type}>
                  <div className='sub-category-text'>
                    <h3>D3.JS Points for Excellence</h3>
                  </div>
                  <div className='score'>
                    <h3>{this.props.score[1].toString().slice(0, 5)}</h3>
                    <span>Total points</span>
                  </div>
                </SubSection>

                <SubSection type={this.props.type}>
                  <div className='sub-category-text'>
                    <h3>UX Points for Excellence</h3>
                    <span>(rated in phase 5 only)</span>
                  </div>
                  <div className='score'>
                    <h3>{this.props.score[2].toString().slice(0, 5)}</h3>
                    <span>Total points</span>
                  </div>
                </SubSection>
              </div>
            </VerticalContainer>
          )}
        </Contents>
      </ItemContainer>
    );
  }
}

export default PersonalScoreItem;
