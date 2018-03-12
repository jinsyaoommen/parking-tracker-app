import React from 'react';
import styled from 'styled-components';
import { Route } from "react-router-dom";

import { colors } from './Theme';
import { StyledNavLink } from './Anchor';

export const LogoImage = styled.img`
  height: 30px;
  margin: 20px;
`;

export const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 1;
  background-color: ${colors.whiteSmoke.light};
  height: 60px;
  align-items: center;
`;

export const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const MenuItem = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  span {
    top: -5px;
    position: relative;
  }
  a {
    padding: 15px;
  }
  :last-child {
    padding-right: 15px;
  }
`;

export const MenuItemImage = styled.img`
  height: 25px;
  padding-right: 5px;
`;

export const MenuLink = props =>
  <Route
    path={props.href}
    exact
    children={({ match, history }) =>
      <StyledNavLink
        onClick={e => history.push(e.currentTarget.getAttribute("href"))}
        {...props}
        activeStyle={{
          fontWeight: 'bold',
          color: `${colors.valencia.medium}`
        }}
      >
        {props.children}
      </StyledNavLink>}
  />;

