import styled from 'styled-components';
import { colors } from './Theme';

export const Section = styled.section`
  padding: 30px 0;
  border-bottom: 1px solid ${colors.osloGray.light};

  &:last-of-type {
    border: none;
  }
`;
