import PropTypes from 'prop-types';
import * as R from 'ramda';
import React from 'react';
import styled from 'styled-components';

import { colors, semanticColors } from './Theme';
import loading from '../img/loading.png';

export const BaseButton = styled.button`
  background: none;
  border: 1px solid transparent;
  border-radius: 0;
  color: inherit;
  cursor: pointer;
  font: inherit;
  line-height: normal;
  overflow: visible;
  padding: 0;
  vertical-align:middle;
  &:hover {
    color: ${semanticColors.info.hover}
  }
`;

export const ContextButton = BaseButton.extend`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 200px;
  height: 50px;
  border-radius: 3px;
  border: none;
  color: ${colors.whiteSmoke.light};
  background-color: ${colors.navy.light};
  margin-bottom: 5px;
  position: relative;
  
  &:hover {
    background-color: ${colors.riverbed.dark};
    color: ${colors.whiteSmoke.light};
  }
  div:first-of-type {
    padding-top: 5px;
    padding-left: 20px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 2px;
    color: ${colors.whiteSmoke.light};
  }
  div:last-of-type {
    color: ${colors.white.light};
    padding-left: 20px;
    font-size: 16px;
    font-weight: 600;
    max-width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
    &:after {
      font-family: 'Ionicons';
      content: '\\f35f';
      left: 176px;
      position: absolute;
    }
  }
`;

export const AddRowButton = BaseButton.extend`
  color: ${semanticColors.primary.standard};
  line-height: 20px;
  display: flex;
  &:hover {
    color: ${semanticColors.primary.hover}
  }
  &:after {
    padding-left: 5px;
    font-family: 'Ionicons';
    content: '\f216';
    font-size: 20px;
  }
`;

export const CloseModalButton = BaseButton.extend`
  color: ${semanticColors.default.standard};
  &:hover {
    color: ${semanticColors.default.hover}
  }
  &:after {
    padding-left: 5px;
    font-family: 'Ionicons';
    content: '\f12a';
    font-size: 20px;
  }
`;

const ButtonWrapper = BaseButton.extend`
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? '0.65 !important' : '1 !important')};
  margin-left: 3px;
  font-weight: 600;
  color: ${props => (
  props.variant === 'link' ? semanticColors.info.standard : colors.white.light
)};
  text-decoration: none;
  border: none;
  border-radius: 3px;
  padding: 9px 16px;
  background-color: ${props => (
  props.variant === 'link' ? colors.white.light : semanticColors[props.variant].standard
)};
  outline: 0;
  &:hover {
     background-color: ${props => (
  props.variant === 'link'
    ? colors.white.light
    : semanticColors[props.variant].hover
)};
     color: ${props => (
  props.variant === 'link'
    ? semanticColors.info.hover
    : colors.white.light
)};
  }
  &:active {
    background-color: ${props => (
  props.variant === 'link'
    ? colors.white.light
    : semanticColors[props.variant].active
)};
    color: ${props => (
  props.variant === 'link'
    ? semanticColors.info.active
    : colors.white.light
)};
  }
`;

export const ButtonGroup = styled.div`
  text-align: right;
  margin-top: 30px;
  display: flex;  
  align-items: center;
  justify-content: flex-end;
`;

export const ButtonGroupNoMargin = ButtonGroup.extend`
  margin-top: 0;
  width: inherit;
`;

export const LoadingButton = ({
  isLoading,
  loadingText,
  className = "",
  disabled = false,
  ...props
}) =>
  <Button
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading && <img src={loading} height="10px" alt="spinner"/>}
    {!isLoading ? props.children : loadingText}
  </Button>;

const Button = ({ variant, onClick, isDisabled, isHidden, type, ...props }) =>
  (isHidden
      ? null
      : (
        <ButtonWrapper
          onClick={onClick}
          disabled={isDisabled}
          variant={variant}
          type={type}
        >
          {props.children}
        </ButtonWrapper>
      )
  );

Button.propTypes = {
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'success', 'danger', 'warning', 'link']),
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  isHidden: PropTypes.bool,
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  variant: 'default',
  type: 'button',
  onClick: R.identity,
  isDisabled: false,
  isHidden: false,
};

export default Button;
