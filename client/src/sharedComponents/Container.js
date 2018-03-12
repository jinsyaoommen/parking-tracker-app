import styled from 'styled-components';
import { colors } from './Theme';

export const AppContainer = styled.main`
  margin-right: auto;
  margin-left: auto;
  padding: 0px 0 30px;
  background: ${colors.whiteSmoke.medium}
`;

export const PageContainer = styled.div`
  margin: 0 auto;
  max-width: 1320px;
  padding: 0 60px 60px;
  background-color: ${colors.white.light};
  //box-shadow: 0 2px 4px 0 ${colors.whiteSmoke.medium}, 0 3px 10px 0 ${colors.whiteSmoke.light};
`;

export const PageBodyContainer = styled.div`
  margin: 0 30px;
`;

export const CardContainer = styled.div`
  background-color: ${colors.whiteSmoke.light};
  box-shadow: 0 4px 8px 0 ${colors.osloGray.light}, 0 6px 20px 0 ${colors.whiteSmoke.light};
`;

export const CardBody = styled.div`
  background-color: ${colors.shakespeare.light};
  color: #F0F0F0;
  padding: 30px 30px 10px 30px;
`;

export const CardFooter = styled.div`
  padding: 15px 15px 0 15px;
  display: flex;
  justify-content: center;
`;
