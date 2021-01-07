import 'bootstrap/dist/css/bootstrap.css';
import Dispatch from './Dispatch';
import Home from './Home';
import React, { Component } from 'react';
import Settings from './Settings';
import Tickets from './Tickets';
import Timesheets from './Timesheets';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { subscribe, unsubscribe } from '../actions/auth';
import { darkModeIcon } from '../helpers/svgs';
import { setTheme } from '../actions/user';
import classnames from 'classnames';

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
  componentDidMount = () => {
    this.props.dispatch(subscribe());
  }

  componentWillUnmount = () => {
    this.props.dispatch(unsubscribe());
  }

  toggleTheme = () => {
    const theme = this.props.theme == 'dark' ? 'light' : 'dark';
    this.props.dispatch(setTheme(theme));

    try {
      localStorage.setItem('theme', theme);
    } catch(e) {
      console.log('There was an issue accessing localStorage');
    }
  }

  render() {
    const darkModeBtnClasses = classnames({
      'btn btn-default btn-dark-mode': true,
      'dark': this.props.theme === 'dark',
    });
    const isAuthed = this.props.authed;
    return this.props.loading === true ? <span className="loading"></span> : (
      <BrowserRouter>
        <div className={`page ${this.props.theme}`}>
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
                  <li>
                    <Link to="/dispatch">Dispatch</Link>
                  </li>
                  <li>
                    <Link to="/timesheets">Timesheets</Link>
                  </li>
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
                  <li>
                    <button
                      type="button"
                      className={darkModeBtnClasses}
                      aria-label="Toggle Dark Mode"
                      onClick={() => this.toggleTheme()}
                    >
                      {darkModeIcon}
                    </button>
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
                <PrivateRoute authed={this.props.authed} path='/timesheets' component={Timesheets} />
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
  error: state.app.error,
  loading: state.app.loading,
  theme: state.app.theme
});

export default connect(mapStateToProps)(App);
