import React, { Component } from 'react'
import { connect } from 'react-redux';

class Home extends Component {
  render () {
    return (
      <div>
        {this.props.error && (
          <div className="alert alert-danger" role="alert">
            {this.props.error.message}
          </div>
        )}
        <h1>UnwiseConnect</h1>
        <p>Hi.</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.error,
  };
};

export default connect(mapStateToProps)(Home);
