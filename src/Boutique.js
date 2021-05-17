import backgroundIMG from './img/bg/5.png';
import logo from './img/v2/logo.png';
import { useState } from 'react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import pnjAdvise from './img/v2/addons/89_01.png';
import headerBackground from './img/v2/background.jpg';
import woodiecoin from './img/v2/addons/woodiecoin.png';
import polemospass from './img/v2/addons/polemospass.png';

import './polemos.css';
import axios from 'axios';

const Boutique = () => {

  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    // if (!classement){
    //   const fetch = async () => {
    //     const result = await axios.get("https://apipolemos.playdragonica.eu/ranking");
    //     setRank(result.data);
    //   }
    //   fetch();      
    // }
  });

  // if(redirect){
  //   return <Redirect
  //   to={{
  //     pathname: "/Teams",
  //     state: { team: redirect }
  //   }}
  //   ></Redirect>
  // }

  // const giveToAll = () => {
  //   const fetch = async () => {
  //     const result = await axios.get("https://apipolemos.playdragonica.eu/donnezNousTous/");
  //     console.log(result);
  //   }
  //   fetch();
  // }

  return ([
    <section id="ranking" className="sectionPage">
      <article className="bannerLogoPage">
        <img className="logoPage" src={logo} alt="logo"></img>      
      </article>
      <aside className="advisePage">
        <img src={pnjAdvise} alt="pnj"></img>
      </aside>
      <section id="shop">
        {/* <article id="ppass">
          <h2>Polemos Pass</h2>
          <img src={polemospass}></img>
          <button onClick={() => giveToAll()}>DONNER</button>
          <Link to="/PaiementVIP">Buy it</Link>
          <ul>Polemos pass contains everything you need to motivate yourself to play:
            <li>Rewards on Dragonica Europe: scrolls, exclusive premiums, cashs, etc.</li>
            <li>Pick custom maps available only for Polemos pass users</li>
            <li>Get some woodie coin that give you a new look for your character !</li>
            <li>Get exclusive things like pets and access.</li>
            <li>Double your cashprize for tournaments<br></br><i>(except the cashprize in €, for rewards less than 2.000 dps)</i></li>
          </ul>
        </article>
        <article id="woodiec">
          <h2>Woodie Coin</h2>
          <img src={woodiecoin}></img>
          <Link to="/Paiement">Buy it</Link>
          <ul>Use woodie coin to the big wheel in the game and get a new look for your character !
          </ul>
        </article> */}
      </section>

    </section>,
  <img className="backgroundPage" src={headerBackground} alt="Background Image"></img>
          ]
  );

}

export default Boutique;
