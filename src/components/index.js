import 'bootstrap/dist/css/bootstrap.css';
import Dashboard from './protected/Dashboard';
import Home from './Home';
import React, { Component } from 'react';
import Tickets from './protected/Tickets';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom';
import { firebaseAuth } from '../config/constants';
import { login } from '../helpers/auth'
import { logout } from '../helpers/auth';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          loading: false,
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">UnwiseConnect</Link>
              </div>
              <ul className="nav navbar-nav pull-right">
                <li>
                  <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
                </li>
                <li>
                  <Link to="/tickets" className="navbar-brand">Tickets</Link>
                </li>
                <li>
                  {this.state.authed ? (
                    <button
                      onClick={() => {
                        logout();
                        this.setState({ authed: false });
                      }}
                      className="navbar-brand btn btn-link"
                    >
                      Logout
                    </button>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => login()}
                      className="navbar-brand btn btn-link"
                    >
                      Login
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <div className="row">
              <Switch>
                <Route path='/' exact component={Home} />
                <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
                <PrivateRoute authed={this.state.authed} path='/tickets' component={Tickets} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
