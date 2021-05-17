import backgroundIMG from './img/bg/5.png';
import { Redirect } from 'react-router-dom';
import logo from './img/v2/logo.png';
import { useState } from 'react';
import React, { useEffect } from 'react';
import pnjAdvise from './img/v2/addons/89_01.png';
import { useSelector } from 'react-redux';
import headerBackground from './img/v2/background.jpg';
import woodiecoin from './img/v2/addons/woodiecoin.png';
import postscribe from 'postscribe';
import gift from './img/v2/addons/gift.png';

import './polemos.css';
import axios from 'axios';

const Paiement = () => {
  const userid = useSelector((state) => state.userid);
  const username = useSelector((state) => state.username);
  const [joueurName, setJoueur] = useState(null);
  const [user, setUser] = useState(null);
  const [isSuccess, setSuccess] = useState(null);

  useEffect(() => {
    if (!user){
      const fetch = async () => {
        const result = await axios.get("https://apipolemos.playdragonica.eu/fulluser/name/" + username);
        setUser(result.data);
      }
      fetch();      
    }
    const existingScript = document.getElementById('dedipass');
    if(joueurName){
      if (!existingScript) {
        postscribe('#woodiepaiement', '<script id="dedipass" language="javascript" src="//api.dedipass.com/v1/pay.js"></script>')
      }
    }

    // if (!classement){
    //   const fetch = async () => {
    //     const result = await axios.get("https://apipolemos.playdragonica.eu/ranking");
    //     setRank(result.data);
    //   }
    //   fetch();      
    // }
});

  if(!username){
      return <Redirect to="/"></Redirect>
  }
  const result =  user && user.characters.map((joueur) => {
    return(
      <option value={joueur.id}>{joueur.Name}</option>
    )
  });
  
  const envoyer = (form) => {
    form.preventDefault();
    setJoueur(form.target.personame.value);
  }

  return ([
    <section id="ranking" className="sectionPage">
      <article className="bannerLogoPage">
        <img className="logoPage" src={logo} alt="logo"></img>      
      </article>
      <aside className="advisePage">
        <img src={pnjAdvise} alt="pnj"></img>
      </aside>
      {!joueurName ?
          <section id="woodiepaiement">
            <img src={woodiecoin}></img>
            <p id="giftinfo">Which character has to get the Woodie Coins ?</p>
            <form id="chooseCashPerso" onSubmit={envoyer}>
            <select name="personame">
              {result}
            </select>
            <input type="submit" value="Pick"></input>
            </form>
          </section>
          :
          <section id="woodiepaiement">
            <img src={woodiecoin}></img>
            <div data-dedipass="04ddc1733cd0fa098c0605f575497032" data-dedipass-custom={joueurName}></div>
            <ul>
                <li id="giftinfohelp">
                <img src={gift} alt="Gift"></img>
                <p>Take your Woodie Coins in Shop &gt; Gift !</p>
              </li>
              <li><b>Do you have Error 101? </b>  Try it later, problem with DediPass services</li>
            </ul>
    
          </section>
    }


    </section>,
  <img className="backgroundPage" src={headerBackground} alt="Background Image"></img>
          ]
  );

}

export default Paiement;
