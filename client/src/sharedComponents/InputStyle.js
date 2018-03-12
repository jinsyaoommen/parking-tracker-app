import styled from 'styled-components';
import * as R from 'ramda';
import { colors } from './Theme';

/*
Refer to https://developer.mozilla.org/en-US/docs/Web/CSS/::-ms-clear for details on the
use of the -ms-clear selector below.

See https://stackoverflow.com/questions/20473413/remove-ie11s-clear-field-x-button-on-windows-8
for additional details on why the specific style setup below was used.
*/
export const TextFieldStyle = styled.input`
  height: 25px;
  padding: 10px 15px;
  cursor: ${props => ((props.isDisabled) ? 'not-allowed' : 'default')};
  color: ${colors.black.dark};
  border: 
    ${props => (R.isEmpty(props.error) ? '1px' : '2px')} 
    solid 
    ${props => (R.isEmpty(props.error) ? colors.osloGray.light : colors.valencia.light)};
  width: 100%;
  border-radius: 3px;
  line-height: 1;
  font-size: 16px;

  &::-ms-clear {
    display: none;
    width: 0;
    height: 0;     
  }

  &::placeholder {
    color: ${colors.osloGray.light};
    font-weight: 300;
  }
  
  &:focus {
    border: 
      ${props => (R.isEmpty(props.error) ? '1px' : '2px')} 
      solid 
      ${props => (R.isEmpty(props.error) ? colors.cascadeBlue.light : colors.valencia.light)};
    outline: 0;
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

export const SelectFieldIconWrapper = styled.div`
  position: relative;
  &:before {
    position: absolute;
    font-family: 'Ionicons';
    top: 15px;
    right: 15px;
    content: "\\f35f";
  }
`;
