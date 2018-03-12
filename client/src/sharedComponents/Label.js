import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from './Theme';

export const LabelStyle = styled.label`
  margin-bottom: 8px;
  color: ${colors.black.light};
  font-weight: 700;
  font-size: 16px;
  display: inline-block;
  line-height: 1;
`;

export const Label = props => (
  <LabelStyle for={props.id}>
    {props.children}{props.isRequired ? <span>&#42;</span> : null}
  </LabelStyle>
);

Label.propTypes = {
  /** ID for the form field */
  id: PropTypes.string.isRequired,
  /** Boolean field that indicates if the field is required */
  isRequired: PropTypes.bool,
  /** Label for input field */
  children: PropTypes.node
};

Label.defaultProps = {
  children: '',
  isRequired: false
};
