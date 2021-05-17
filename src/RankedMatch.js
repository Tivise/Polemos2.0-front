import logo from './img/v2/logo.png';
import { useState } from 'react';
import React, { useEffect } from 'react';
import silverLogo from './img/rank/silver.png';
import goldLogo from './img/rank/gold.png';
import bronzeLogo from './img/rank/bronze.png';
import diamondLogo from './img/rank/diamant.png';
import masterLogo from './img/rank/maitre.png';
import { Redirect } from 'react-router-dom';
import headerBackground from './img/v2/addons/ranked/rankedbg.png';
import voltiClass from './img/v2/addons/ranked/voltigeur.png';
import arcaClass from './img/v2/addons/ranked/arcaniste.png';
import ombreClass from './img/v2/addons/ranked/ombre.png';
import dragonClass from './img/v2/addons/ranked/dragon.png';
import oracleClass from './img/v2/addons/ranked/oracle.png';
import destructeurClass from './img/v2/addons/ranked/destructeur.png';
import sentinelleClass from './img/v2/addons/ranked/sentinelle.png';
import commandoClass from './img/v2/addons/ranked/commando.png';
import destruLogo from './img/class/destructeur.jpg';
import sentiLogo from './img/class/sentinelle.jpg';
import dragonLogo from './img/class/dragoon.jpg';
import noClassLogo from './img/class/noclass.jpg';
import commandoLogo from './img/class/commando.jpg';
import arcaLogo from './img/class/arcaniste.jpg';
import oracleLogo from './img/class/oracle.jpg';
import ombreLogo from './img/class/ombre.jpg';
import voltiLogo from './img/class/voltigeur.jpg';
import franceLogo from './img/flags/fr.png';
import belgiqueLogo from './img/flags/be.png';
import suisseLogo from './img/flags/suisse.png';
import usaLogo from './img/flags/us.png';
import ukLogo from './img/flags/uk.png';
import allemagneLogo from './img/flags/de.png';
import canadaLogo from './img/flags/ca.png';
import vietLogo from './img/flags/viet.png';
import polskaLogo from'./img/flags/pl.png';
import spainLogo from './img/flags/sp.png';
import russiaLogo from './img/flags/ru.png';
import mode2 from './img/v2/addons/ranked/2v2.png';
import mode3 from './img/v2/addons/ranked/3v3.png';
import rankedbg from './img/v2/addons/ranked/rankedbg.png';
import labymap from './img/maps/laby.png';
import { useSelector } from 'react-redux';

import './polemos.css';
import axios from 'axios';
import UIfx from 'uifx';
import tickAudio from './sound/ice_verglasridge.mp3';

const tick = new UIfx(
  tickAudio,
  {
    volume: 0.1,
    throttleMs: 50
  }
)

