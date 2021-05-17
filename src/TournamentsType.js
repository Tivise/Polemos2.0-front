import registerIMG from './img/register.png';
import rankingIMG from './img/ranking.png';
import tournamentIMG from './img/tournament.png';
import backgroundIMG from './img/bg/5.png';
import backgroundIMG1 from './img/bg/1.png';
import logo from './img/polemos.png';
import teaser1 from './img/teaser1.png';
import teaser2 from './img/teaser2.png';
import { Link } from 'react-router-dom';
import trainingLogo from './img/training-logo.png';
import arenalogo from './img/arena-logo.png';
import tournamentlogo from './img/tournament-logo.png';
import './polemos.css';

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';

const TournamentsType = ({type}) => {
  const tournaments = useSelector((state) => state.tournaments);
  const result =  tournaments && tournaments.filter(function(tournament) {
    if (tournament.status.toString() === type.toString()){
      return true;
    }
    return false;
  }).map((tournament) => {
      return (
        <li>
          <article className={type === '2' ? "tournamentStatus statusClosed": type === '1' ? "tournamentStatus statusOpen" : type == '3' ? "tournamentStatus statusFinished" : "tournamentStatus"}>
            <p>{type === '2' ? 'TOURNAMENT INCOMING' : type === '1' ? 'REGISTRATION OPEN' : type == '3' ? 'ENDED' : 'STATUS ?'}</p>
          </article>
          <article>
            <ul className="tournamentInfo">
              <li><h3>{tournament.name}</h3></li>
              <li><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor" xmlns="https://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              </svg>0/{tournament.place}</li>
              <li>Type: {tournament.type === 1 ? <b>1 v 1</b>: tournament.type == 2 ? <b>2 v 2</b> : tournament.type == 3 ? <b>3 v 3</b> : tournament.type == 4 ? <b>4 v 4</b> : <b>5 v 5</b>}</li>
              <li>Cost: <b>{tournament.cost === 0? "Free" : tournament.cost + "PP"}</b></li>
              <li><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-alarm-fill" fill="currentColor" xmlns="https://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527zM8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
              </svg>{tournament.hoursBegin} to {tournament.hoursEnd}</li>
              <li>Dates: {tournament.dates}</li>
            </ul>
            <img src={teaser1} alt="teaser tournament"></img>
          </article>
          <aside>
          {type === '1' ?
            <Link className="joinButton" to={{
              pathname: '/Tournament',
              tournamentProps: {
                tournamentid: tournament.id
              }
            }}>Join this tournament</Link> : ""}
            <Link to={{
              pathname: '/Tournament',
              tournamentProps: {
                tournamentid: tournament.id
              }
            }}>More information</Link>
          </aside>
        </li>
      )
  });
  if (result){
    return (
      <ul id="TournamentList">
        {result.length === 0 ? <p>No tournament available...</p> : result}
      </ul>
    );    
  }
  else{
    return <p>Chargement...</p>
  }

}

export default TournamentsType;
