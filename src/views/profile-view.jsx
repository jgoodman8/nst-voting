import React from "react";
import TopBar from "../components/top-bar/top-bar";
import AnalyticProfile from "../components/profile/analytic-profile";

export default class ProfileView extends React.Component {
  render() {
    return (
      <div>
        <TopBar text={'NST Voting'}/>
        <AnalyticProfile id={this.props.params.id}/>
      </div>
    )
  }
}