import React from "react";
import './team.css'

export default class Team extends React.Component {
  render() {
    const {img} = this.props;

    return (
      <div className="Team">
        <img src={img}/>
      </div>
    )
  }
}