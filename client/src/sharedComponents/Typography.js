import styled from 'styled-components';

import { colors } from './Theme';

export const H1 = styled.h1`
  font: 300 30px/1 'Source Sans Pro', Helvetica, Arial, sans-serif;
  color: ${colors.whiteSmoke.light};
  text-align: center;
  margin: 0 auto;
`;

export const H2 = styled.h2`
  font: bold 34px/1 'Source Sans Pro', Helvetica, Arial, sans-serif;
  color: ${colors.riverbed.light}; 
  margin: 0;
  max-width: 100%;
  
  ~ ul {
    margin-top: 15px;
  }
`;

export const H3 = styled.h3`
  font: normal 20px/1 'Source Sans Pro', Helvetica, Arial, sans-serif;
  color: ${colors.black.light};
  max-width: 100%;
`;

export const H4 = styled.h4`
  font: bold 16px/1 'Source Sans Pro', Helvetica, Arial, sans-serif;
  color: ${colors.riverbed.light};
  margin: 0;
`;

export const H6 = styled.h6`
  font: normal 18px 'Source Sans Pro', Helvetica, Arial, sans-serif;
  color: ${colors.riverbed.light};
  margin: 0;
`;

export const Paragraph = styled.p`
  font: normal 16px/25px 'Source Sans Pro', Helvetica, Arial, sans-serif;
  color: ${colors.black.dark};
  margin: 10px 0 0;
  max-width: 100%;
  white-space: pre-wrap;
  
  ~ h4 {
    margin-top: 30px;
  }
`;

export const Emphasize = styled.span`
  font: normal 20px/1 'Source Sans Pro', Helvetica, Arial, sans-serif;
  color: ${colors.black.light};
`;
