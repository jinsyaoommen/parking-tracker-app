import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

import { PageBodyContainer, PageContainer } from '../sharedComponents/Container';
import { Section } from '../sharedComponents/Section';
import { TextInputFormField } from '../sharedComponents/TextField';
import { LoadingButton } from '../sharedComponents/Button';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };
  }

  validateSignupForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = (id, value) => {
    this.setState({ [id]: value });
  };

  handleSignupSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      });
      this.setState({
        newUser
      });
    } catch (e) {
      console.log(e)
    }

    this.setState({ isLoading: false });
  };

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);

      this.props.userHasAuthenticated(true);
      this.props.history.push("/");
    } catch (e) {
      console.log(e);
      this.setState({ isLoading: false });
    }
  };

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <TextInputFormField
          id="confirmationCode"
          name="confirmationCode"
          caption="confirmation code"
          placeholder="Please enter confirmation code..."
          type="text"
          onChangeHandler={(value) => this.handleChange('confirmationCode', value)}
          isRequired
        />
        <LoadingButton
          variant="secondary"
          isDisabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          loadingText="Verifying…"
        >
          Verify
        </LoadingButton>
      </form>
    );
  }

  renderSignupForm() {
    return (
      <form onSubmit={this.handleSignupSubmit}>
        <TextInputFormField
          id="email"
          name="email"
          caption="email"
          placeholder="Please enter email..."
          type="email"
          onChangeHandler={(value) => this.handleChange('email', value)}
          isRequired
        />
        <TextInputFormField
          id="password"
          name="password"
          caption="password"
          placeholder="Please enter password..."
          type="password"
          onChangeHandler={(value) => this.handleChange('password', value)}
          isRequired
        />
        <TextInputFormField
          id="confirmPassword"
          name="confirmPassword"
          caption="confirm password"
          placeholder="Please confirm password..."
          type="password"
          onChangeHandler={(value) => this.handleChange('confirmPassword', value)}
          isRequired
        />
        {(this.state.password !== this.state.confirmPassword) ? <p>Passwords don't match</p> : null}
        <LoadingButton
          variant="secondary"
          isDisabled={!this.validateSignupForm()}
          type="submit"
          isLoading={this.state.isLoading}
          loadingText="Signing up…"
        >
          Signup
        </LoadingButton>
      </form>
    )
  }

  render() {
    return (
      <PageBodyContainer>
        <PageContainer>
          <Section>
            <h3>Sign up</h3>
            {this.state.newUser === null ? this.renderSignupForm() : this.renderConfirmationForm()}
          </Section>
        </PageContainer>
      </PageBodyContainer>
    );
  }
}
