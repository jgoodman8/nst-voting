import React from "react";
import { abiArray } from '../../abi';
import './profile.css';
import RadarAnalytic from "./radar-analtic";
import LinearChart from "./linar-chart";
import * as _ from 'lodash';
import { defaultPlayers, dictionary, getYears } from "../../logic/players";

const Web3 = require('web3');

const contractAddress = "0x170A4B2Ec65B79cd4956E7c9712713326F97ee05";
const PROVIDER = "https://ropsten.infura.io/ePYYGdA9cUhr3uMfYwSP";

export default class AnalyticProfile extends React.Component {

  constructor() {
    super();

    this.fetchReputation = this.fetchReputation.bind(this);

    this.state = {
      reputation: 0,

    };
  }

  fetchReputation() {
    if (typeof this.web3 !== 'undefined') {
      this.web3 = new Web3(this.web3.currentProvider);
    } else {
      let positive;
      let negative;

      let id = this.props.id;

      this.web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER));
      this.contract = new this.web3.eth.Contract(abiArray, contractAddress);

      this.contract.methods.getPositive(id).call((error, result) => {
        if (!error) {
          positive = result;
          this.contract.methods.getNegative(id).call((error, result) => {
            if (!error) {
              negative = result;

              this.setState({reputation: positive - negative});
            } else {
              console.error('Error fetching negative', error);
            }
          });
        } else {
          console.error('Error fetching positive', error);
        }
      });
    }
  }

  componentDidMount() {
    this.fetchReputation();
  }

  getPlayer(id) {
    const players = JSON.parse(JSON.stringify(defaultPlayers));
    const filtered = _.filter(players, (player) => player.cod_player === id);

    return filtered[0];
  }

  render() {
    const {id} = this.props;
    const player = this.getPlayer(id);

    const age = getYears(player.birth_date);

    return (
      <div className="profile">
        <div class="profile-header">
          <img className="profile-photo" src={player.photo}/>
          <p className="profile-name">{player.player_name}</p>
          <spam style={{textTransform: 'uppercase'}} className="profile-subtitle">
            {dictionary[player.position]}
          </spam>
          {/*<div className="profile-subtitle-wrapper">*/}
          <spam className="profile-subtitle">{`${age} años`}</spam>
          <spam className="profile-subtitle">{player.height}</spam>
          {/*</div>*/}
        </div>
        <div className="charts">
          <RadarAnalytic id={id}/>
          <LinearChart id={id}/>
        </div>
      </div>
    )
  }
}