import registerIMG from './img/register.png';
import rankingIMG from './img/ranking.png';
import tournamentIMG from './img/tournament.png';
import backgroundIMG from './img/bg/5.png';
import backgroundIMG1 from './img/bg/1.png';
import logo from './img/polemos.png';
import teaser1 from './img/teaser1.png';
import teaser2 from './img/teaser2.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import React, { useEffect } from 'react';
import trainingLogo from './img/training-logo.png';
import arenalogo from './img/arena-logo.png';
import tournamentlogo from './img/tournament-logo.png';

import first from './img/rank/1st.png';
import second from './img/rank/2nd.png';
import third from './img/rank/3rd.png';
import fourth from './img/rank/4th.png'; 


import './polemos.css';

function Rewards() {

  return ([
    <section id="Rewards">
      <section id="rank">
        <table id="tableRank" cellspacing="0">
          <tr><th>Place</th><th>Reward Type</th><th>Reward</th><th>Polemos Point</th></tr>
          <tr className="placeFirst"><td><img className="placeRank" src={first} alt="FR"></img></td><td>PayPal, Dragonica Europe</td><td>100 EUR, 6000 DPs</td><td>+2000</td></tr>
          <tr className="placeSecond"><td><img className="placeRank" src={second} alt="FR"></img></td><td>PayPal, Dragonica Europe</td><td>50 EUR, 3000 DPs</td><td>+1000</td></tr>
          <tr className="placeThird"><td><img className="placeRank" src={third} alt="FR"></img></td><td>PayPal, Dragonica Europe</td><td>25 EUR, 2000 DPs</td><td>+500</td></tr>
          <tr><td><img className="placeRank" src={fourth} alt="FR"></img></td><td>Dragonica Europe</td><td>1500 DPs</td><td>+250</td></tr>
          <tr><td>5-8</td><td>Dragonica Europe</td><td>750 DPs</td><td>+150</td></tr>
          <tr><td>Participation</td><td>---</td><td>---</td><td>+100</td></tr>
        </table>
      </section>
    </section>
          ]
  );
}

export default Rewards;
