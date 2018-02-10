import React from "react";
import { abiArray } from '../../abi';
import './profile.css';
import RadarAnalytic from "./radar-analtic";

const Web3 = require('web3');

const contractAddress = "0xEa5063881Be9b85A6ca7acEe83A8417eFDFFE83c";
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
      this.web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER));
      this.contract = new this.web3.eth.Contract(abiArray, contractAddress);
      this.contract.methods.getReputation(this.props.id).call((error, result) => {
        this.setState({reputation: result});
      });
    }
  }

  componentDidMount() {
    this.fetchReputation();
  }

  render() {

    const player = {
      "position": "B",
      "team": "Montakit Fuenlabrada",
      "height": "1.80 m",
      "birth_date": "18/02/1986",
      "country": "Ocumare del Tuy (Venezuela)",
      "player_name": "Gregory Vargas ",
      "photo": "http://www.acb.com/fotos_cara/jugadores/J53QLACB62.jpg",
      "twitter": " @Gregory8Vargas"
    };

    return (
      <div className="profile">
        <img className="profile-photo" src={player.photo}/>
        <p className="profile-name">{player.player_name}</p>
        <spam className="profile-subtitle">{player.birth_date}</spam>
        <spam className="profile-subtitle">{player.height}</spam>

        <RadarAnalytic/>
      </div>
    )
  }
}