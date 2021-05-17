import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';
import React, { useEffect } from 'react';
import logo from './img/v2/logo.png';
import headerBackground from './img/v2/background.jpg';
import pnjAdvise from './img/v2/addons/111_03.png';
import destruLogo from './img/class/destructeur.jpg';
import sentiLogo from './img/class/sentinelle.jpg';
import arcaLogo from './img/class/arcaniste.jpg';
import oracleLogo from './img/class/oracle.jpg';
import dragonLogo from './img/class/dragoon.jpg';
import commandoLogo from './img/class/commando.jpg';
import ombreLogo from './img/class/ombre.jpg';
import voltiLogo from './img/class/voltigeur.jpg';
import axios from 'axios';
import { useSelector } from 'react-redux';

import './polemos.css';

const Profile = () => {
  const userid = useSelector((state) => state.userid);
  const username = useSelector((state) => state.username);
  const verified = useSelector((state) => state.verified);
  const [classname, setClass] = useState(25);
  const [user, setUser] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [popup, setPopup] = useState(null);

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
        const result = await axios.get("https://apipolemos.playdragonica.eu/fulluser/name/" + username);
        setUser(result.data);
      }
      fetch();
    }, 3000);
    return () => clearInterval(interval);
  });

  const envoyer = (form) => {
    form.preventDefault();
    const fetch = async () => {
      const result = await axios.post("https://apipolemos.playdragonica.eu/confirmAccount/",
      {"code": form.target.teamname.value,
      "userid": userid
      });
      if(result.status === 201){
        setRedirect(true);
      }
    }
    fetch();
  }
  if (redirect){
    return <Redirect to="/Logout"></Redirect>
  }


  const Popup = () => {
    return (<section id="confirmLeaveTeam" className="centerFixed">
        <ul>
          <li><p>{popup}</p></li>
          <li><button onClick={() => okayPopup()}>Close</button></li>
        </ul>
    </section>)
  }
  const okayPopup = () => {
    setPopup(null);
  }


  const envoyerChar = (form) => {
    form.preventDefault();
    const fetch = async () => {
      const result = await axios.post("https://apipolemos.playdragonica.eu/createChar/",
      {"charname": form.target.charname.value,
      "username": username,
      "classname": form.target.classes.value,
      "sexe": form.target.sexe.value
      });
      setPopup(result.data)
    }
    fetch();
  }
  if (redirect){
    return <Redirect to="/Logout"></Redirect>
  }

  const changeClass = (form) => {
    setClass(parseInt(form.target.value))
  }


  const result =  user && user.characters.map((joueur) => {
    return(
    <tr>
      <td><img className="class" src=
        {joueur.Class === 25 ? sentiLogo:
        joueur.Class === 28 ? ombreLogo:
        joueur.Class === 26 ? commandoLogo:
        joueur.Class === 27 ? voltiLogo:
        joueur.Class === 23 ? oracleLogo:
        joueur.Class === 24 ? arcaLogo:
        joueur.Class === 22 ? destruLogo:
        dragonLogo} alt="class"></img>
        </td>
      <td>{joueur.Name}</td>
      <td>{joueur.win}</td>
      <td>{joueur.draw}</td>
      <td>{joueur.lose}</td>
      <td>{(joueur.win + joueur.draw + joueur.lose) > 20 ? "Yes" : "No"}</td>
    </tr>
    )
  });


  return ([
    <section id="profile" className="sectionPage">
      <article className="bannerLogoPage">
        <img className="logoPage" src={logo} alt="logo"></img>      
      </article>
      {
      !verified ?
        <aside className="advisePage">
        <img src={pnjAdvise} alt="pnj"></img>
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
        </svg>
        <form id="createTeamForm" className="formVerifyMail" onSubmit={envoyer}>
          <ul>
            <li>
              <input type="text" name="teamname" id="teamname" placeholder="Enter code (check your mail)"/>
            </li>
            <li><input id="createTeamButton" type="submit" value="Validate your account"/></li>
          </ul>
        </form>
      </aside>:
        <aside className="advisePage">
        <img src={pnjAdvise} alt="pnj"></img>
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-square" fill="currentColor" xmlns="https://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
        <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
        <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
        <circle cx="8" cy="4.5" r="1"/>
      </svg>
      <p>Do you know that you can upgrade your statistics by playing on server ? ;)</p>
      </aside>},
        {user ?
          <section id="profileinfo">
            <h2>{user.username}</h2>
            <ul>
              <li>Polemos Point: <strong>{user.point}</strong></li>
              <li>Favorite Class: <strong>{user.favorite}</strong></li>
            </ul>
            <h3>Characters</h3>
            <table id="tableRank" cellspacing="0">
              <tr><th>Class</th><th>Name</th><th>Win</th><th>Draw</th><th>Lose</th><th>Available for Ranked</th></tr>
              {result}
            </table>
            <p><strong>Note:</strong> To play on ranked with a character, you have to do more than 20 pvp with friends.</p>
            
            {verified ?
              <form id="createTeamForm" className="formCreateChar" onSubmit={envoyerChar}>
              <ul>
                <li>
                  <label for="classes">Create a character </label>         
                  <select id="classes" name="classes" onChange={changeClass}>
                    <option value="25">Sentinel</option>
                    <option value="26">Destroyer</option>
                    <option value="22">Overlord</option>
                    <option value="21">Dragoon</option>
                    <option value="27">Savage</option>
                    <option value="28">Shadow</option>
                    <option value="24">Sorcerer</option>
                    <option value="23">Invoker</option>
                  </select>
                  <img className="classes" src=
                  {classname === 25 ? sentiLogo:
                  classname === 28 ? ombreLogo:
                  classname === 26 ? commandoLogo:
                  classname === 27 ? voltiLogo:
                  classname === 23 ? oracleLogo:
                  classname === 24 ? arcaLogo:
                  classname === 22 ? destruLogo:
                  dragonLogo} alt="class"></img>
                </li>
                <li>
                  <input type="text" name="charname" id="charname" placeholder="Character name"/>
                </li>
                <li>
                  <select id="sexe" name="sexe">
                    <option value="1">Man</option>
                    <option value="2">Women</option>
                  </select>
                </li>
                <li><input id="createTeamButton" className="charCreateButton" type="submit" value="Create"/></li>
              </ul>
              </form>
            : null
          }
          </section>
        : null
      }

        
      </section>,
    (popup !== null && popup !== 2) ? <Popup></Popup>: null,
    popup === 2 ? <Redirect to='/'></Redirect>: null,
    <img className="backgroundPage" src={headerBackground} alt="Background Image"></img>
          ]
  );
}

export default Profile;
