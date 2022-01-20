import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.js'
class App extends React.Component {
 render() {
    return  <div> <Header/><h1>React App!</h1></div>;

  }
}


ReactDOM.render(<App />, document.getElementById('app'));
