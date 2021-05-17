import logo from './img/v2/logo.png';
import { Link, Redirect } from 'react-router-dom';
import './polemos.css';

import { useSelector } from 'react-redux';

import { useState } from 'react';
import axios from 'axios';

import pnjAdvise from './img/v2/addons/111_03.png';
import headerBackground from './img/v2/background.jpg';

function Login({dispatchConnexion}) {
  const [popup, setPopup] = useState(null);
  const isConnected = useSelector((state) => state.isConnected);
  if(isConnected){
    return <Redirect to="/"/>
  }

  const envoyer = (form, dispatchConnexion) => {
    form.preventDefault();
    const fetch = async() => {
      const result = await axios.post("https://apipolemos.playdragonica.eu/auth",{"username":form.target.username.value,"password":form.target.password.value});
      if(result.status == 202){
        setPopup("Please check your username/password")
      }
      else{
        dispatchConnexion(result);
        setPopup(2);
      }
    }
    fetch();
    
  }

  const Popup = () => {
    return (<section id="confirmLeaveTeam" className="centerFixed">
        <ul>
          <li><p>{popup}</p></li>
          <li><button onClick={() => okayPopup()}>Close</button></li>
        </ul>
    </section>)
  }
  const okayPopup = () => {
    setPopup(null);
  }

  return (
    [
    <section id="login" className="sectionPage">
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
        <p>The connection in this website has no link with the Dragonica Europe services.<br></br>Please note that you have to create a new account here to play on Polemos Server.</p>
      </aside>
      {isConnected?
        <p>Already connected !</p>
        :
        <form className="formulaireSample" onSubmit={(values) => {envoyer(values, dispatchConnexion)}}>
          <h2>Login</h2>
          <ul>
            <li><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
              </svg>
              <input type="text" name="username" id="username" placeholder="Username"/></li>
            <li><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-key" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"/>
              <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
              </svg>
              <input type="password" name="password" id="password" placeholder="Password"/></li>
            <li><input type="submit" value="Log In"/></li>
            <li>
              <Link to="/Register">Create a Polemos account</Link>
              <Link to="/Contact">Can't connect ?</Link>
            </li>
          </ul>
        </form>
      }
    </section>,
    (popup !== null && popup !== 2) ? <Popup></Popup>: null,
    popup === 2 ? <Redirect to='/'></Redirect>: null,
    <img className="backgroundPage" src={headerBackground} alt="Background Image"></img>
    ]
  );
}

export default Login;
