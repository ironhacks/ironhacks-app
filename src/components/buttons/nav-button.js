import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavButton = styled(Link)`
  color: ${(props) => props.theme.textColor};
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  font-weight: 800;
  font-size: 15px;
  display: inline-block;
  transition: color 0.3s, background-color 0.3s;

  &:hover {
    text-decoration: none;
    color: ${(props) => props.theme.hoverTextColor};
  }
`;

export { NavButton }
