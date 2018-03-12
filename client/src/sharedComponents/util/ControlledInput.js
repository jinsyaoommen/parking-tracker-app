import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Component } from 'react';

export default class ControlledInput extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChangeHandler: PropTypes.func,
    onClickHandler: PropTypes.func
  };

  static defaultProps = {
    value: '',
    onChangeHandler: R.identity,
    onClickHandler: R.identity
  };

  state = { value: this.props.value };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleOnChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.onChangeHandler(event.target.value);
  };

  handleOnClick = () => {
    this.props.onClickHandler();
  };

  render() {
    return this.props.render(this.state, this.handleOnChange, this.handleOnClick);
  }
}
