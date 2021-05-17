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

import { useSelector } from 'react-redux';

import './polemos.css';
import axios from 'axios';

function Ranked() {
  const [redirect, setRedirect] = useState(null);
  const userid = useSelector((state) => state.userid);

  const viewButton = (matchid) =>{
    setRedirect(matchid);
  }
  useEffect(() => {
    // const fetch = async () => {
    //   const result = await axios.get("https://apipolemos.playdragonica.eu/ranking");
    //   setRank(result.data);
    // }
    // fetch();
    const interval = setInterval(() => {
      // const fetch = async () => {
      //   const result = await axios.get("https://apipolemos.playdragonica.eu/ranking");
      //   setRank(result.data);
      // }
      // fetch();
    }, 1000);
    return () => clearInterval(interval);
  });

  if(redirect){
    // return <Redirect
    // to={{
    //   pathname: "/Match",
    //   state: { match: matchid }
    // }}
    // ></Redirect>
  }
  if(!userid){
    return ( <Redirect to="/"></Redirect>)
  }
  return ([
    <section id="ranked" className="sectionPage">
      <article className="bannerLogoPage">
        <img className="logoPage" src={logo} alt="logo"></img>      
      </article>
      <section id="infoPersonnage">
        <article>
          <section>
            <h1>Tivise</h1>
            <p>Polemos Point: <strong>500</strong></p>
            <p>Win: <strong>0</strong></p>
            <p>Loss: <strong>0</strong></p>
            <p>Division: <strong>Silver</strong></p>
          </section>
          <img id="logoRanked" src={silverLogo}></img>          
        </article>
        <aside id="backgroundFavClass">
          <img src={voltiClass}></img>
        </aside>
      </section>
      <section id="choiceMode">
        <h2>Choose your mode<i></i></h2>
        <article>
          <aside className="modeDeJeu">
            <h3>Ranked mode: <i>2v2</i></h3>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
              </svg>
              23 players online
            </p>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar2-check" viewBox="0 0 16 16">
                <path d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
                <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"/>
              </svg>
              Monday, Friday - 8pm to 12pm
            </p>
            <img className="modeDeJeuImg" src={mode2} alt="mode 2v2"></img>
            <button className="availableMode">Play</button>
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
              Wednesday - 8pm to 12pm
            </p>
            <img className="modeDeJeuImg offlineMode" src={mode3} alt="mode 3v3"></img>
            <button className="offlineMode">Offline</button>
          </aside>
        </article>
      </section>
    </section>,
    <img className="backgroundPage" src={headerBackground} alt="Background Image"></img>
          ]
  );

}

export default Ranked;
