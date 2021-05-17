import { Link } from 'react-router-dom';
import { useState } from 'react';
import React, { useEffect } from 'react';


import destruLogo from './img/class/destructeur.jpg';
import sentiLogo from './img/class/sentinelle.jpg';
import arcaLogo from './img/class/arcaniste.jpg';
import oracleLogo from './img/class/oracle.jpg';
import dragonLogo from './img/class/dragoon.jpg';
import commandoLogo from './img/class/commando.jpg';
import ombreLogo from './img/class/ombre.jpg';
import voltiLogo from './img/class/voltigeur.jpg';
import franceLogo from './img/flags/fr.png';
import belgiqueLogo from './img/flags/be.png';
import suisseLogo from './img/flags/suisse.png';
import usaLogo from './img/flags/us.png';
import ukLogo from './img/flags/uk.png';
import canadaLogo from './img/flags/ca.png';
import vietLogo from './img/flags/viet.png';
import allemagneLogo from './img/flags/de.png';
import polskaLogo from'./img/flags/pl.png';
import russiaLogo from './img/flags/ru.png';
import spainLogo from './img/flags/sp.png';
import axios from 'axios';

import './polemos.css';

function Participants(props) {
  const [participant, setParticipant] = useState(null);
  useEffect(() => {
    if (!participant){
      const fetch = async () => {
        const result = await axios.get("https://apipolemos.playdragonica.eu/tournament/participant/" + props.tournamentId);
        console.log(result.data);
        setParticipant(result.data);
      }
      fetch();      
    }
    const interval = setInterval(() => {
      const fetch = async () => {
        const result = await axios.get("https://apipolemos.playdragonica.eu/tournament/participant/" + props.tournamentId);
        console.log(result.data);
        setParticipant(result.data);
      }
      fetch();
    }, 5000);
    return () => clearInterval(interval);
  });


  const result =  participant && participant.map((equipe) => {
    console.log(equipe);
    return([
    <tr>
      <td>{equipe.teamname}</td>
      <td><img className="flag" src={
      equipe.player1Country === 'FR' ? franceLogo:
      equipe.player1Country === 'PL' ? polskaLogo:
      equipe.player1Country === 'BE' ? belgiqueLogo:
      equipe.player1Country === 'CA' ? canadaLogo:
      equipe.player1Country === 'SP' ? spainLogo:
      equipe.player1Country === 'VIET' ? vietLogo:
      equipe.player1Country === 'US' ? usaLogo:
      equipe.player1Country === 'DE' ? allemagneLogo:
      equipe.player1Country === 'RU' ? russiaLogo:
      equipe.player1Country === 'UK' ? ukLogo:
      suisseLogo} alt="flag"></img>
      </td>
      <td><img src=
      {equipe.player1classname === 'Sentinelle' ? sentiLogo:
      equipe.player1classname === 'Ombre' ? ombreLogo:
      equipe.player1classname === 'Commando' ? commandoLogo:
      equipe.player1classname === 'Voltigeur' ? voltiLogo:
      equipe.player1classname === 'Oracle' ? oracleLogo:
      equipe.player1classname === 'Arcaniste' ? arcaLogo:
      equipe.player1classname === 'Destructeur' ? destruLogo:
      dragonLogo} alt="class"></img>
      </td>
      <td>{equipe.player1username}</td>
      <td>{equipe.player1point}</td>
    </tr>,
    equipe.player2Country === null ? null : <tr>
      <td>{equipe.teamname}</td>
      <td><img className="flag" src={
      equipe.player2Country === 'FR' ? franceLogo:
      equipe.player2Country === 'PL' ? polskaLogo:
      equipe.player2Country === 'BE' ? belgiqueLogo:
      equipe.player2Country === 'CA' ? canadaLogo:
      equipe.player2Country === 'SP' ? spainLogo:
      equipe.player2Country === 'VIET' ? vietLogo:
      equipe.player2Country === 'US' ? usaLogo:
      equipe.player2Country === 'DE' ? allemagneLogo:
      equipe.player2Country === 'RU' ? russiaLogo:
      equipe.player2Country === 'UK' ? ukLogo:
      suisseLogo} alt="flag"></img>
      </td>
      <td><img src=
      {equipe.player2classname === 'Sentinelle' ? sentiLogo:
      equipe.player2classname === 'Ombre' ? ombreLogo:
      equipe.player2classname === 'Commando' ? commandoLogo:
      equipe.player2classname === 'Voltigeur' ? voltiLogo:
      equipe.player2classname === 'Oracle' ? oracleLogo:
      equipe.player2classname === 'Arcaniste' ? arcaLogo:
      equipe.player2classname === 'Destructeur' ? destruLogo:
      dragonLogo} alt="class"></img>
      </td>
      <td>{equipe.player2username}</td>
      <td>{equipe.player2point}</td>
    </tr>,
    equipe.player3Country === null ? null : <tr>
    <td>{equipe.teamname}</td>
    <td><img className="flag" src={
    equipe.player3Country === 'FR' ? franceLogo:
    equipe.player3Country === 'PL' ? polskaLogo:
    equipe.player3Country === 'BE' ? belgiqueLogo:
    equipe.player3Country === 'CA' ? canadaLogo:
    equipe.player3Country === 'SP' ? spainLogo:
    equipe.player3Country === 'VIET' ? vietLogo:
    equipe.player3Country === 'US' ? usaLogo:
    equipe.player3Country === 'DE' ? allemagneLogo:
    equipe.player3Country === 'RU' ? russiaLogo:
    equipe.player3Country === 'UK' ? ukLogo:
    suisseLogo} alt="flag"></img>
    </td>
    <td><img src=
    {equipe.player3classname === 'Sentinelle' ? sentiLogo:
    equipe.player3classname === 'Ombre' ? ombreLogo:
    equipe.player3classname === 'Commando' ? commandoLogo:
    equipe.player3classname === 'Voltigeur' ? voltiLogo:
    equipe.player3classname === 'Oracle' ? oracleLogo:
    equipe.player3classname === 'Arcaniste' ? arcaLogo:
    equipe.player3classname === 'Destructeur' ? destruLogo:
    dragonLogo} alt="class"></img>
    </td>
    <td>{equipe.player3username}</td>
    <td>{equipe.player3point}</td>
  </tr>,
    equipe.player4Country === null ? null : <tr>
    <td>{equipe.teamname}</td>
    <td><img className="flag" src={
    equipe.player4Country === 'FR' ? franceLogo:
    equipe.player4Country === 'PL' ? polskaLogo:
    equipe.player4Country === 'BE' ? belgiqueLogo:
    equipe.player4Country === 'CA' ? canadaLogo:
    equipe.player4Country === 'SP' ? spainLogo:
    equipe.player4Country === 'VIET' ? vietLogo:
    equipe.player4Country === 'US' ? usaLogo:
    equipe.player4Country === 'DE' ? allemagneLogo:
    equipe.player4Country === 'RU' ? russiaLogo:
    equipe.player4Country === 'UK' ? ukLogo:
    suisseLogo} alt="flag"></img>
    </td>
    <td><img src=
    {equipe.player4classname === 'Sentinelle' ? sentiLogo:
    equipe.player4classname === 'Ombre' ? ombreLogo:
    equipe.player4classname === 'Commando' ? commandoLogo:
    equipe.player4classname === 'Voltigeur' ? voltiLogo:
    equipe.player4classname === 'Oracle' ? oracleLogo:
    equipe.player4classname === 'Arcaniste' ? arcaLogo:
    equipe.player4classname === 'Destructeur' ? destruLogo:
    dragonLogo} alt="class"></img>
    </td>
    <td>{equipe.player4username}</td>
    <td>{equipe.player4point}</td>
  </tr>,
      equipe.player5Country === null ? null : <tr>
      <td>{equipe.teamname}</td>
      <td><img className="flag" src={
      equipe.player5Country === 'FR' ? franceLogo:
      equipe.player5Country === 'PL' ? polskaLogo:
      equipe.player5Country === 'BE' ? belgiqueLogo:
      equipe.player5Country === 'CA' ? canadaLogo:
      equipe.player5Country === 'SP' ? spainLogo:
      equipe.player5Country === 'VIET' ? vietLogo:
      equipe.player5Country === 'US' ? usaLogo:
      equipe.player5Country === 'DE' ? allemagneLogo:
      equipe.player5Country === 'RU' ? russiaLogo:
      equipe.player5Country === 'UK' ? ukLogo:
      suisseLogo} alt="flag"></img>
      </td>
      <td><img src=
      {equipe.player5classname === 'Sentinelle' ? sentiLogo:
      equipe.player5classname === 'Ombre' ? ombreLogo:
      equipe.player5Classname === 'Commando' ? commandoLogo:
      equipe.player5classname === 'Voltigeur' ? voltiLogo:
      equipe.player5classname === 'Oracle' ? oracleLogo:
      equipe.player5classname === 'Arcaniste' ? arcaLogo:
      equipe.player5classname === 'Destructeur' ? destruLogo:
      dragonLogo} alt="class"></img>
      </td>
      <td>{equipe.player5username}</td>
      <td>{equipe.player5point}</td>
    </tr>,
  
    ])
  });

  return ([
    <section id="Participants">
      <section id="rank">
        <table id="tableRank" cellspacing="0">
          <tr><th>Team Name</th><th>Country</th><th>Class</th><th>Playername</th><th>Polemos Point</th></tr>
          {result}
        </table>
      </section>
    </section>
          ]
  );
}

export default Participants;
