import React from "react";
import {browserHistory, Route, Router} from 'react-router';
import Scanner from "./components/scanner/scanner";
import Home from "./views/home";
import App from "./App";
import TeamView from "./views/team-view";
import ProfileView from "./views/profile-view";

export default class Routes extends React.Component {
  render() {
    return (
      <Router history={browserHistory} className="root">
        <Route path="/" component={App}>
          <Route path="home" component={Home}/>
          <Route path="scan" component={Scanner}/>
          <Route path="team/:id" component={TeamView}/>
          <Route path="player/:id" component={ProfileView}/>
        </Route>
      </Router>
    );
  }
}