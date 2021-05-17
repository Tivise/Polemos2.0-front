import logo from './img/v2/logo.png';
import headerBackground from './img/v2/background.jpg';
import './polemos.css';
import { Redirect } from 'react-router-dom';
import TournamentsType from './TournamentsType';

import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';

function Tournaments({dispatchTournaments}) {
  const tournaments = useSelector((state) => state.tournaments);
  const verified = useSelector((state) => state.verified);

  useEffect(() => {
    if (!tournaments){
      const fetch = async () => {
        const result = await axios.get("https://apipolemos.playdragonica.eu/tournaments");
        dispatchTournaments(result);
      }
      fetch();
    }
    const interval = setInterval(() => {
      const fetch = async () => {
        const result = await axios.get("https://apipolemos.playdragonica.eu/tournaments");
        dispatchTournaments(result);
      }
      fetch();
    }, 5000);
    return () => clearInterval(interval);
  });

  if (!verified){
    return ( <Redirect to="/Profile"></Redirect>);
  }

  return (
    [
    <section id="tournament" className="sectionPage">
      <article className="bannerLogoPage">
          <img className="logoPage" src={logo} alt="logo"></img>      
        </article>
      <section id="twoInOne">
        <article>
          <h2>In progress...</h2>
          <TournamentsType type="2"></TournamentsType>
        </article>
        <article>
          <h2>Opened...</h2>
          <TournamentsType type="1"></TournamentsType>
        </article>
      </section>
      <h2>Closed...</h2>
      <TournamentsType type="3"></TournamentsType>
    </section>,
    <img className="backgroundPage" src={headerBackground} alt="Background Image"></img>

  
    ]
  );
}

export default Tournaments;
