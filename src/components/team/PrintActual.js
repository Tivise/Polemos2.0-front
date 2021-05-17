import React, { useEffect } from 'react';
import destruLogo from '../../img/class/destructeur.jpg';
import sentiLogo from '../../img/class/sentinelle.jpg';
import dragonLogo from '../../img/class/dragoon.jpg';
import commandoLogo from '../../img/class/commando.jpg';
import arcaLogo from '../../img/class/arcaniste.jpg';
import oracleLogo from '../../img/class/oracle.jpg';
import ombreLogo from '../../img/class/ombre.jpg';
import voltiLogo from '../../img/class/voltigeur.jpg';
import franceLogo from '../../img/flags/fr.png';
import belgiqueLogo from '../../img/flags/be.png';
import suisseLogo from '../../img/flags/suisse.png';
import usaLogo from '../../img/flags/us.png';
import ukLogo from '../../img/flags/uk.png';
import allemagneLogo from '../../img/flags/de.png';
import canadaLogo from '../../img/flags/ca.png';
import vietLogo from '../../img/flags/viet.png';
import polskaLogo from'../../img/flags/pl.png';
import spainLogo from '../../img/flags/sp.png';
import russiaLogo from '../../img/flags/ru.png';
import '../../polemos.css';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function PrintActual(props) {
  const userid = useSelector((state) => state.userid);
  const username = useSelector((state) => state.username);
  const teamSelector = useSelector((state) => state.team);
  const [composition, setComposition] = useState(null);
  const [oldTeamProps, setOldProps] = useState(null);
  const teamProps = teamSelector ? teamSelector : props.teamProps
  const [redirect, setRedirect] = useState(false);

  if(oldTeamProps === null){
    const fetch2 = async () => {
      const result = await axios.get("https://apipolemos.playdragonica.eu/team/userlist/"+teamProps.teamid);
      setComposition(result.data[0]);
    }
    fetch2();
    setOldProps(teamProps);
  }
  useEffect( () => {
    const interval = setInterval(() => {
      const fetch = async () => {
        const result = await axios.get("https://apipolemos.playdragonica.eu/team/userlist/"+teamProps.teamid);
        setComposition(result.data[0]);
      }
      fetch();
    }, 1500);
    if(oldTeamProps){
      if((teamProps.teamid !== oldTeamProps.teamid) || (teamProps.player2 !== oldTeamProps.player2) || (teamProps.player3 !== oldTeamProps.player3) || (teamProps.player4 !== oldTeamProps.player4) || (teamProps.player5 !== oldTeamProps.player5)){
        const fetch2 = async () => {
          const result = await axios.get("https://apipolemos.playdragonica.eu/team/userlist/"+teamProps.teamid);
          setComposition(result.data[0]);
        }
        fetch2();
        setOldProps(teamProps);
      }
    }
    return () => clearInterval(interval);
  });

  const kickPlayer = (player) => {
    const fetch = async () => {
      await axios.post("https://apipolemos.playdragonica.eu/kick/player",
      {"teamid": teamProps.teamid, "username": player.username});
    }
    fetch();
    setRedirect(true);
  }
  const changeMain = (userid, mainclass) => {
    const fetch = async () => {
      await axios.post("https://apipolemos.playdragonica.eu/changeMain/",
      {"teamid": teamProps.teamid, "userid": userid, "main": mainclass});
    }
    fetch();
  }
  const changeSecond = (userid, secondclass) => {
    const fetch = async () => {
      await axios.post("https://apipolemos.playdragonica.eu/changeSecond/",
      {"teamid": teamProps.teamid, "userid": userid, "second": secondclass});
    }
    fetch();
  }
  if(redirect){
    return <Redirect to="/"></Redirect>
  }
  const affichage = composition && composition.members.map((joueur) => {
    if (joueur.username !== null){
      return(
        <tr>
          <td><img className="flag" src={
          joueur.country === 'FR' ? franceLogo:
          joueur.country === 'PL' ? polskaLogo:
          joueur.country === 'BE' ? belgiqueLogo:
          joueur.country === 'CA' ? canadaLogo:
          joueur.country === 'SP' ? spainLogo:
          joueur.country === 'VIET' ? vietLogo:
          joueur.country === 'US' ? usaLogo:
          joueur.country === 'DE' ? allemagneLogo:
          joueur.country === 'UK' ? ukLogo:
          joueur.country === 'RU' ? russiaLogo:
          suisseLogo} alt="flag"></img>
          </td>
          <td>
            <ul id="classChoix">
              <li>
                <img src=
                {joueur.main === 'Sentinelle' ? sentiLogo:
                joueur.main === 'Ombre' ? ombreLogo:
                joueur.main === 'Commando' ? commandoLogo:
                joueur.main === 'Voltigeur' ? voltiLogo:
                joueur.main === 'Oracle' ? oracleLogo:
                joueur.main === 'Arcaniste' ? arcaLogo:
                joueur.main === 'Destructeur' ? destruLogo:
                dragonLogo} alt="class"></img>
                {joueur.username === username ? (teamProps.locked ? null :
                <svg onClick = {() => changeMain(joueur.userid, joueur.main)}xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                  <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                </svg>
                )
                : null
                }
              </li>
              <li>
                <img src=
                {joueur.second === 'Sentinelle' ? sentiLogo:
                joueur.second === 'Ombre' ? ombreLogo:
                joueur.second === 'Commando' ? commandoLogo:
                joueur.second === 'Voltigeur' ? voltiLogo:
                joueur.second === 'Oracle' ? oracleLogo:
                joueur.second === 'Arcaniste' ? arcaLogo:
                joueur.second === 'Destructeur' ? destruLogo:
                dragonLogo} alt="class"></img>
                {joueur.username === username ? (teamProps.locked ? null :
                <svg onClick = {() => changeSecond(joueur.userid, joueur.second)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                  <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                </svg>): null
                }              
              </li>
            </ul>
          </td>
          <td>{joueur.username}</td>
          <td>{joueur.point}</td>
          <td>{username != joueur.username && userid === teamProps.ownerid ? <button className="kickPlayer" onClick={() => kickPlayer(joueur)}>Kick</button> : null}</td>
        </tr>
      )
    }
  });

  return (affichage);
}

export default PrintActual;
