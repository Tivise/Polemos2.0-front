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

import destruLogo from './img/class/destructeur.jpg';
import arcaLogo from './img/class/arcaniste.jpg';
import oracleLogo from './img/class/oracle.jpg';
import sentiLogo from './img/class/sentinelle.jpg';
import dragonLogo from './img/class/dragoon.jpg';
import commandoLogo from './img/class/commando.jpg';
import ombreLogo from './img/class/ombre.jpg';
import voltiLogo from './img/class/voltigeur.jpg';
import franceLogo from './img/flags/fr.png';
import belgiqueLogo from './img/flags/be.png';
import suisseLogo from './img/flags/suisse.png';
import usaLogo from './img/flags/us.png';
import ukLogo from './img/flags/uk.png';
import canadaLogo from './img/flags/ca.png';
import vietLogo from './img/flags/viet.png';
import polskaLogo from'./img/flags/pl.png';
import spainLogo from './img/flags/sp.png';

import './polemos.css';

function TournamentTree() {

  return ([
    <section id="TournamentTree">
      <section id="tree64">
        <article className="treeMatch">
          <aside className="player line">
            <p><img src={sentiLogo} alt="logo senti"></img><br></br><img src={dragonLogo} alt="logo dragon"></img></p>
            <p>---<br></br>---</p>
            <i>2</i>
          </aside>
          <p>:</p>
          <aside className="player">
          <i>1</i>
            <p>---<br></br>---</p>
            <p><img src={destruLogo} alt="logo senti"></img><br></br><img src={sentiLogo} alt="logo dragon"></img></p>
          </aside>
        </article>
        <article className="treeMatch">
          <aside className="player">
            <p><img src={arcaLogo} alt="logo arca"></img><br></br><img src={arcaLogo} alt="logo dragon"></img></p>
            <p>---<br></br>---</p>
            <i>2</i>
          </aside>
          <p>:</p>
          <aside className="player">
          <i>1</i>
            <p>---<br></br>---</p>
            <p><img src={oracleLogo} alt="logo senti"></img><br></br><img src={sentiLogo} alt="logo dragon"></img></p>
          </aside>
        </article>


        <article className="treeMatch">
          <aside className="player line">
            <p><img src={sentiLogo} alt="logo senti"></img><br></br><img src={dragonLogo} alt="logo dragon"></img></p>
            <p>---<br></br>---</p>
            <i>2</i>
          </aside>
          <p>:</p>
          <aside className="player">
          <i>1</i>
            <p>---<br></br>---</p>
            <p><img src={destruLogo} alt="logo senti"></img><br></br><img src={sentiLogo} alt="logo dragon"></img></p>
          </aside>
        </article>
        <article className="treeMatch">
          <aside className="player">
            <p><img src={arcaLogo} alt="logo arca"></img><br></br><img src={arcaLogo} alt="logo dragon"></img></p>
            <p>---<br></br>---</p>
            <i>2</i>
          </aside>
          <p>:</p>
          <aside className="player">
          <i>1</i>
            <p>---<br></br>---</p>
            <p><img src={oracleLogo} alt="logo senti"></img><br></br><img src={sentiLogo} alt="logo dragon"></img></p>
          </aside>
        </article>


        <article className="treeMatch">
          <aside className="player line">
            <p><img src={sentiLogo} alt="logo senti"></img><br></br><img src={dragonLogo} alt="logo dragon"></img></p>
            <p>---<br></br>---</p>
            <i>2</i>
          </aside>
          <p>:</p>
          <aside className="player">
          <i>1</i>
            <p>---<br></br>---</p>
            <p><img src={destruLogo} alt="logo senti"></img><br></br><img src={sentiLogo} alt="logo dragon"></img></p>
          </aside>
        </article>
        <article className="treeMatch">
          <aside className="player">
            <p><img src={arcaLogo} alt="logo arca"></img><br></br><img src={arcaLogo} alt="logo dragon"></img></p>
            <p>---<br></br>---</p>
            <i>2</i>
          </aside>
          <p>:</p>
          <aside className="player">
          <i>1</i>
            <p>---<br></br>---</p>
            <p><img src={oracleLogo} alt="logo senti"></img><br></br><img src={sentiLogo} alt="logo dragon"></img></p>
          </aside>
        </article>




        <article className="treeMatch">
          <aside className="player line">
            <p><img src={sentiLogo} alt="logo senti"></img><br></br><img src={dragonLogo} alt="logo dragon"></img></p>
            <p>---<br></br>---</p>
            <i>2</i>
          </aside>
          <p>:</p>
          <aside className="player">
          <i>1</i>
            <p>---<br></br>---</p>
            <p><img src={destruLogo} alt="logo senti"></img><br></br><img src={sentiLogo} alt="logo dragon"></img></p>
          </aside>
        </article>
        <article className="treeMatch">
          <aside className="player">
            <p><img src={arcaLogo} alt="logo arca"></img><br></br><img src={arcaLogo} alt="logo dragon"></img></p>
            <p>---<br></br>---</p>
            <i>2</i>
          </aside>
          <p>:</p>
          <aside className="player">
          <i>1</i>
            <p>---<br></br>---</p>
            <p><img src={oracleLogo} alt="logo senti"></img><br></br><img src={sentiLogo} alt="logo dragon"></img></p>
          </aside>
        </article>



      </section>
      <section id="tree32">

      <article className="treeMatch">
          <aside className="player line2">
            <p><img src={sentiLogo} alt="logo senti"></img><br></br><img src={dragonLogo} alt="logo dragon"></img></p>
            <p>---<br></br>---</p>
            <i>2</i>
          </aside>
          <p>:</p>
          <aside className="player">
          <i>1</i>
            <p>---<br></br>---</p>
            <p><img src={destruLogo} alt="logo senti"></img><br></br><img src={sentiLogo} alt="logo dragon"></img></p>
          </aside>
        </article>
        <article className="treeMatch">
          <aside className="player">
            <p><img src={arcaLogo} alt="logo arca"></img><br></br><img src={arcaLogo} alt="logo dragon"></img></p>
            <p>---<br></br>---</p>
            <i>2</i>
          </aside>
          <p>:</p>
          <aside className="player">
          <i>1</i>
            <p>---<br></br>---</p>
            <p><img src={oracleLogo} alt="logo senti"></img><br></br><img src={sentiLogo} alt="logo dragon"></img></p>
          </aside>
        </article>

        <article className="treeMatch">
          <aside className="player line2">
            <p><img src={sentiLogo} alt="logo senti"></img><br></br><img src={dragonLogo} alt="logo dragon"></img></p>
            <p>---<br></br>---</p>
            <i>2</i>
          </aside>
          <p>:</p>
          <aside className="player">
          <i>1</i>
            <p>---<br></br>---</p>
            <p><img src={destruLogo} alt="logo senti"></img><br></br><img src={sentiLogo} alt="logo dragon"></img></p>
          </aside>
        </article>
        <article className="treeMatch">
          <aside className="player">
            <p><img src={arcaLogo} alt="logo arca"></img><br></br><img src={arcaLogo} alt="logo dragon"></img></p>
            <p>---<br></br>---</p>
            <i>2</i>
          </aside>
          <p>:</p>
          <aside className="player">
          <i>1</i>
            <p>---<br></br>---</p>
            <p><img src={oracleLogo} alt="logo senti"></img><br></br><img src={sentiLogo} alt="logo dragon"></img></p>
          </aside>
        </article>

      </section>
      <section id="tree16">
        <article className="treeMatch">
          <aside className="player line3">
            <p><img src={sentiLogo} alt="logo senti"></img><br></br><img src={dragonLogo} alt="logo dragon"></img></p>
            <p>---<br></br>---</p>
            <i>2</i>
          </aside>
          <p>:</p>
          <aside className="player">
          <i>1</i>
            <p>---<br></br>---</p>
            <p><img src={destruLogo} alt="logo senti"></img><br></br><img src={sentiLogo} alt="logo dragon"></img></p>
          </aside>
        </article>
        <article className="treeMatch">
          <aside className="player">
            <p><img src={arcaLogo} alt="logo arca"></img><br></br><img src={arcaLogo} alt="logo dragon"></img></p>
            <p>---<br></br>---</p>
            <i>2</i>
          </aside>
          <p>:</p>
          <aside className="player">
          <i>1</i>
            <p>---<br></br>---</p>
            <p><img src={oracleLogo} alt="logo senti"></img><br></br><img src={sentiLogo} alt="logo dragon"></img></p>
          </aside>
        </article>
      </section>
      <section id="tree8">
        <article className="treeMatch">
            <aside className="player">
              <p><img src={sentiLogo} alt="logo senti"></img><br></br><img src={dragonLogo} alt="logo dragon"></img></p>
              <p>---<br></br>---</p>
              <i>2</i>
            </aside>
            <p>:</p>
            <aside className="player">
            <i>1</i>
              <p>---<br></br>---</p>
              <p><img src={destruLogo} alt="logo senti"></img><br></br><img src={sentiLogo} alt="logo dragon"></img></p>
            </aside>
          </article>
          <article className="treeMatch">
            <aside className="player">
              <p><img src={arcaLogo} alt="logo arca"></img><br></br><img src={arcaLogo} alt="logo dragon"></img></p>
              <p>---<br></br>---</p>
              <i>2</i>
            </aside>
            <p>:</p>
            <aside className="player">
            <i>1</i>
              <p>---<br></br>---</p>
              <p><img src={oracleLogo} alt="logo senti"></img><br></br><img src={sentiLogo} alt="logo dragon"></img></p>
            </aside>
          </article>
      </section>
      <section id="tree4"></section>
      <section id="treeDemiFinal"></section>
      <section id="finalAnd3rdMatch"></section>
    </section>
          ]
  );
}

export default TournamentTree;
