import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './header.js';

class App extends React.Component {
 render() {
    return  <div className="AppMainDiv"> <Header/></div>;
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
