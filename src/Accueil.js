import logo from './img/v2/logo.png';
import './polemos.css';
import headerBackground from './img/v2/background.jpg';
import { useSelector } from 'react-redux';
import passmap from './img/pass/passm.png';
import passvisage from './img/pass/passv.png';
import passwoodie from './img/pass/passw.png';
import passother from './img/pass/passother.png';
import passpet from './img/pass/passp.png';
import { useState } from 'react';
import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Accueil() {
  const userid = useSelector((state) => state.userid);
  const username = useSelector((state) => state.username);
  const verified = useSelector((state) => state.verified);
  const [planning, setPlanning] = useState(null);
  const [pass, setPass] = useState(null);
  useEffect(() => {
    if(!planning){
      const fetch = async () => {
        const result = await axios.get("https://apipolemos.playdragonica.eu/planning");
        setPlanning(result.data);
      }
      fetch();
    }
    if(verified){
      const fetch = async () => {
        const result1 = await axios.get("https://apipolemos.playdragonica.eu/polemospass/" + userid);
        setPass(result1.data);
      }
      fetch();
    }
    const interval = setInterval(() => {
      const fetch = async () => {
        const result = await axios.get("https://apipolemos.playdragonica.eu/planning");
        setPlanning(result.data);
      }
      fetch();
      if(verified){
        const fetch = async () => {
          const result1 = await axios.get("https://apipolemos.playdragonica.eu/polemospass/" + userid);
          setPass(result1.data);
        }
        fetch();
      }
    }, 5000);
    return () => clearInterval(interval);
  })
  var d = new Date();
  const day1 = d.getDay();

  const rewardsPrint = pass && pass.rewards.map( (reward) => {
      return (
        <article className="rewardArticle">
          <h4>{reward.name}</h4>
          <img className="passicon" src={reward.type === 0 ?  passvisage : reward.type === 1 ? passwoodie : reward.type === -1 ? passmap : reward.type === 2 ? passpet : passother}></img>
          {pass.experience >= reward.requiredExp && pass.vip ?
          <p className="passLevelOk"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
          </svg></p> :
          pass.experience >= reward.requiredExp && !pass.vip ?
            <p className="needPass">Need pass</p> :
            <p className="passLevel">Lv.{reward.requiredExp/100}</p>}
          <p>{!pass.vip && reward.vip === 1 ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
</svg>:null}</p>
        </article>
      )
    })
  return (
    [
    <section className="polemos-section">
      <aside id="main-header">
        <img id="polemos-logo" src={logo} alt="Polemos Logo"></img>
          {planning ?
            <ul id="planning-header">          
              <li className={day1 === 1 ? "Today": "Monday"}>
              <h3>{day1 === 1 ? "Today": "Monday"}</h3>
              <p>{planning.monday}</p>
            </li>
            <li className={day1 === 2 ? "Today": "Tuesday"}>
              <h3>{day1 === 2 ? "Today": "Tuesday"}</h3>
              <p>{planning.tuesday}</p>
            </li>
            <li className={day1 === 3 ? "Today": "Wednesday"}>
              <h3>{day1 === 3 ? "Today": "Wednesday"}</h3>
              <p>{planning.wednesday}</p>
            </li>
            <li className={day1 === 4 ? "Today": "Wednesday"}>
              <h3>{day1 === 4 ? "Today": "Thursday"}</h3>
              <p>{planning.thursday}</p>
            </li>
            <li className={day1 === 5 ? "Today": "Friday"}>
              <h3>{day1 === 5 ? "Today": "Friday"}</h3>
              <p>{planning.friday}</p>
            </li>
            <li className={day1 === 6 ? "Today": "Saturday"}>
              <h3>{day1 === 6 ? "Today": "Saturday"}</h3>
              <p>{planning.saturday}</p>
            </li>
            <li className={day1 === 0 ? "Today": "Sunday"}>
              <h3>{day1 === 0 ? "Today": "Sunday"}</h3>
              <p>{planning.sunday}</p>
            </li>
            <li>
              <h3>Monday</h3>
              <p>{planning.mondaynext}</p>
            </li>
            <li>
              <h3>Tuesday</h3>
              <p>{planning.tuesdaynext}</p>
            </li>
          </ul>
        : null}
        <img id="headerBg" src={headerBackground} alt="background"></img>        
      </aside>
      <section id="passQuests">
        {pass ?
        [
        <article id="passPlayer">
          <h4>{username}</h4>
          <aside>
            <p>Level {Math.trunc(pass.experience/100)}</p>
            <p>{pass.experience % 100}/100 XP</p>
          </aside>
          {pass.vip ? <p id="statusVIP">VIP</p> : <Link to="/Boutique" id="statusVIPb">Buy Pass</Link>}
        </article>,
        <article>
          <h4>Quest {pass.quest.id}: {pass.quest.name}</h4>
          <aside>
            <p className="expQuest">+{pass.quest.exp} XP</p>
            {pass.quest.type === 0 ? <p>Kill {pass.quest.number} players</p>:
            pass.quest.type === 1 ? <p>Play {pass.quest.number} matchs</p>:
            pass.quest.type === 2 ? <p>Kill {pass.quest.number} players without dying</p>:
            pass.quest.type === 3 ? <p>Win {pass.quest.number} matchs</p>:
            pass.quest.type === 4 ? <p>Reach {pass.quest.number} PP</p>:
            pass.quest.type === 5 ? <p>Play on {pass.quest.number} different maps</p>:
            pass.quest.type === 6 ? <p>Play {pass.quest.number} matchs without being {pass.class}</p>:
            pass.quest.type === 7 ? <p>Win {pass.quest.number} matchs in a row</p>:
            pass.quest.type === 8 ? <p>Reach {pass.quest.number} matchs</p>:
            pass.quest.type === 9 ? <p>Reach {pass.quest.number} victory</p>:
            pass.quest.type === 10 ? <p>Play {pass.quest.number} matchs being {pass.class}</p>:
            null}
          </aside>
          <p id="questDescription">{pass.quest.description}</p>
        </article>,
        <article>
          <h4>Next Quest: {pass.nextquest.name}</h4>
          <aside>
            <p className="expQuest">+{pass.nextquest.exp} XP</p>
            {pass.nextquest.type === 0 ? <p>Kill {pass.nextquest.number} players</p>:
            pass.nextquest.type === 1 ? <p>Play {pass.nextquest.number} matchs</p>:
            pass.nextquest.type === 2 ? <p>Kill {pass.nextquest.number} players without dying</p>:
            pass.nextquest.type === 3 ? <p>Win {pass.nextquest.number} matchs</p>:
            pass.nextquest.type === 4 ? <p>Reach {pass.nextquest.number} PP</p>:
            pass.nextquest.type === 5 ? <p>Play on {pass.nextquest.number} different maps</p>:
            pass.nextquest.type === 6 ? <p>Play {pass.nextquest.number} matchs without being {pass.class}</p>:
            pass.nextquest.type === 7 ? <p>Win {pass.nextquest.number} matchs in a row</p>:
            pass.nextquest.type === 8 ? <p>Reach {pass.nextquest.number} matchs</p>:
            pass.nextquest.type === 9 ? <p>Reach {pass.nextquest.number} victory</p>:
            pass.nextquest.type === 10 ? <p>Play {pass.nextquest.number} matchs being {pass.class}</p>:
            null}
          </aside>
          <p id="questDescription">{pass.nextquest.description}</p>
        </article>] : null }
      </section>
      <section id="passRewards">
        { pass !== null ? rewardsPrint : null}
      </section>
    </section>
    ]
  );
}

export default Accueil;
