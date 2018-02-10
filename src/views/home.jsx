import React from "react";
import TopBar from "../components/top-bar/top-bar";
import TeamList from "../components/teams/team-list";
//
// const styles = {
//   root: {
//     width: '100%',
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20,
//   },
// };

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <TopBar text={'NST Voting'}/>
        <TeamList/>
      </div>
    );
  }
}