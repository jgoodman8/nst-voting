import React from "react";
import './team.css'
import {browserHistory} from "react-router";

export default class Team extends React.Component {

  constructor() {
    super();
    this.goToTeam = this.goToTeam.bind(this);
  }

  goToTeam() {
    const {team} = this.props;
    browserHistory.push(`/team/${team.id}`);
  }

  render() {
    const {team} = this.props;

    return (
      <div className="Team" onClick={this.goToTeam}>
        <img src={team.img}/>
      </div>
    )
  }
}