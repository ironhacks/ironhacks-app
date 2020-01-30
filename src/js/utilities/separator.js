// IronHacks Platform
// seratator.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co
// Styled components
import styled from 'styled-components';
// Custom Constants
import * as Constants from '../../constants.js';

const Separator = styled('div')`
  width: 100%;
  height: 1px;
  margin-top: 15px;
  margin-bottom: 10px;
  background-color: ${(props) =>
    props.primary ? Constants.mainBgColor : 'lightgray'
};
`;

export default Separator;
