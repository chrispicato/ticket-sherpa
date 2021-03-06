import React, { Component } from 'react';
import { Link } from 'react-router';
import NavContainer from '../containers/NavContainer.js';

// renders logo and maps props

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="appHeader">
          <div className="logo">
            <h1><Link to={'/'}>Ticket Sherpa</Link></h1>
          </div>
          <div className="navComponent">
            <NavContainer />
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}
