import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import woodiehehe from './../img/v2/addons/ranked/hehe.png';
import woodiehaha from './../img/v2/addons/ranked/haha.png';
import machineboutique from './../img/v2/addons/127_01.png';
import {
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";

import './../polemos.css';
import UIfx from 'uifx';
import tickAudio from './../sound/notif.wav';

const tick = new UIfx(
  tickAudio,
  {
    volume: 0.1,
    throttleMs: 50
  }
)

const Panel = () => {
  const userid = useSelector((state) => state.userid);
  const [ notificationPopup, setNotificationPopup] = useState(null);
  const [ notification, setNotification] = useState(true);
  const [notificationlist, setnotificationlist] = useState(null);
  const verified = useSelector((state) => state.verified);
  const location = useLocation();
  const [compteurRanked, setCompteurRanked] = useState(null);
  useEffect(() => {
    // if (!user){
    //   const fetch = async () => {
    //     const result = await axios.get("https://apipolemos.playdragonica.eu/notifications/" + userid);
    if (!notificationlist && userid){
      const fetch = async () => {
        const result = await axios.get("https://apipolemos.playdragonica.eu/notification/" + userid);
        setnotificationlist(result.data);
      }
      fetch();
    }
    const interval = setInterval(() => {
      if(userid){
        const fetch = async () => {
          const result = await axios.get("https://apipolemos.playdragonica.eu/notification/" + userid);
          setnotificationlist(result.data);
        }
        fetch();
      }
      const fetch = async () => {
        const result = await axios.get("https://apipolemos.playdragonica.eu/compteurRanked/");
        setCompteurRanked(result.data);
      }
      fetch();
    }, 2000);
    return () => clearInterval(interval);
  });

  const openNotification = () => {
    notificationPopup?
      setNotificationPopup(false)
      :
      setNotificationPopup(true)
  }
  const toggleNotification = () => {
    notification?
      setNotification(false)
      :
      setNotification(true)
  }
  const removeNotif = (notificationid) => {
    const fetch = async () => {
      axios.get("https://apipolemos.playdragonica.eu/notification/remove/"+ notificationid);
    }
    fetch();
  }
  if (userid && !verified){
    return ( <Redirect to="/Profile"></Redirect>);
  }
  const result =  notificationlist && notificationlist.map((notif) => {
    return(
      <article>
        <i>{notif.notificationdate} - {notif.notificationhour}</i>
        <aside>
          <p>{notif.notificationmessage}</p>
          <svg onClick={() => removeNotif(notif.notificationid)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle removeNotif" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
          </svg>
        </aside>
    </article>
    )
  });


  return ([
    userid?
    <ul id="panel" style={(location.pathname === "/Match") ? {display: "None"}: null}>
    <li>
      <svg className={notificationlist && notificationlist.length != 0 ?  "dringdring": null} onClick={openNotification} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
      </svg><b className="numberNotif">{notificationlist && notificationlist.length != 0 ? notificationlist.length : null}</b>
      <aside className={notificationPopup? "popupNotification": notificationPopup === null ? null: "popupNotificationHidden"}>
        <ul>
          <li onClick={openNotification}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-down-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M6.364 2.5a.5.5 0 0 1 .5-.5H13.5A1.5 1.5 0 0 1 15 3.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 2 13.5V6.864a.5.5 0 1 1 1 0V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H6.864a.5.5 0 0 1-.5-.5z"/>
              <path fill-rule="evenodd" d="M11 10.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h3.793L1.146 1.854a.5.5 0 1 1 .708-.708L10 9.293V5.5a.5.5 0 0 1 1 0v5z"/>
            </svg>
          </li>
        </ul>
        <section id="notifList">
          {notificationlist ? (notificationlist.length === 0 ? <p>You don't have any notification</p> : result) : null}
        </section>
      </aside>
      <p className="popupExplanation">Notifications</p>
    </li>
    <li>
      <Link to="/Team">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
          <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
        </svg>
      </Link>
      <p className="popupExplanation">Manage your team(s)</p>
    </li>
    <li onClick={openNotification} onClick={toggleNotification}>
      {notification ?
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggle-on" viewBox="0 0 16 16">
          <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
        </svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggle-off" viewBox="0 0 16 16">
          <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"/>
        </svg>
      }
      <p className="popupExplanation">{notification ? "Disable notification" : "Active notification"}</p>
    </li>
  </ul>: null
    ,
    location.pathname === "/Match" ? null:
    <section id="panelRanked" style={userid ? null: {width:"100%"}}>
      <p id="compteurRanked">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
          <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
        </svg>
        {compteurRanked ?
          (compteurRanked[2] && compteurRanked[2] === 1 ?
            (compteurRanked[0] + "playing - " + compteurRanked[1] + " waiting")
            :
            "Ranked Mode offline")
          :
          null}
      </p>
      <img src={location.pathname === "/Ranked" ? woodiehaha : woodiehehe} alt="woodie"></img>
      {userid ? (location.pathname === "/Ranked" ? <Link to="/">back to Home</Link> : compteurRanked && compteurRanked[2] && compteurRanked[2] === 1 ? <Link id="allezViens" to="/Ranked" onClick={() => tick.play()}>Play Ranked</Link> : null) : <Link id="allezViens" to="/Login">Login</Link>}
      {userid ? <Link id="boutiqueButton" to="/Boutique"><img id="shoplogobutton" src={machineboutique} alt="shop"></img></Link>: null}
    </section>
          ]
  );
}

export default Panel;
