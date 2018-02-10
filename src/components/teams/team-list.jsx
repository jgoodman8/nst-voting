import React from "react";
import Team from "./team";
import './team-list.css'
import { defaultTeams } from "../../logic/teams";

export default class TeamList extends React.Component {

  renderTeams() {
    const teams = JSON.parse(JSON.stringify(defaultTeams));
    const teamComponents = [];

    teams.forEach(team => teamComponents.push(<Team team={team}/>));

    return teamComponents;
  }

  render() {
    return (
      <div className="Team-List">
        {this.renderTeams()}
      </div>
    );
  }
}