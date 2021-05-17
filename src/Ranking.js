import backgroundIMG from './img/bg/5.png';
import logo from './img/v2/logo.png';
import { useState } from 'react';
import React, { useEffect } from 'react';
import destruLogo from './img/class/destructeur.jpg';
import sentiLogo from './img/class/sentinelle.jpg';
import dragonLogo from './img/class/dragoon.jpg';
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
import silverLogo from './img/rank/silver.png';
import goldLogo from './img/rank/gold.png';
import bronzeLogo from './img/rank/bronze.png';
import diamondLogo from './img/rank/diamant.png';
import masterLogo from './img/rank/maitre.png';
import { Redirect } from 'react-router-dom';
import pnjAdvise from './img/v2/addons/111_03.png';
import headerBackground from './img/v2/background.jpg';


import './polemos.css';
import axios from 'axios';

function Ranking() {

  const [classement, setRank] = useState(null);
  const [classementteam, setTeams] = useState(null);
  const [type, setType] = useState(1);
  const [redirect, setRedirect] = useState(null);
  const [pageNumber, setPage] = useState(0);
  const [tri, setTri] = useState(0);

  const changeType = (type) =>{
    setType(type)
  }

  const changePage = (page) =>{
    setPage(page)
  }

  const viewButton = (team) =>{
    setRedirect(team);
  }

  const changeTri = () => {
    if(tri < 3){
      setTri(tri + 1);
    }
    else{
      setTri(0);
    }
  }
  useEffect(() => {
    if (!classement){
      const fetch = async () => {
        const result = await axios.get("https://apipolemos.playdragonica.eu/ranking");
        setRank(result.data);
      }
      fetch();      
    }
    if(!classementteam){
      const fetch = async () => {
        const result = await axios.get("https://apipolemos.playdragonica.eu/teams/");
        setTeams(result.data);
      }
      fetch();
    }
    const interval = setInterval(() => {
      if(type == 1){
        const fetch = async () => {
          const result = await axios.get("https://apipolemos.playdragonica.eu/ranking");
          setRank(result.data);
        }
        fetch();
      }
      else if(type == 2){
        const fetch = async () => {
          const result = await axios.get("https://apipolemos.playdragonica.eu/teams/");
          setTeams(result.data);
        }
        fetch();
      }
    }, 5000);
    return () => clearInterval(interval);
  });

  if(redirect){
    return <Redirect
    to={{
      pathname: "/Teams",
      state: { team: redirect }
    }}
    ></Redirect>
  }


  if(type == 1){
    let cpt = 0;
    const result =  classement && classement.map((joueur) => {

      /*
        Tri 1: Tri par pays
        Tri 2: Tri par point
        Tri 0: Aucun tri
        Tri 3: Tri par guitare
      */
      if(tri === 1 && joueur.country == 'BE' || tri === 0 || tri === 2 && joueur.point > 500 || tri === 3 && joueur.classname === 'Voltigeur'){
        cpt++;
        return(
        <tr>
          <td>{cpt}</td>
          <td key={joueur.username}><img className="flag" src={
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
          <td><img className="class" src=
          {joueur.classname === 'Sentinelle' ? sentiLogo:
          joueur.classname === 'Ombre' ? ombreLogo:
          joueur.classname === 'Commando' ? commandoLogo:
          joueur.classname === 'Voltigeur' ? voltiLogo:
          joueur.classname === 'Oracle' ? oracleLogo:
          joueur.classname === 'Arcaniste' ? arcaLogo:
          joueur.classname === 'Destructeur' ? destruLogo:
          dragonLogo} alt="class"></img>
          </td>
          <td>{joueur.username}</td>
          <td>{joueur.point}</td>
          <td><img className="badge" src=
        {joueur.point > 500 && joueur.point < 1000? silverLogo:
          joueur.point >= 1000 && joueur.point < 1500 ? goldLogo:
          joueur.point >= 1500 && joueur.point < 2000 ? diamondLogo:
          joueur.point >= 2000 ? masterLogo:
        bronzeLogo} alt="badge"></img>
        </td>
        </tr>
        )
      }
    });

    return ([
      <section id="ranking" className="sectionPage">
        <article className="bannerLogoPage">
          <img className="logoPage" src={logo} alt="logo"></img>      
        </article>
        <aside className="advisePage">
          <img src={pnjAdvise} alt="pnj"></img>
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-square" fill="currentColor" xmlns="https://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
            <circle cx="8" cy="4.5" r="1"/>
          </svg>
          <p>The classification is made of PP (Polemos Points).
          <br></br>You can get them by playing on the tournaments.</p>
        </aside>
        <aside className="menuRanking"><button id="rankingSelected" onClick={() => changeType(1)}>Player Ranking</button><button onClick={() => changeType(2)}>Team Ranking</button></aside>
        <section id="rank">
          <button onClick={() => setTri(0)}>Tous</button> 
          <button onClick={() => setTri(1)}>Tri par pays</button> 
          <button onClick={() => setTri(2)}>Tri par point</button> 
          <button onClick={() => setTri(3)}>Tri par Guitare</button>
          <table id="tableRank" cellspacing="0">
            <tr><th>Place</th><th>Country</th><th>Class</th><th>Playername</th><th>Polemos Point</th><th>Division</th></tr>
            {result}
          </table>
        </section>
        <aside className="menuRanking"><button onClick={() => changePage(1)}>Previous</button><button id="rankingSelected" onClick={() => changePage(2)}>Next</button></aside>
      </section>,
    <img className="backgroundPage" src={headerBackground} alt="Background Image"></img>
         ]
    );
  }
  else if(type == 2){
    let cpt = 0;
    const result =  classementteam && classementteam.map((equipe) => {
      cpt++;
      const mmr = equipe.victory-(equipe.loss*2);
      return(
      <tr>
        <td>{cpt}</td>
        <td className="rankingTeamName">{equipe.teamname}</td>
        <td><img className="badge" src=
        {mmr > 2 && mmr < 4? silverLogo:
        mmr >= 5 && mmr < 10 ? goldLogo:
        mmr >= 10 && mmr < 20 ? diamondLogo:
        mmr >= 20 ? masterLogo:
        bronzeLogo} alt="badge"></img>
        </td>
        <td>{equipe.victory}</td>
        <td>{equipe.loss}</td>
        <td><button className="viewButtonTeam" onClick={() => viewButton(equipe)}>View</button></td>
      </tr>
      )
    });

    return ([
      <section id="ranking" className="sectionPage">
        <article className="bannerLogoPage">
          <img className="logoPage" src={logo} alt="logo"></img>      
        </article>
        <aside className="advisePage">
          <img src={pnjAdvise} alt="pnj"></img>
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-square" fill="currentColor" xmlns="https://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
            <circle cx="8" cy="4.5" r="1"/>
          </svg>
          <p>The classification is made of PP (Polemos Points).
          <br></br>You can get them by playing on the tournaments.</p>
        </aside>
        <aside className="menuRanking"><button onClick={() => changeType(1)}>Player Ranking</button><button id="rankingSelected" onClick={() => changeType(2)}>Team Ranking</button></aside>
        <section id="rank">
          <table id="tableRank" cellspacing="0">
            <tr><th>Place</th><th>Team</th><th>Division</th><th>Win</th><th>Loss</th><th></th></tr>
            {result}
          </table>
        </section>
        <aside className="menuRanking"><button onClick={() => changePage(1)}>Previous</button><button id="rankingSelected" onClick={() => changePage(2)}>Next</button></aside>
      </section>,
    <img className="backgroundPage" src={headerBackground} alt="Background Image"></img>
            ]
    );

  
  }

}

export default Ranking;
