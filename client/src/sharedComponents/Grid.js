import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
`;

export const Col = styled.div`
  flex: ${props => props.width};
  margin-bottom: 15px;
`;
