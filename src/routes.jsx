import React from "react";
import {browserHistory, Route, Router} from 'react-router';
import Scanner from "./components/scanner/scanner";
import Home from "./components/home/home";
import App from "./App";

export default class Routes extends React.Component {
  render() {
    return (
      <Router history={browserHistory} className="root">
        <Route path="/" component={App}>
          <Route path="home" component={Home}/>
          <Route path="scan" component={Scanner}/>
        </Route>
      </Router>
    );
  }
}