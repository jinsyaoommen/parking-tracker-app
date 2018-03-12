import styled from 'styled-components';
import { colors } from './Theme';
import { NavLink } from 'react-router-dom';

export const Anchor = styled.a`
  text-decoration: none;
  color: ${props => props.active ? colors.cascadeBlue.dark : colors.riverbed.dark};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${props => props.active ? colors.cascadeBlue.dark : colors.riverbed.dark};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`;
