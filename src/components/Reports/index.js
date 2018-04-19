import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { subscribe, unsubscribe } from '../actions/auth'





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

class Reports extends Component {
  constructor() {
    super();
  }



<div className="main-content container">
            <div className="row">
              <Switch>
                <PrivateRoute authed={this.props.authed} path='/reports/scheduletodate' component={Tickets} />
                <PrivateRoute authed={this.props.authed} path='/reports/projecthealth' component={Dispatch} />
                <Route render={() => <h2>No Match</h2>} />
              </Switch>
            </div>
          </div>