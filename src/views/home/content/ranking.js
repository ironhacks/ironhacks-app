import React from 'react';
import styled from 'styled-components';
import PreviousHackItem from './previousHackItem.js';
import { PriorHacksData } from './priorHacksData';
import { Theme } from '../../../theme';

const colors = Theme.COLORS;

const HackSelector = styled('div')`
  display: flex;
  justify-content: center;
  height: 40px;
  width: 100%;
  margin: 25px 0;

  button {
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: transparent;
    margin-right: 10px;
    font-weight: 700;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      background-color: lightgray;
    }

    &:disabled {
      cursor: inherit;
      color: black;
    }

    &.selected {
      background-color: #fff1c7;
    }
  }
`;

const Separator = styled('div')`
  width: 100%;
  height: 1px;
  background-color: ${colors.mainBgColor};
`;

export default class RankingSection extends React.Component {
  constructor(props) {
    super(props);
    const selectedHack = PriorHacksData.length - 1;
    this.state = {
      selectedHack,
    };
  }

  changeHack = (event) => {
    this.setState({ selectedHack: parseInt(event.target.id, 10) });
  };

  render() {
    return (
      <>
        <h1>Prior Hacks</h1>
        <Separator />

        <HackSelector>

          {PriorHacksData.map((hack, index) => {
            if (this.state.selectedHack === index) {
              return (
                <button className='selected' disabled id={index} key={index}>
                  {hack.name}
                </button>
              );
            }
            return (
              <button onClick={this.changeHack} id={index} key={index}>
                {hack.name}
              </button>
            );
          })}
        </HackSelector>

        <PreviousHackItem
          selectedHack={this.state.selectedHack}
          />
      </>
    );
  }
}
