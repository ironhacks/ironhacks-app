import styled from 'styled-components';

const HackNavContainerDiv = styled('nav')`
  display: flex;
  align-items: center;
  font-size: 14px;

  button {
    display: none;
  }

  @media screen and (max-width: 640px) {
    position: absolute;
    flex-direction: column;
    align-items: start;
    width: 200px;
    top: 10px;
    left: 15px;

    .links-container {
      display: ${(props) => props.display};
      flex-direction: column;
      align-items: start;
      border-radius: 5px;
      background-color: #f9f9f9;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
    }

    a {
      text-align: left;
      font-weight: 600;
      width: 100%;

      &:hover {
        color: black;
        background-color: lightgray;
      }

      &:last-child {
        border-bottom: none;
      }
    }

    span {
      display: none;
    }

    button {
      display: block;
      width: 30px;
      height: 30px;
      padding: 0;
      border: none;
      background-color: transparent;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: lightgray;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export { HackNavContainerDiv }
