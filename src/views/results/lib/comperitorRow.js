import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import FullHeart from '../../../assets/svg/full-heart.svg';
import EmptyHeart from '../../../assets/svg/empty-heart.svg';

const Row = styled('tr')`
  position: relative;
  height: 60px;

  &:nth-child(even) {
    background-color: #fff1c7;
  }

  td,
  th {
    text-align: center;

    a {
      padding: 10px;
      font-weight: 700;
      color: white;
      background-color: #e6b92f;
      border-radius: 4px;
    }
  }
`;

const LikeButton = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  width: 35px;
  height: 35px;
  cursor: pointer;

  &:hover,
  &:active,
  &:focus {
    outline: 0;
    outline: none;
  }

  img {
    object-fit: contain;
    width: 30px;
    height: 30px;
    transition: width 0.3s, height 0.3s;
    outline: none;

    &:hover {
      width: 35px;
      height: 35px;
    }
  }
`;

class ComperitorRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false,
    };
  }

  onLikeClick = () => {
    this.setState((prevState, props) => {
      const isLiked = this.props.onLike(this.props.hackerId);
      return { isLiked };
    });
  };

  render() {
    return (
      <Row>
        <td>{this.props.hacker}</td>
        <td>
          <Link
            to={{
              pathname: `/projectEditor/${this.props.hackName}`,
              query: { hackerId: this.props.hackerId, alias: 'Hacker 1' },
            }}
          >
            LINK
          </Link>
        </td>

        {this.props.score && <td>{this.props.score.toString().slice(0, 5)}</td>}

        <td>
          <LikeButton onClick={this.onLikeClick}>
            <img
              src={this.state.isLiked ? FullHeart : EmptyHeart}
              alt='liked'
            />
          </LikeButton>
        </td>
      </Row>
    );
  }
}

export default ComperitorRow;
