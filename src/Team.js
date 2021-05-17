import logo from './img/v2/logo.png';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import './polemos.css';
import Invitations from './components/team/Invitations';
import { useSelector } from 'react-redux';
import axios from 'axios';
import TeamContainer from './containers/teamContainer';
import TeamComposition from './components/team/TeamComposition';
import pnjAdvise from './img/v2/addons/111_03.png';
import headerBackground from './img/v2/background.jpg';
const Team = () => {

  const teamInfo = useSelector((state) => state.team);
  const isConnected = useSelector((state) => state.isConnected);
  const userid = useSelector((state) => state.userid);
  const [popup, setPopup] = useState(null);
  const verified = useSelector((state) => state.verified);

  if(!isConnected){
    return <Redirect to="/Login"/>
  }

  const envoyer = (form) => {
    form.preventDefault();
    const fetch = async () => {
      const result = await axios.post("https://apipolemos.playdragonica.eu/team/create/",
      {"teamname": form.target.teamname.value,
      "userid": userid
      });
      if(result.status === 201){
        setPopup("Team was created succefully");
      }
      else{
        setPopup("You exceeded the maximum amount of teams!");
      }
      // Ajouter ici un événement quand le compte est crée, et si status mauvais, afficher une erreur.
    }
    fetch();
  }

  const okayPopup = () => {
    setPopup(null);
  }

  const Popup = () => {
    return (<section id="confirmLeaveTeam" className="centerFixed">
        <ul>
          <li><p>{popup}</p></li>
          <li><button onClick={() => okayPopup()}>Close</button></li>
        </ul>
    </section>)
  }

  const changeLockState = (teamid) => {
    const fetch = async () => {
      await axios.get("https://apipolemos.playdragonica.eu/team/state/"+teamid);
    }
    fetch();
  }

  if (!verified){
    return ( <Redirect to="/Profile"></Redirect>);
  }

  return ([
    <section id="teams" className="sectionPage">
      {popup ? <Popup></Popup>:null}
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
        <p>You can create your team and invite people to join your teams!<br></br>Next, you'll be able to join a tournament with your team.<br></br>You can't reach more than 5 teams</p>
      </aside>
      <form id="createTeamForm" onSubmit={envoyer}>
        <ul>
          <li>
            <input type="text" name="teamname" id="teamname" placeholder="Enter your team name"/>
          </li>
          <li><input id="createTeamButton" type="submit" value="Create Team"/></li>
        </ul>
      </form>
      <section id="teamsSousComp">
        <article>
          <section id="teams-section">
            <h3>Your teams</h3>
            <TeamContainer></TeamContainer>
          </section>
          <section id="invitations-section">
            <h3>Invitations</h3>
            <Invitations></Invitations>
          </section>   
        </article>
        <article>
          {teamInfo ?
            <section>
              <h2>{teamInfo.teamname}</h2>
              <h3>Team Composition</h3>
              {teamInfo.ownerid === userid ? <button className="lockedbutton" onClick={() => changeLockState(teamInfo.teamid)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
</svg>{teamInfo ? (teamInfo.locked ? "Unlock" : "Lock" ): null}</button>
              : null}
              <TeamComposition></TeamComposition>
            </section>
            :
            <section>
              <p id="chooseTeam">Select your team</p>
            </section>
        }
        </article>
        
      </section>
    </section>,
    <img className="backgroundPage" src={headerBackground} alt="Background Image"></img>
  ]
  );
}

export default Team;
