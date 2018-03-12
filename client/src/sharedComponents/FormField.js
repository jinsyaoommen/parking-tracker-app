import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import ErrorMessageStyle from './ErrorMessageStyle';
import { Label } from './Label';

export const FormFieldStyle = styled.div`
  margin-bottom: 30px;
  line-height: 1;
`;

export const FormField = props => (
  <FormFieldStyle {...props}>
    {
      props.hasLabel
        ? <Label id={props.id} isRequired={props.isRequired} {...props}>{props.caption}</Label>
        : null
    }
    {props.children}
    {
      (props.touched && props.error) && <ErrorMessageStyle>{props.error}</ErrorMessageStyle>
    }
  </FormFieldStyle>
);

const formFieldProps = {
  caption: PropTypes.string.isRequired,
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  hasLabel: PropTypes.bool,
  hasDropdown: PropTypes.bool,
  isRequired: PropTypes.bool,
  touched: PropTypes.bool,
  error: PropTypes.string
};

const formFieldDefaultProps = {
  children: null,
  hasLabel: true,
  hasDropdown: false,
  isRequired: false,
  node: null,
  error: '',
  touched: false
};

FormField.propTypes = formFieldProps;
FormField.defaultProps = formFieldDefaultProps;