function RankedMatch() {
  const [redirect, setRedirect] = useState(null);
  const [user, setUser] = useState(null);
  const [rankedInfo, setRankedInfo] = useState(null);
  const userid = useSelector((state) => state.userid);
  const username = useSelector((state) => state.username);
  const [printChar, setPrintChar] = useState(0);
  const [selectedChar, setSelectedChar] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [playerVerifiedList, setPlayerVerifiedList] = useState(true);
  const [cptHost, setCptHost] = useState([]);
  const [cptAgainst, setCptAgainst] = useState([]);

  useEffect(() => {
    if (!user){
      const fetch = async () => {
        const result = await axios.get("https://apipolemos.playdragonica.eu/fulluser/name/" + username);
        setUser(result.data);
      }
      fetch();      
    }
    const interval = setInterval(() => {
      const fetch = async () => {
        const result = await axios.get("https://apipolemos.playdragonica.eu/matchmaking/rank/"+userid);
        setRankedInfo(result.data);
      }
      fetch();
    }, 1000);
    return () => clearInterval(interval);
  });

  if(!userid){
    return( <Redirect to="/"></Redirect>)
  } 
  if(rankedInfo && !rankedInfo.enMatch){
    return ( <Redirect to="/Ranked"></Redirect>)
  }
  const changeGroupe = (groupeid) => {
    setGroupId(groupeid);
  }

  if(rankedInfo && rankedInfo.matchGame){
    let choix = 0;
    rankedInfo.host.map( (joueur) => {
      if(joueur.username === username){
        choix = 1;
      }
    })
    if (choix === 0 && !groupId ){
      changeGroupe(rankedInfo.againstid)
    }
    if (choix === 1 && !groupId){
      changeGroupe(rankedInfo.hostid)
    }
  }

  const resultHost =  rankedInfo && rankedInfo.host.map((joueur) => {

    let indice = null;
    let indicem = null;
    if (rankedInfo.matchGame.roomguid){
      for (let i=0; i < rankedInfo.matchGame.killByPlayers.length; i++){
        if( Object.values(rankedInfo.matchGame.killByPlayers[i]).indexOf(joueur.charname) > -1) {
          indice = i;
        }
      }
      for (let i=0; i < rankedInfo.matchGame.deadByPlayers.length; i++){
        if( Object.values(rankedInfo.matchGame.deadByPlayers[i]).indexOf(joueur.charname) > -1) {
          indicem = i;
        }
      }
    }
    return(
      <ul className="joueurMatchleft" key={joueur.userid}>
        <li><img className="flag" src={
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
      suisseLogo} alt="flag"></img><h3>{joueur.username}</h3></li>
      <li>
        <img className="class" src=
      {joueur.classname === '25' ? sentiLogo:
        joueur.classname === '28' ? ombreLogo:
        joueur.classname === '26' ? commandoLogo:
        joueur.classname === '27' ? voltiLogo:
        joueur.classname === '23' ? oracleLogo:
        joueur.classname === '24' ? arcaLogo:
        joueur.classname === '22' ? destruLogo:
        joueur.classname === '21' ? dragonLogo:
        noClassLogo} alt="class"></img>
        <p>{joueur.charname}</p>
        <p className="statisticsMatch">
          {rankedInfo.matchGame.roomguid ? (rankedInfo.matchGame.killByPlayers[indice] ? rankedInfo.matchGame.killByPlayers[indice].total : 0) : null}
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" class="bi bi-slash" viewBox="0 0 16 16">
            <path d="M11.354 4.646a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
          {rankedInfo.matchGame.roomguid ? (rankedInfo.matchGame.deadByPlayers[indicem] ? rankedInfo.matchGame.deadByPlayers[indicem].total : 0) : null}
        </p>
      </li>
      </ul>
    )
  });

  const resultAgainst =  rankedInfo && rankedInfo.against.map((joueur) => {

    let indice = null;
    let indicem = null;
    if (rankedInfo.matchGame.roomguid){
      for (let i=0; i < rankedInfo.matchGame.killByPlayers.length; i++){
        if( Object.values(rankedInfo.matchGame.killByPlayers[i]).indexOf(joueur.charname) > -1) {
          indice = i;
        }
      }
      for (let i=0; i < rankedInfo.matchGame.deadByPlayers.length; i++){
        if( Object.values(rankedInfo.matchGame.deadByPlayers[i]).indexOf(joueur.charname) > -1) {
          indicem = i;
        }
      }
    }


    return(
      <ul className="joueurMatchright" key={joueur.userid}>
        <li><h3>{joueur.username}</h3><img className="flag" src={
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
      suisseLogo} alt="flag"></img></li>
      <li>
      <p className="statisticsMatch">
          {rankedInfo.matchGame.roomguid ? (rankedInfo.matchGame.killByPlayers[indice] ? rankedInfo.matchGame.killByPlayers[indice].total : 0) : null}
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" class="bi bi-slash" viewBox="0 0 16 16">
            <path d="M11.354 4.646a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
          {rankedInfo.matchGame.roomguid ? (rankedInfo.matchGame.deadByPlayers[indicem] ? rankedInfo.matchGame.deadByPlayers[indicem].total : 0) : null}
        </p>
        <p>{joueur.charname}</p>
        <img className="class" src=
      {joueur.classname === '25' ? sentiLogo:
        joueur.classname === '28' ? ombreLogo:
        joueur.classname === '26' ? commandoLogo:
        joueur.classname === '27' ? voltiLogo:
        joueur.classname === '23' ? oracleLogo:
        joueur.classname === '24' ? arcaLogo:
        joueur.classname === '22' ? destruLogo:
        joueur.classname === '21' ? dragonLogo:
        noClassLogo} alt="class"></img>
      </li>
      </ul>
    )
  });

  const battlefieldAgainst =  rankedInfo && rankedInfo.against.map((joueur) => {
    return(
      <article key={"battle" + joueur.userid}>
          {joueur.classname !== null ? [<img className="class" src=
        {joueur.classname === '25' ? sentinelleClass:
          joueur.classname === '28' ? ombreClass:
          joueur.classname === '26' ? commandoClass:
          joueur.classname === '27' ? voltiClass:
          joueur.classname === '23' ? oracleClass:
          joueur.classname === '24' ? arcaClass:
          joueur.classname === '22' ? destructeurClass:
          joueur.classname === '21' ? dragonClass:
          null} alt="class"></img>,
          <p>{joueur.charname}({joueur.username})</p>] : null}
      </article>

    )
  });

  const battlefieldHost =  rankedInfo && rankedInfo.host.map((joueur) => {
    return(
      <article key={"battle" + joueur.userid}>
          {joueur.classname !== null ? [<img className="class" src=
        {joueur.classname === '25' ? sentinelleClass:
          joueur.classname === '28' ? ombreClass:
          joueur.classname === '26' ? commandoClass:
          joueur.classname === '27' ? voltiClass:
          joueur.classname === '23' ? oracleClass:
          joueur.classname === '24' ? arcaClass:
          joueur.classname === '22' ? destructeurClass:
          joueur.classname === '21' ? dragonClass:
          null} alt="class"></img>,
          <p>{joueur.charname}({joueur.username})</p>] : null}
                   
      </article>

    )
  });

  const historyKill =  rankedInfo && rankedInfo.matchGame.roomguid && rankedInfo.matchGame.killHistory && rankedInfo.matchGame.killHistory.map((duel, index) => {
    return(
      <li key={index}>{duel.killer} killed {duel.dead}</li>

    )
  });

  const nextChar = (nbr) => {
    nbr === 0 ?
      printChar === 0 ? setPrintChar(user.characters.length-1) : setPrintChar(printChar-1)
    :
      printChar === user.characters.length-1 ? setPrintChar(0) : setPrintChar(printChar+1)
  }

  const selectChar = (character) => {
    setSelectedChar(character.Name);
    const fetch = async () => {
      await axios.post("https://apipolemos.playdragonica.eu/matchmaking/match/chooseChar/",
      {"userid": userid,
      "groupid": groupId,
      "Class" : character.Class,
      "Name": character.Name
      });
    }
    fetch();
  }
  if(rankedInfo && rankedInfo.matchGame.roomguid){
    if((rankedInfo.host.length + rankedInfo.against.length) !== (rankedInfo.matchGame.playersInRoom.length)){
      if(playerVerifiedList){
        setPlayerVerifiedList(false);
      }
    }
  }

  const voteForHost = () => {
    const fetch = async () => {
      await axios.post("https://apipolemos.playdragonica.eu/matchmaking/match/voteHost/",
      {"voteFor": rankedInfo.vote.hostname,
      "matchid": rankedInfo.matchid,
      });
    }
    fetch();
  }

  const voteForPlayer = () => {
    const fetch = async () => {
      await axios.post("https://apipolemos.playdragonica.eu/matchmaking/match/votePlayer/",
      {"voteFor": rankedInfo.vote.playername,
      "matchid": rankedInfo.matchid,
      });
    }
    fetch();
  }

  if(rankedInfo && rankedInfo.matchGame.roomguid){
    if((rankedInfo.host.length + rankedInfo.against.length) !== (rankedInfo.matchGame.playersInRoom.length)){
      if(playerVerifiedList){
        setPlayerVerifiedList(false);
      }
    }
  }

  if(rankedInfo && rankedInfo.enMatch){
    const hournow = (new Date().getHours() * 60 * 60) + (new Date().getMinutes() * 60) + new Date().getSeconds();
    const hourList = rankedInfo.hour.split(':');
    const hourMatch =  (parseInt(hourList[0]) * 60 * 60) + (parseInt(hourList[1]) * 60) + parseInt(hourList[2]);
    const printedChar = user.characters[printChar];
    return ([
      <section id="rankedmatch">
        <section id="host">
          {resultHost}
        </section>
        <section id="middleMatchinfo">
          {
            rankedInfo.vote ?
            <article id="infoMatch" style={120 - (hournow-hourMatch) < 0 ? {minWidth: '500px'}:null}>
                <p>Time to vote: {180 - (parseInt(hournow-rankedInfo.vote.hour))} seconds left</p>
                <h2>Who did something wrong ?</h2>
                <article>
                  <button onClick={() => voteForHost()}>{rankedInfo.vote.hostname}'s fault</button>
                  <button onClick={() => voteForPlayer()}>{rankedInfo.vote.playername}'s fault</button>
                </article>
              </article>
              :
              <article id="infoMatch" style={120 - (hournow-hourMatch) < 0 ? {minWidth: '500px'}:null}>
              <h2>Match <i>#{rankedInfo.matchid}</i></h2>
              {rankedInfo.host[0].classname === null || rankedInfo.against[0].classname === null?
              (120 - (hournow-hourMatch) < 0 ? <p>Someone don't pick a character...Players will lost points right now.</p> : <p><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.25,2c-5.514,0-10,4.486-10,10s4.486,10,10,10s10-4.486,10-10S17.764,2,12.25,2z M18,13h-6.75V6h2v5H18V13z"></path></svg>
              {120 - (hournow-hourMatch)} seconds left<br></br>Waiting for players...</p>)
              : [
              !rankedInfo.matchGame.roomguid ? [
                <p>{rankedInfo.host[0].username} has to create the Room</p>,
                <ul>
                  <li><strong>Room name:</strong> {rankedInfo.host[0].username.toLowerCase()}{rankedInfo.matchid}</li>
                  <li><strong>Password:</strong> {rankedInfo.passroom} | <strong>Map:</strong> {rankedInfo.map} </li>
                  <li>Round: 5 | Time per round: 7</li>
                  <li><img id="mapMatchimg" src={rankedInfo.map === "Labyrinthe Mystérieux" ? labymap : null}></img></li>
                </ul>,
                rankedInfo.host[0].username === username ? <p>You have {240 - (hournow-hourMatch)} seconds left to create the match. </p> : <p>You have {240 - (hournow-hourMatch)} seconds left to join the match.</p>
              ]
              : null,
              rankedInfo.matchGame.roomguid ? [<ul className="liveMatchInfo">Live Information
                <li>Match found: This match is linked with Polemos Server.</li>
                {rankedInfo.matchGame && rankedInfo.matchGame.roundStarted > rankedInfo.matchGame.roundEnded ?
                  (rankedInfo.matchGame && rankedInfo.matchGame.roundStarted !== 1 ? <li>Round {rankedInfo.matchGame.roundStarted-1} ended.</li> : null)
                  : null}
                <li>Round: {rankedInfo.matchGame && rankedInfo.matchGame.roundStarted}</li>
                <li>Status: {rankedInfo.matchGame && rankedInfo.matchGame.ended ? " ENDED" :  ( !playerVerifiedList ? "ERROR - Someone is missing in the room" :" Players still fight... ")}</li>
              </ul>,
              <ul className="historyKill">
                {historyKill}
              </ul>] : null
            ]}
            </article>
          }
          <article id="choiceClass" style={120 - (hournow-hourMatch) < 0 || (rankedInfo.host[0].classname !== null && rankedInfo.against[0].classname !== null)? {display: 'none'}:null}>
            <h3>Choose your character<i>...</i></h3>
            {user ?
            [
              <aside>
              <button onClick={() => nextChar(0)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                </svg>
              </button>
              <p id="characterChooseMain">{printedChar.Name}</p>
              <img className={selectedChar === printedChar.Name ? "selectedChar":"noSelectedChar"}src={printedChar.Class === 25 ? sentinelleClass:
              printedChar.Class === 28 ? ombreClass:
              printedChar.Class === 26 ? commandoClass:
              printedChar.Class === 27 ? voltiClass:
              printedChar.Class === 23 ? oracleClass:
              printedChar.Class === 24 ? arcaClass:
              printedChar.Class === 22 ? destructeurClass:
              dragonClass} alt="choice"></img>
              <button onClick={() => nextChar(1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                </svg>
              </button>
            </aside>,
            <button id="selectClassMatch" onClick={() => selectChar(printedChar)}>Select</button>
            ]
            :
            <p>Loading characters...</p>
          
          }
          </article>
        </section>
        <section id="against">
          {resultAgainst}
        </section>
        <section id="battlefield">
          <section id="hostfield">
            <section>
              {battlefieldHost}
            </section>
          </section>
          <section id="againstfield">
            <section>
              {battlefieldAgainst}
            </section>
          </section>
      </section>
      </section>,
      <img id="rankedbg" className="backgroundPage" src={headerBackground} alt="Background Image"></img>


    ])
  }
  return <p>Chargement...</p>
}

export default RankedMatch;
