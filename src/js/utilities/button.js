// IronHacks Platform
// buttons.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co
//Styled components
import styled from 'styled-components';
//Custom Constants
import * as Constants from '../../constants.js';

const Button = styled('button')`
  width: ${(props) => props.width ? props.width : '100%'};
  height: ${(props) => props.height ? props.height : '30px'};
  margin: ${(props) => props.margin ? props.margin : '0'};
  background-color: ${(props) => props.primary ? Constants.mainBgColor : 'lightgray'};
  border-radius: ${Constants.universalBorderRadius};
  border: none;
`;

export default Button;