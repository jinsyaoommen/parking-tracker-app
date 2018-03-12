/* eslint-disable react/no-unused-prop-types */
import PropTypes from 'prop-types';
import * as R from 'ramda';
import React from 'react';

import { FormField } from './FormField';
import ControlledInput from './util/ControlledInput';
import { TextFieldStyle } from './InputStyle';

export const UncontrolledTextField = props => (
  <TextFieldStyle disabled={props.isDisabled} {...props} />
);

export const TextField = (props) => {
  const updatedProps = R.omit(['value', 'isDisabled'], props);

  return (
    <ControlledInput
      render={(state, handleOnChange, handleOnClick) => (
        <TextFieldStyle
          value={state.value}
          onChange={handleOnChange}
          onClick={handleOnClick}
          disabled={props.isDisabled}
          error={(props.touched && !R.isEmpty(props.error)) && props.error}
          readOnly={props.readOnly}
          {...updatedProps}
        />
      )}
      {...props}
    />
  );
};

export const TextInputFormField = props => (
  <FormField {...props}>
    <TextField name={props.name} {...props} />
  </FormField>
);

const uncontrolledInputProps = {
  /** Boolean field that indicates if the field should be disabled */
  isDisabled: PropTypes.bool,
  /** Validation message to be displayed on form validation */
  error: PropTypes.string,
  /** ID for the form field */
  id: PropTypes.string.isRequired,
  /** Name for the form field */
  name: PropTypes.string.isRequired,
  /** Placeholder Message */
  placeholder: PropTypes.string.isRequired,
  /** Type of input field. Allowed types: ['text', 'password', 'email', 'number'] */
  type: PropTypes.oneOf(['text', 'password', 'email', 'number']),
  /** Default value to be displayed in the input field */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Indicates if the text field displays a menu list on click */
  hasDropdown: PropTypes.bool,
  readOnly: PropTypes.bool,
};

const uncontrolledInputDefaultProps = {
  isDisabled: false,
  type: 'text',
  value: '',
  hasDropdown: false,
  error: '',
  readOnly: false
};

const controlledInputProps = {
  ...uncontrolledInputProps,
  /** Boolean field that indicates if the field is required */
  isRequired: PropTypes.bool,
  /** Label for input field */
  label: PropTypes.string,
  /** Function that gets called when form input changes */
  onChangeHandler: PropTypes.func,
  /** Function that gets called when form input is clicked */
  onClickHandler: PropTypes.func
};

const controlledInputDefaultProps = {
  ...uncontrolledInputDefaultProps,
  label: '',
  onChangeHandler: R.identity,
  onClickHandler: R.identity,
  isRequired: false
};

UncontrolledTextField.displayName = 'TextField';

UncontrolledTextField.propTypes = uncontrolledInputProps;

UncontrolledTextField.defaultProps = uncontrolledInputDefaultProps;

TextField.displayName = 'TextField';

TextField.propTypes = controlledInputProps;

TextField.defaultProps = controlledInputDefaultProps;

TextInputFormField.propTypes = controlledInputProps;

TextInputFormField.defaultProps = controlledInputDefaultProps;
