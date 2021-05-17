import backgroundIMG from './img/bg/5.png';
import logo from './img/v2/logo.png';
import { useState } from 'react';
import React, { useEffect } from 'react';
import silverLogo from './img/rank/silver.png';
import goldLogo from './img/rank/gold.png';
import bronzeLogo from './img/rank/bronze.png';
import diamondLogo from './img/rank/diamant.png';
import masterLogo from './img/rank/maitre.png';
import { Redirect } from 'react-router-dom';
import headerBackground from './img/v2/background.jpg';
import voltiClass from './img/v2/addons/ranked/voltigeur.png';
import arcaClass from './img/v2/addons/ranked/arcaniste.png';
import ombreClass from './img/v2/addons/ranked/ombre.png';
import dragonClass from './img/v2/addons/ranked/dragon.png';
import oracleClass from './img/v2/addons/ranked/oracle.png';
import destructeurClass from './img/v2/addons/ranked/destructeur.png';
import sentinelleClass from './img/v2/addons/ranked/sentinelle.png';
import commandoClass from './img/v2/addons/ranked/commando.png';

import mode2 from './img/v2/addons/ranked/2v2.png';
import mode3 from './img/v2/addons/ranked/3v3.png';
import rankedbg from './img/v2/addons/ranked/rankedbg.png';

import { useSelector } from 'react-redux';

import './polemos.css';
import axios from 'axios';
import UIfx from 'uifx';
import tickAudio from './sound/confirm.wav';
import tickAudio2 from './sound/notif.wav';

const tick2 = new UIfx(
  tickAudio2,
  {
    volume: 0.1,
    throttleMs: 50
  }
)

