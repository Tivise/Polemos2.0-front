import logo from './img/v2/logo.png';
import teaser1 from './img/teaser1.png';
import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';
import React, { useEffect } from 'react';

import TournamentTree from './TournamentTree';
import Rewards from './Rewards';
import Participants from './Participants';

import axios from 'axios';

import './polemos.css';

import pnjAdvise from './img/v2/addons/111_03.png';
import headerBackground from './img/v2/background.jpg';

import { useSelector } from 'react-redux';

const Tournament = (props) => {
  const isConnected = useSelector((state) => state.isConnected);
  const userId = useSelector((state) => state.userid);
  const token = useSelector((state) => state.token);
  const [pageView, setPageView] = useState(1);
  const [tournament, setTournamentInfo] = useState(null);
  const [compteurTournoi, setCompteurTournoi] = useState(0);
  const [already, setAlready] = useState(null);
  const [popup, setPopup] = useState(false);
  const [userTeams, setUserTeams] = useState(null);
  const [teamUserId, setTeamId] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const verified = useSelector((state) => state.verified);
  console.log(props.match.params);
  const tournamentId = props.location.tournamentProps ? props.location.tournamentProps.tournamentid: null;
  useEffect(() => {
    if(tournamentId){
      if(!already){
        const fetch3 = async () => {
          const result = await axios.post("https://apipolemos.playdragonica.eu/tournament/verify/byparticipantid/",
          {"userid": userId,
          "tournamentid": tournamentId
          });
          if(result.data.length !== 0){
            setAlready(true);
            setTeamId(result.data[0].teamid);
          }
          else{
            setAlready(false);
          }
        }
        fetch3();
      }

      const interval = setInterval(() => {
        const fetch2 = async () => {
          const result = await axios.get("https://apipolemos.playdragonica.eu/tournament/participant/" + tournamentId);
          setCompteurTournoi(result.data.length);
        }
        fetch2();
        const fetch3 = async () => {
          const result = await axios.post("https://apipolemos.playdragonica.eu/tournament/verify/byparticipantid/",
          {"userid": userId,
          "tournamentid": tournamentId
          });
          if(result.data.length !== 0){
            setAlready(true);
            setTeamId(result.data[0].teamid);
          }
          else{
            setAlready(false);
          }
        }
        fetch3();
      }, 5000);
      return () => clearInterval(interval);
    }
  });
  if(!tournamentId){
    return (<Redirect to ="/Tournaments"></Redirect>)
  }
  const leaveTournament = () => {
    const fetch3 = async () => {
      const result = await axios.post("https://apipolemos.playdragonica.eu/tournament/leave/",
      {"teamid": teamUserId,
      "tournamentid": tournamentId,
      });
      if(result.status === 200){
        console.log("Vous avez quitté le tournoi");
      }
    }
    fetch3();
  }

  const openJoinDialog = () => {
    setPopup(true);
    const fetch = async () => {
      const result = await axios.get("https://apipolemos.playdragonica.eu/team/leader/" + userId);
      setUserTeams(result.data);
    }
    fetch();
  
  }
  const envoyer = (form) => {
    form.preventDefault();
    const fetch = async() => {
      const result = await axios.post("https://apipolemos.playdragonica.eu/team/validity/",
      {"teamid": form.target.teamname.value,"tournamentid": tournamentId});
      console.log(result);
      if (result.status === 201){
        const fetch = async() => {
          const result = await axios.post("https://apipolemos.playdragonica.eu/tournament/join/",
          {"teamid": form.target.teamname.value,"tournamentid": tournamentId});
          setPopup(false);
        }
        fetch();
      }
      else if (result.status === 203){
        setPopupMessage("You have too many players in your team");
      }
      else if (result.status === 102){
        setPopupMessage("You doesn't have too many players in your team");
      }
    }
    fetch();

  }

  const resUserTeam = userTeams && userTeams.map((team) => {
    return (<option key="team.teamid" value={team.teamid}>{team.teamname}</option>)
  });


  const Popup = () => {
    return (<section id="joinTournamentDialog" className="centerFixed">
        <form onSubmit={(values) => {envoyer(values)}}>
          <ul>
            <li>
              <label for="teamname">Join tournament with...</label>         
              <select id="teamname" name="teamname">
              {resUserTeam}
              </select></li>
            <li>
            <input type="submit" value="Join"/></li>
            {popupMessage ? <li>{popupMessage}</li> : null }
          </ul>
          <Link to="/Team">You don't have any team? Create a team</Link>
        </form>
    </section>)
  }

  if (!verified){
    return ( <Redirect to="/Profile"></Redirect>);
  }

  if(!props.location.tournamentProps){
    return <Redirect to="/Tournaments"/>
  }
  if(!tournament){
    const fetch = async () => {
      const result = await axios.get("https://apipolemos.playdragonica.eu/tournaments/" + tournamentId);
      setTournamentInfo(result.data[0]);
    }
    fetch();
    const fetch2 = async () => {
      const result = await axios.get("https://apipolemos.playdragonica.eu/tournament/participant/" + tournamentId);
      setCompteurTournoi(result.data.length);
    }
    fetch2();
  }
  const changeView = (value) => {
    if (value !== pageView){
      setPageView(value)
    }
  }
  if (tournament){
    return ([
      <section id="tournament" className="sectionPage">
        <article className="bannerLogoPage">
          <img className="logoPage" src={logo} alt="logo"></img>      
        </article>
        <aside id="headerTournament">
          <article className="mainInfoTournoi">
            <img id="logoTournoi" src={teaser1} alt="teaser tournament"></img>
            <section>
              <h3>{tournament.name}</h3>
              <article>
                <p>Type: {tournament.type === 1 ? <b>1 v 1</b>: tournament.type == 2 ? <b>2 v 2</b> : tournament.type == 3 ? <b>3 v 3</b> : tournament.type == 4 ? <b>4 v 4</b> : <b>5 v 5</b>}</p>
                <p>Cost: <b>{tournament.cost === 0? "Free" : tournament.cost + "PP"}</b></p>
                <p><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-alarm-fill" fill="currentColor" xmlns="https://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527zM8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
                </svg>{tournament.hoursBegin} to {tournament.hoursEnd}</p>
                <p>Dates: {tournament.dates}</p>
              </article>
            </section>
          </article>
            <aside id="compteurCo">
                <h5><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-diagram-3-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zm-6 8A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm6 0A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm6 0a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1z"/>
                </svg>{compteurTournoi}/{tournament.place}</h5>
                {!isConnected ? <Link className="statusClosed" to="/Login">Not connected, login</Link> : already ? <button className="statusClosed" onClick={() => leaveTournament()}>Leave the tournament</button> : tournament.status === 1 ? <button onClick={() => openJoinDialog()}>Register for the tournament</button> : <button className="statusFinished">Registration Closed</button>} 
              </aside>
        </aside>
        <section id="tournamentFlex">
          <nav className="menuRanking">
            <button onClick={() => changeView(1)}>Tournament Tree</button>
            <button onClick={() => changeView(2)}>Participants</button>
            <button onClick={() => changeView(3)}>Rewards</button>
          </nav>
          {pageView === 1 ? <TournamentTree></TournamentTree> : pageView === 2 ? <Participants tournamentId={tournamentId}></Participants> : <Rewards></Rewards>}
        </section>
      </section>,
      popup ? <Popup type="1"></Popup>:null,
      <img className="backgroundPage" src={headerBackground} alt="Background Image"></img>
    ]
    );
  }
  else{
    return ([
      <section id="tournament" className="sectionPage">
        <article className="bannerLogoPage">
          <img className="logoPage" src={logo} alt="logo"></img>
          <h2>Chargement en cours...</h2>
        </article>
      </section>,
    <img className="backgroundPage" src={headerBackground} alt="Background Image"></img>
  ]
    );
  }
}

export default Tournament;
