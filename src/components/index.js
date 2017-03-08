import 'bootstrap/dist/css/bootstrap.css';
import Home from './Home';
import React, { Component } from 'react';
import Tickets from './protected/Tickets';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom';
import { ActionTypes } from '../config/constants';
import { connect } from 'react-redux';
import { firebaseAuth } from '../config/constants';
import { login, logout } from '../actions/auth'

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
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.props.dispatch({ type: ActionTypes.SIGN_IN });
      } else {
        this.props.dispatch({ type: ActionTypes.LOADED });
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.props.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">UnwiseConnect</Link>
              </div>
              <ul className="nav navbar-nav pull-right">
                <li>
                  <Link to="/tickets" className="navbar-brand">Tickets</Link>
                </li>
                <li>
                  {this.props.authed ? (
                    <button
                      onClick={() => this.props.dispatch(logout())}
                      className="navbar-brand btn btn-link"
                    >
                      Logout
                    </button>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => this.props.dispatch(login())}
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
                <PublicRoute path='/' authed={this.props.authed} exact component={Home} />
                <PrivateRoute authed={this.props.authed} path='/tickets' component={Tickets} />
                <Route render={() => <h3>No Match</h3>} />
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
  error: state.app.error,
  loading: state.app.loading,
});

export default connect(mapStateToProps)(App);
