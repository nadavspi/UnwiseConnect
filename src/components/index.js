import 'bootstrap/dist/css/bootstrap.css';
import Dispatch from './Dispatch';
import Home from './Home';
import React, { Component } from 'react';
import Settings from './Settings';
import Tickets from './Tickets';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout, subscribe, unsubscribe } from '../actions/auth'

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/tickets' />}
    />
  )
}

class App extends Component {
  componentDidMount () {
    this.props.dispatch(subscribe());
  }
  componentWillUnmount () {
    this.props.dispatch(unsubscribe());
  }
  render() {
    const isAuthed = this.props.authed;
    return this.props.loading === true ? <span className="loading"></span> : (
      <BrowserRouter>
        <div className="page">
          {isAuthed &&
            <nav className="navbar navbar-uc navbar-static-top">
              <div className="container">
                <div className="navbar-header">
                  <Link to="/" className="navbar-brand">UnwiseConnect</Link>
                </div>
                <ul className="nav nav-settings">
                  <li>
                    <Link to="/tickets">Tickets</Link>
                  </li>
                  {this.props.capabilities.dispatch && (
                    <li>
                      <Link to="/dispatch">Dispatch</Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to="/settings"
                      className="btn btn-default btn-sm btn-settings"
                    >
                      <span
                        className="glyphicon glyphicon-cog"
                        aria-hidden="true"></span>
                      <span className="sr-only">Settings</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          }
          <div className="main-content container">
            <div className="row">
              <Switch>
                <PublicRoute path='/' authed={this.props.authed} exact component={Home} />
                <PrivateRoute authed={this.props.authed} path='/tickets' component={Tickets} />
                <PrivateRoute authed={this.props.authed} path='/dispatch' component={Dispatch} />
                <PrivateRoute authed={this.props.authed} path='/settings' component={Settings} />
                <Route render={() => <h2>No Match</h2>} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  authed: state.user.authed,
  capabilities: state.user.capabilities,
  error: state.app.error,
  loading: state.app.loading,
});

export default connect(mapStateToProps)(App);