function Ranked() {
  const [redirect, setRedirect] = useState(null);
  const [mode, setMode] = useState(null);
  const [rankedInfo, setRankedInfo] = useState(null);
  const userid = useSelector((state) => state.userid);
  const username = useSelector((state) => state.username);
  const [user, setUser] = useState(null);
  const [compteurRanked, setCompteurRanked] = useState(null);
  const selectMode = (modenbr) => {
    setMode(modenbr);
  }

  const joinFill = () => {
    const fetch = async () => {
      await axios.get("https://apipolemos.playdragonica.eu/matchmaking/add/"+userid);
    }
    const fetchoff = async () => {
      await axios.get("https://apipolemos.playdragonica.eu/matchmaking/remove/"+userid);
    }
    
    rankedInfo.enFile ? fetchoff() : fetch() && tick2.play()
  }

  useEffect(() => {
    // Ranked: on doit un status qui dit continuellement: si le joueur est en file d'attente ou s'il est en match
    /*
    S'il est en file: on dn doit changer le bouton pour qu'il puisse en sortir.
    S'il est en match: on doit faire une animation stylée puis rediriger APRES !

    */
    if(!user){
      const fetch = async () => {
        const result = await axios.get("https://apipolemos.playdragonica.eu/fulluser/name/" + username);
        setUser(result.data);
      }
      fetch();
    }
    if(rankedInfo && rankedInfo.enMatch){
      let timer1 = setTimeout(() => setRedirect(true), 5000)
      return () => {
        clearTimeout(timer1)
      }
    }
    const interval = setInterval(() => {
      const fetch = async () => {
        const result = await axios.get("https://apipolemos.playdragonica.eu/matchmaking/rank/"+userid);
        setRankedInfo(result.data);
        const result1 = await axios.get("https://apipolemos.playdragonica.eu/compteurRanked/");
        setCompteurRanked(result1.data);
      }
      fetch();
    }, 1500);
    return () => clearInterval(interval);
  });

  if(redirect){
      return ( <Redirect to="/Match"></Redirect>);
  }
  if(!userid){
    return ( <Redirect to="/"></Redirect>)
  }
  if(user && rankedInfo && rankedInfo.enMatch){
    const tick = new UIfx(
      tickAudio,
      {
        volume: 0.2,
        throttleMs: 50
      }
    )
    tick.play()
    return ([
      <section id="ranked" className="sectionPage">
        <section id="infoPersonnage">
          <article>
            <section>
              <h1>{user.name}</h1>
              <p>Polemos Point: <strong>{user.point}</strong></p>
              <p>Win: <strong>0</strong></p>
              <p>Loss: <strong>0</strong></p>
              <p>Division: <strong>{user.point < 500 ? "Bronze" : user.point < 1000 ? "Silver" : user.point < 2500 ? "Gold" : user.point < 5000 ? "Diamond" : "Master"}</strong></p>
            </section>
            <img id="logoRanked" src={user.point < 500 ? bronzeLogo : user.point < 1000 ? silverLogo : user.point < 2500 ? goldLogo : user.point < 5000 ? diamondLogo : masterLogo}></img>          
          </article>
          <aside id="backgroundFavClass">
            <img src={user.favorite === 'Voltigeur' ? voltiClass : user.favorite === 'Ombre' ? ombreClass : user.favorite === 'Dragon' ? dragonClass : user.favorite === 'Destructeur' ? destructeurClass : user.favorite === 'Arcaniste' ? arcaClass : user.favorite === 'Oracle' ? oracleClass : user.favorite === 'Sentinelle' ? sentinelleClass : commandoClass}></img>
          </aside>
          <section id="descriptionRanked">
            <p>Ranked mode: Play and get auto filled team to play with !</p>
            <ul>Rules
              <li>- They are no rules against spam, your team mate has to help you.</li>
              <li>- Don't blame and insult your teammate.</li>
              <li></li>
            </ul>
            <ul>Do you know ?
              <li>Surrend / Leaving / Losing intentionally make you lose Polemos Points 2 times more than a simple lose</li>
              <li></li>
            </ul>
            <ul>Contact ?
              <li>Is there any problem ? Contact us on Discord in #ranked-polemos</li>
            </ul>
          </section>
        </section>
          <section id="choiceMode">
            <aside className="modeDeJeu">
              <h3>Ranked mode: <i>2v2</i></h3>
              <p id="compteurRanked"><svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                </svg>
              {compteurRanked ? compteurRanked[0] : null} playing - {compteurRanked ? compteurRanked[1]:null} waiting
              </p>
              <img className= "modeDeJeuImg matchFoundImg" src={rankedbg} alt="mode 2v2"></img>
              <button className={"endMode"}>Match found !</button>
            </aside>
          </section>
        </section>,
        <section id="fixedMatchFound">
          <h2>Match found <i>!</i> good luck<i>...</i></h2>
        </section>

    ])
  }
  return ([
    <section id="ranked" className="sectionPage">
      {user ?
            <section id="infoPersonnage">
            <article>
              <section>
                <h1>{user.username}</h1>
                <p>Polemos Point: <strong>{user.point}</strong></p>
                <p>Win: <strong>0</strong></p>
                <p>Loss: <strong>0</strong></p>
                <p>Division: <strong>{user.point < 500 ? "Bronze" : user.point < 1000 ? "Silver" : user.point < 2500 ? "Gold" : user.point < 5000 ? "Diamond" : "Master"}</strong></p>
              </section>
              <img id="logoRanked" src={user.point < 500 ? bronzeLogo : user.point < 1000 ? silverLogo : user.point < 2500 ? goldLogo : user.point < 5000 ? diamondLogo : masterLogo}></img>          
            </article>
            <aside id="backgroundFavClass">
              <img src={user.favorite === 'Voltigeur' ? voltiClass : user.favorite === 'Ombre' ? ombreClass : user.favorite === 'Dragon' ? dragonClass : user.favorite === 'Destructeur' ? destructeurClass : user.favorite === 'Arcaniste' ? arcaClass : user.favorite === 'Oracle' ? oracleClass : user.favorite === 'Sentinelle' ? sentinelleClass : commandoClass}></img>
            </aside>
            <section id="descriptionRanked">
              <p>Ranked mode: Play and get auto filled team to play with !</p>
              <ul>Rules
                <li>- They are no rules against spam, your team mate has to help you.</li>
                <li>- Don't blame and insult your teammate.</li>
                <li></li>
              </ul>
              <ul>Do you know ?
                <li>Surrend / Leaving / Losing intentionally make you lose Polemos Points 2 times more than a simple lose</li>
                <li></li>
              </ul>
              <ul>Contact ?
                <li>Is there any problem ? Contact us on Discord in #ranked-polemos</li>
              </ul>
            </section>
          </section>
    : null
    }
      {rankedInfo && mode ?
          <section id="choiceMode">
            <aside className="modeDeJeu">
              <h3>Ranked mode: <i>1v1</i></h3>
              <p id="compteurRanked"><svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                </svg>
              {compteurRanked ? compteurRanked[0] : null} playing - {compteurRanked ? compteurRanked[1]:null} waiting
              </p>
              <img className= {rankedInfo.enFile ? "modeDeJeuImg rotate": "modeDeJeuImg"} src={mode2} alt="mode 1v1"></img>
              {
                (user.characters.length === 0) || (user.characters.length === 1 && user.characters[0].total < 4) ||
                (user.characters.length === 2 && user.characters[0].total < 4 && user.characters[1].total < 4) ||
                (user.characters.length === 3 && user.characters[0].total < 4 && user.characters[1].total < 4 && user.characters[2].total < 4) ||
                (user.characters.length === 4 && user.characters[0].total < 4 && user.characters[1].total < 4 && user.characters[2].total < 4 && user.characters[3].total < 4) ? <button className="disableMode">You don't have any compatible character</button> : (!rankedInfo.enMatch ? <button className={rankedInfo.enFile ? "cancelMode" : "availableMode"} onClick={() => joinFill()}>{rankedInfo.enFile ? "Cancel" : "Find a match"}{rankedInfo.enFile ? <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
              </svg>: null}</button>
              :
              <button className="finalMode"><svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
              </svg></button>
                )}
              { (user.characters.length === 0) || (user.characters.length === 1 && user.characters[0].total < 4) ||
              (user.characters.length === 2 && user.characters[0].total < 4 && user.characters[1].total < 4) ||
              (user.characters.length === 3 && user.characters[0].total < 4 && user.characters[1].total < 4 && user.characters[2].total < 4) ||
              (user.characters.length === 4 && user.characters[0].total < 4 && user.characters[1].total < 4 && user.characters[2].total < 4 && user.characters[3].total < 4) ? <p><b>No compatible character ?</b> Do more than 3 pvp with one of your character <br></br>and you'll be able to play.</p> : <p className="warning"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
</svg> Be sure you have time to play or you may have some sanctions</p>
}
            </aside>
          </section>
    :
    <section id="choiceMode">
        <h2>Choose your mode<i></i></h2>
        <article>
          <aside className="modeDeJeu">
            <h3>Ranked mode: <i>1v1</i></h3>
            <p id="compteurRanked"><svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                </svg>
              {compteurRanked ? compteurRanked[0] : null} playing - {compteurRanked ? compteurRanked[1]:null} waiting
              </p>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar2-check" viewBox="0 0 16 16">
                <path d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
                <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"/>
              </svg>
              
            </p>
            <img className="modeDeJeuImg" src={mode2} alt="mode 2v2"></img>
            <button className="availableMode" onClick={() => selectMode(2)}>Play</button>
          </aside>
          <aside className="modeDeJeu">
            <h3>Ranked mode: <i>3v3</i></h3>
            <p>        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
          <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
        </svg>0 player online</p>
        <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar2-check" viewBox="0 0 16 16">
                <path d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
                <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"/>
              </svg>
              
            </p>
            <img className="modeDeJeuImg offlineMode" src={mode3} alt="mode 3v3"></img>
            <button className="offlineMode">Offline</button>
          </aside>
        </article>
      </section>

    }
    </section>,
    <img id="rankedbg" className="backgroundPage" src={headerBackground} alt="Background Image"></img>
          ]
  );

}

export default Ranked;
