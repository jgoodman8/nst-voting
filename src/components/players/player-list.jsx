import React from "react";
import Player from "./player";
import './player-list.css'

export default class PlayerList extends React.Component {

  renderPayers() {
    const players = [
      {
        "position": "B",
        "team": "Montakit Fuenlabrada",
        "height": "1.80 m",
        "birth_date": "18/02/1986",
        "country": "Ocumare del Tuy (Venezuela)",
        "player_name": "Gregory Vargas ",
        "photo": "http://www.acb.com/fotos_cara/jugadores/J53QLACB62.jpg",
        "twitter": " @Gregory8Vargas"
      },
      {
        "position": "P",
        "team": "Montakit Fuenlabrada",
        "height": "2.06 m",
        "birth_date": "15/08/1991",
        "country": "Zaragoza",
        "player_name": "José María González Calvo",
        "photo": "http://www.acb.com/fotos_cara/jugadores/J764LACB62.jpg",
        "twitter": " @chemagonzalez91"
      },
      {
        "position": "A",
        "team": "Montakit Fuenlabrada",
        "height": "2.07 m",
        "birth_date": "25/06/1995",
        "country": "Valmiera",
        "player_name": "Rolands Smits ",
        "photo": "http://www.acb.com/fotos_cara/jugadores/J862LACB62.jpg",
        "twitter": " @Rolands_Smits"
      },
      {
        "position": "E",
        "team": "Montakit Fuenlabrada",
        "height": "1.91 m",
        "birth_date": "03/10/1989",
        "country": "Nogales",
        "player_name": "Francisco Cruz ",
        "photo": "http://www.acb.com/fotos_cara/jugadores/J516LACB62.jpg",
        "twitter": " @pakocruz9"
      },
      {
        "position": "P",
        "team": "Montakit Fuenlabrada",
        "height": "2.10 m",
        "birth_date": "14/03/1982",
        "country": "Podgorica",
        "player_name": "Blagota Sekulic ",
        "photo": "http://www.acb.com/fotos_cara/jugadores/JBD8LACB62.jpg"
      },
      {
        "position": "E",
        "team": "Montakit Fuenlabrada",
        "height": "1.92 m",
        "birth_date": "26/01/1989",
        "country": "Esplugues de Llobregat",
        "player_name": "Alejandro Llorca Castillo",
        "photo": "http://www.acb.com/fotos_cara/jugadores/JBFVLACB62.jpg",
        "twitter": " @Alexllorca1"
      },
      {
        "position": "B",
        "team": "Montakit Fuenlabrada",
        "height": "1.86 m",
        "birth_date": "20/05/1993",
        "country": "Ljubljana (Eslovenia)",
        "player_name": "Luka Rupnik ",
        "photo": "http://www.acb.com/fotos_cara/jugadores/J52NLACB62.jpg",
        "twitter": " @LukaRupnik5"
      },
      {
        "position": "F",
        "team": "Montakit Fuenlabrada",
        "height": "2.01 m",
        "birth_date": "20/10/1986",
        "country": "Woodlands Hills (California)",
        "player_name": "Ian Joseph O'Leary ",
        "photo": "http://www.acb.com/fotos_cara/jugadores/J258LACB62.jpg",
        "twitter": " @OLearyianj"
      },
      {
        "position": "E",
        "team": "Montakit Fuenlabrada",
        "height": "1.82 m",
        "birth_date": "12/06/1982",
        "country": "Zadar",
        "player_name": "Marko Popovic ",
        "photo": "http://www.acb.com/fotos_cara/jugadores/JB4PLACB62.jpg",
        "twitter": " @markopop006"
      },
    ];
    const playerComponents = [];

    players.forEach((player, i) => playerComponents.push(<Player player={{id: i, ...player}}/>));

    return playerComponents;
  }

  render() {
    return (
      <div className="Player-List">
        {this.renderPayers()}
      </div>
    );
  }
}