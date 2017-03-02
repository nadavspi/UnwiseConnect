import React, { Component } from 'react'
import { login } from '../helpers/auth'

export default class Login extends Component {
  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1> Login </h1>
        <button type="button" onClick={() => login()}>Login</button>
      </div>
    )
  }
}
