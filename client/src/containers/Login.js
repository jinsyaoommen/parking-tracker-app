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
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = (id, value) => {
    this.setState({ [id]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true, this.state.email);
      this.props.history.push('/');
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  };

  render () {
    return (
      <PageBodyContainer>
        <PageContainer>
          <Section>
            <h3>Login</h3>
            <form onSubmit={this.handleSubmit}>
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
              <LoadingButton
                variant="secondary"
                isDisabled={!this.validateForm()}
                type="submit"
                isLoading={this.state.isLoading}
                loadingText="Logging in…"
              >
                Login
              </LoadingButton>
            </form>
          </Section>
        </PageContainer>
      </PageBodyContainer>
    );
  }
}
