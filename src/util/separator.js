import styled from 'styled-components';

import {Theme} from '../theme';
const colors = Theme.COLORS;


const Separator = styled('div')`
  width: 100%;
  height: 1px;
  margin-top: 15px;
  margin-bottom: 10px;
  background-color: ${(props) =>
    props.primary ? colors.mainBgColor : 'lightgray'
};
`;

export default Separator;
