import React, { Component } from "react";


class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="jumbotron m-3">
          <h1 className="display-4">Welcome!</h1>
          <p className="lead">
          Welcome to the annotation System
           This system tries to detecting discriminatory
           risk through data annotation based on Bayesian inferences
          </p>
          <hr className="my-4" />
        </div>
      </div>
    );
  }
}

export default WelcomeScreen;
