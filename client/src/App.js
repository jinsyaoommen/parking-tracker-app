import { Auth } from 'aws-amplify';
import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import 'react-virtualized/styles.css';

import logo from "./img/logo_CascadeEnergy.png";
import garage from './img/garage.png';
import signup from './img/signup1.png';
import login from './img/login.png';
import logout from './img/logout.png';
import table from './img/table.png';

import "./App.css";

import { NavBar, LogoImage, Menu, MenuItem, MenuLink, MenuItemImage } from './sharedComponents/Nav';
import { AppContainer } from './sharedComponents/Container';

import Routes from './Routes';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      email: null
    };
  }

  userHasAuthenticated = (authenticated, email) => {
    this.setState({ isAuthenticated: authenticated, email });
  };

  handleLogout = async () => {
    await Auth.signOut();

    this.userHasAuthenticated(false, null);

    this.props.history.push("/login");
  };

  async componentDidMount() {
    try {
      const currentSession = await Auth.currentUserInfo();
      if (currentSession) {
        this.userHasAuthenticated(true);
        this.setState({ email: currentSession.attributes.email })
      }
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      email: this.state.email
    };

    return (
      <Fragment>
        <NavBar>
          <Link to="/"><LogoImage src={logo}/></Link>
          {/*<span>Welcome {this.state.email}</span>*/}
          <Menu>
            {
              this.state.isAuthenticated
              ? [
                  <MenuItem key={1}><MenuLink to="/"><MenuItemImage src={garage} /><span>Checkin</span></MenuLink></MenuItem>,
                  <MenuItem key={2}><MenuLink to="/dailyReport"><MenuItemImage src={table} /><span>Daily Report</span></MenuLink></MenuItem>,
                  <MenuItem key={3} onClick={this.handleLogout}><MenuItemImage src={logout} />Logout</MenuItem>
                ]
              : [
                  <MenuItem key={1}><MenuLink to="/signup"><MenuItemImage src={signup} /><span>Signup</span></MenuLink></MenuItem>,
                  <MenuItem key={2}><MenuLink to="/login"><MenuItemImage src={login} /><span>Login</span></MenuLink></MenuItem>
                ]
            }
          </Menu>
        </NavBar>
        <AppContainer>
          <Routes childProps={childProps} />
        </AppContainer>
      </Fragment>
    );
  }
}

export default withRouter(App);
