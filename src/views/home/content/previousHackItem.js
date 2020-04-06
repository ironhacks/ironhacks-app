import React from 'react';
import styled from 'styled-components';
import { PriorHacksData } from './priorHacksData';
import UNAL2019 from '../../../assets/pages/home/purdue-unal-2019.jpeg';
import COLFlag from '../../../assets/svg/col.svg';

const HackCard = styled('div')`
  opacity: ${(props) => (props.selected ? '1' : '0')}
  width: ${(props) => (props.selected ? '100%' : '0')}
  height: ${(props) => (props.selected ? 'auto' : '0')}
  padding: ${(props) => (props.selected ? '50px 50px' : '0')}
  border: ${(props) => (props.selected ? 'solid 1px #c7c3b7' : 'none')}
  border-radius: 4px;

  transition: opacity 0.7s;
`;

const HackInfo = styled('div')`
  display: flex;
  height: 400px;
  width: 100%;
  border-radius: 4px;

  div {
    height: 100%;
    width: 50%;
    padding: 25px;

    img {
      object-fit: contain;
      height: 100%;
      width: 100%;
    }
  }
`;

const Table = styled('table')`
  border-collapse: collapse;
  border-radius: 1em;
  overflow: hidden;
  width: 100%;

  thead {
    background-color: #ffd75f;
  }

  tr {
    position: relative;
    height: 60px;

    :nth-child(even) {
      background-color: #fff1c7;
    }

    td,
    th {
      text-align: center;

      img {
        width: 30px;
        height: 30px;
      }

      a {
        padding: 10px;
        font-weight: 700;
        color: white;
        background-color: #e6b92f;
        border-radius: 4px;
      }
    }
  }
`;

const PreviousHackItem = (props) => {
  return PriorHacksData.map((hack, i) => {
    return (
      <HackCard selected={i === props.selectedHack} key={hack.name + i}>
        <HackInfo>
          <div>
            <h2>{hack.name}</h2>
            <p>{hack.description}</p>
          </div>
          <div>
            <img src={UNAL2019} alt='unal_2019' />
          </div>
        </HackInfo>
        <h2>Ranks:</h2>
        <Table>
          <thead>
            <tr>
              <th />
              <th>Hacker Name</th>
              <th>Place</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {hack.ranks.map((winner) => (
              <tr key={winner.name + winner.contact}>
                <td>
                  <img src={COLFlag} alt='col-flag' />
                </td>
                <td>{winner.name}</td>
                <td>{winner.place}</td>
                <td>{winner.contact}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </HackCard>
    );
  });
};

export default PreviousHackItem;
