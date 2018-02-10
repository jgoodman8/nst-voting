import React from "react";
import TopBar from "../components/top-bar/top-bar";
import PlayerList from "../components/players/player-list";

export default class TeamView extends React.Component {
  render() {
    return (
      <div>
        <TopBar text={'NST Voting'}/>
        <PlayerList/>
      </div>
    );
  }
}