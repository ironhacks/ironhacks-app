import React from 'react';
import { Link }from 'react-router-dom';
//Styled components
import styled from 'styled-components';
import HomeIcon from '../../img/home-icon.svg'

const Container = styled('div')`
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
  background-color: white;
  border-bottom: solid 1px #F2F2F2;
  color: #999999;
  font-weight: 600;

  a {
    text-decoration: none;
    color: black;
  }

  img {
    height: 20px;
    margin-right: 5px;
  }

  i {
    margin: 0px 7px 0 5px;

    border: solid #999999;
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 3px;

    &.right {
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    }
  }

  span {
    &.vertical-separator {
      margin: 0 5px;
    }

    &.current {
      font-weight: 500;
    }
  }
`;

const sections = {
  newThread: "New Thread",
}

const sectionsEndPoints = {
  newThread: "newThread",
}

class BreadCrumbs extends React.Component {

  returnToDetails = (event) => {
    event.preventDefault();
    this.props.returnToDetails();
  }

  render() {
    return(
      <Container >
        <img src={HomeIcon} alt="homeicon"/>
        <Link to={'/forum'}>Home</Link>
        {this.props.sections.map((section) => {
          return (
            <React.Fragment>
              <i className="right"/>
              <Link to={sectionsEndPoints[section]}>{sections[sections]}</Link>
            </React.Fragment>
          ) 
        })}
        <i className="right"/>
        <span className='current'>{sections[this.props.current]}</span>
      </Container>
    )
  }
}

export default BreadCrumbs;