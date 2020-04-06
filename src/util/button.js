import styled from 'styled-components';
import { Theme } from '../.../../theme';
const colors = Theme.COLORS;
const units = Theme.UNITS;

const Button = styled('button')`
  width: ${(props) => props.width ? props.width : '100%'};
  height: ${(props) => props.height ? props.height : '30px'};
  margin: ${(props) => props.margin ? props.margin : '0'};
  background-color: ${(props) => props.primary ? colors.mainBgColor : 'lightgray'};
  border-radius: ${units.universalBorderRadius}l;
  border: none;
`;

export default Button;
