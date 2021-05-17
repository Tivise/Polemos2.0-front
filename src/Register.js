
import logo from './img/v2/logo.png';
import pnjAdvise from './img/v2/addons/111_03.png';
import headerBackground from './img/v2/background.jpg';

import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import './polemos.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

import destruLogo from './img/class/destructeur.jpg';
import sentiLogo from './img/class/sentinelle.jpg';
import dragonLogo from './img/class/dragoon.jpg';
import commandoLogo from './img/class/commando.jpg';
import arcaLogo from './img/class/arcaniste.jpg';
import oracleLogo from './img/class/oracle.jpg';
import ombreLogo from './img/class/ombre.jpg';
import voltiLogo from './img/class/voltigeur.jpg';
import franceLogo from './img/flags/fr.png';
import belgiqueLogo from './img/flags/be.png';
import suisseLogo from './img/flags/suisse.png';
import usaLogo from './img/flags/us.png';
import ukLogo from './img/flags/uk.png';
import allemagneLogo from './img/flags/de.png';
import canadaLogo from './img/flags/ca.png';
import vietLogo from './img/flags/viet.png';
import polskaLogo from'./img/flags/pl.png';
import spainLogo from './img/flags/sp.png';
import russiaLogo from './img/flags/ru.png';

const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const reusername = /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/;

function Register() {

  const [userNameField, setUserField] = useState(null);
  const [mailField, setMailField] = useState(null);
  const [passField, setPassField] = useState(null);
  const [passConfirmField, setPassConfirmField] = useState(null);
  const [goLogin, setGoLogin] = useState(false);
  const [country, setCountry] = useState("FR");
  const [classname, setClass] = useState("Sentinelle");

  const isConnected = useSelector((state) => state.isConnected);
  if(isConnected){
    return <Redirect to="/"/>
  }
  if(goLogin){
    return <Redirect to="/Login"/>
  }

  const envoyer = (form) => {
    form.preventDefault();
    if(re.test(form.target.mail.value) && form.target.password.value.length > 6 &&  reusername.test(form.target.username.value) && form.target.username.value.length < 20){
      const fetch = async () => {
        const result = await axios.post("https://apipolemos.playdragonica.eu/users",
        {"username": form.target.username.value,
        "password": form.target.password.value,
        "classname": form.target.classes.value,
        "point": 0, 
        "mail": form.target.mail.value, 
        "country": form.target.country.value
        });
        console.log(result)
        if (result.status == 201){
          setGoLogin(true);
        }
        // Ajouter ici un événement quand le compte est crée, et si status mauvais, afficher une erreur.
      }
      fetch();
    }
  }

  const changeInformationUser = (form) => {
    setUserField(form.target.value)
  }
  const changeInformationMail = (form) => {
    setMailField(form.target.value)
  }
  const changeInformationPass = (form) => {
    setPassField(form.target.value)
  }
  const changeInformationPassConfirm = (form) => {
    setPassConfirmField(form.target.value)
  }

  const changeClass = (form) => {
    setClass(form.target.value)
  }

  const changeCountry = (form) => {
    setCountry(form.target.value)
  }

  return ([
    <section id="register" className="sectionPage">
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
        <p>The connection in this website has no link with the Dragonica Europe services.<br></br>Please note that you have to create a new account here, even if you already have a Dragonica Europe account.</p>
      </aside>
      <form className="formulaireSample" onSubmit={envoyer}>
        <ul>
          <li>
            <input onChange={changeInformationUser} type="text" name="username" id="username" placeholder="Enter your Username"/>
            {userNameField && reusername.test(userNameField) && userNameField.length < 20?
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2-circle ready" fill="currentColor" xmlns="https://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              <path fill-rule="evenodd" d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z"/>
            </svg>
            :
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle wrong" fill="currentColor" xmlns="https://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            }
          </li>
          <li>
            <input onChange={changeInformationMail} type="text" name="mail" id="mail" placeholder="Enter Email"/>
            {mailField && (re.test(mailField)) ?
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2-circle ready" fill="currentColor" xmlns="https://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              <path fill-rule="evenodd" d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z"/>
            </svg>
            :
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle wrong" fill="currentColor" xmlns="https://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            }
          </li>
          <li><input onChange={changeInformationPass} type="password" name="password" id="password" placeholder="Password"/>
          {passField && passField.length > 6 ?
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2-circle ready" fill="currentColor" xmlns="https://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              <path fill-rule="evenodd" d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z"/>
            </svg>
            :
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle wrong" fill="currentColor" xmlns="https://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            }</li>
          <li><input onChange={changeInformationPassConfirm} type="password" name="cpassword" id="cpassword" placeholder="Password confirmation"/>
          {passConfirmField && passField && passField === passConfirmField?
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2-circle ready" fill="currentColor" xmlns="https://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              <path fill-rule="evenodd" d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z"/>
            </svg>
            :
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle wrong" fill="currentColor" xmlns="https://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            }</li>
          <li><label for="classes">Favorite Class</label>         
          <select id="classes" name="classes" onChange={changeClass}>
          <option value="Sentinelle">Sentinel</option>
          <option value="Commando">Destroyer</option>
          <option value="Destructeur">Overlord</option>
          <option value="Dragon">Dragoon</option>
          <option value="Voltigeur">Savage</option>
          <option value="Ombre">Shadow</option>
          <option value="Arcaniste">Sorcerer</option>
          <option value="Oracle">Invoker</option>
        </select><img className="classes" src=
        {classname === 'Sentinelle' ? sentiLogo:
        classname === 'Ombre' ? ombreLogo:
        classname === 'Commando' ? commandoLogo:
        classname === 'Voltigeur' ? voltiLogo:
        classname === 'Oracle' ? oracleLogo:
        classname === 'Arcaniste' ? arcaLogo:
        classname === 'Destructeur' ? destruLogo:
        dragonLogo} alt="class"></img></li>
          <li><label for="country">Country</label>         
          <select id="country" name="country" onChange={changeCountry}>
          <option value="FR">France</option>
          <option value="BE">Belgium</option>
          <option value="CA">Canada</option>
          <option value="DE">Germany</option>
          <option value="RU">Russian Federation</option>
          <option value="SP">Spain</option>
          <option value="CH">Switzerland</option>
          <option value="US">United States</option>
          <option value="VIET">Vietnam</option>
        </select>
        <img className="flag" src={
        country === 'FR' ? franceLogo:
        country === 'PL' ? polskaLogo:
        country === 'BE' ? belgiqueLogo:
        country === 'CA' ? canadaLogo:
        country === 'SP' ? spainLogo:
        country === 'VIET' ? vietLogo:
        country === 'US' ? usaLogo:
        country === 'DE' ? allemagneLogo:
        country === 'UK' ? ukLogo:
        country === 'RU' ? russiaLogo:
        suisseLogo} alt="flag"></img>
        </li>
        <li><input type="submit" value="Register"/></li>
        </ul>
        <Link to="/Login">Already have an account ? Login</Link>
      </form>
    </section>,
    <img className="backgroundPage" src={headerBackground} alt="Background Image"></img>
  ]
  );
}

export default Register;
