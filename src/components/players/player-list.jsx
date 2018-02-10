import React from "react";
import Player from "./player";
import './player-list.css'
import { defaultPlayers } from "../../logic/players";
import * as _ from 'lodash';

export default class PlayerList extends React.Component {

  getPlayersFromTeam(cod_team) {
    const players = JSON.parse(JSON.stringify(defaultPlayers));

    const grouped = _.groupBy(players, 'cod_team');

    return grouped[cod_team];
  }

  renderPlayers() {
    const {id} = this.props;
    const playerComponents = [];

    const players = this.getPlayersFromTeam(id);

    players.forEach(player => playerComponents.push(<Player player={player}/>));

    return playerComponents;
  }

  render() {
    return (
      <div className="Player-List">
        {this.renderPlayers()}
      </div>
    );
  }
}