import logo from './img/v2/logo.png';
import './polemos.css';
import arenaLogo from './img/v2/arena.png';
import headerBackground from './img/v2/background.jpg';
import girlEvent from './img/v2/girl.png';
import discordLogo from './img/v2/discord.png';
import backgroundDiscord from './img/v2/bardiscord.jpg';
import downloadText from './img/v2/download.png';
import backgroundFooter from './img/v2/background-bot.jpg';
import React from 'react';

function Information() {
  return (
    [
    <section id="home-page" className="polemos-section">
      <aside id="main-header">
        <img id="polemos-logo" src={logo} alt="Polemos Logo"></img>
        <h2 id="compteur-sortie"></h2>
        <img id="headerBg" src={headerBackground} alt="background"></img>        
      </aside>
      <h1>A pvp server like you always dream<i>...</i></h1>
      <section>
        <section id="precision">
          <article id="arena" className="side">
            <img src={arenaLogo} alt="arena logo"></img>
            <aside>
              <h2>Tournaments</h2>
              <ul>
                <li>Real cashprize</li>
                <li>Refereed match</li>
                <li>Every month</li>
              </ul>            
            </aside>
          </article>
          <article id="girl" className="side">
            <aside>
              <h2>Training and fun</h2>
              <ul>
                <li>Free entry</li>
                <li>Opened 2-4 days per week</li>
                <li>3-4 hours / day</li>
              </ul>            
            </aside>
            <img src={girlEvent} alt="girl event"></img>
          </article>
        </section>
        <article className="evolution">
          <section id="evolution1"><p>1</p><h3>Register on <br></br>website</h3></section>
          <section id="evolution2"><p>2</p><h3>Create a <br></br>character</h3></section>
          <section id="evolution3"><p>3</p><h3>and<br></br>Play !</h3></section>
        </article>        
      </section>
    <aside className="discord-section">
      <a href="https://discord.gg/Je6agmN" rel="noreferrer" target="_blank"><img id="discord-logo" src={discordLogo} alt="discord logo"></img></a>
      <img id="discord-bg" src={backgroundDiscord} alt="Background for discord"></img>
    </aside>
    <aside id="download">
      <section>
        <a href="https://playdragonica.eu/fr/download" rel="noreferrer" target="_blank"><img src={downloadText} alt="Download now"></img></a>
        <p>Only Dragonica Europe is needed</p>
      </section>
      <img src={backgroundFooter} alt="teaser img"></img>
    </aside>
    </section>
    ]
  );
}

export default Information;
