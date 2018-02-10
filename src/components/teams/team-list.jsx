import React from "react";
import Team from "./team";
import './team-list.css'

const DEFAULT_IMG_SRC = "http://104.199.70.204/wp-content/uploads/2015/10/divina-seguros-joventut.jpg";


export default class TeamList extends React.Component {

  renderTeams() {
    const teams = [DEFAULT_IMG_SRC, "http://104.199.70.204/wp-content/uploads/2015/10/baskonia-vitoria-gasteiz.png", DEFAULT_IMG_SRC, DEFAULT_IMG_SRC, DEFAULT_IMG_SRC];
    const teamComponents = [];

    teams.forEach((team) => {
      teamComponents.push(<Team img={team}/>)
    });

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