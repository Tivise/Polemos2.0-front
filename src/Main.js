import './polemos.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Accueil from './Accueil';
import Register from './Register';
import Tournament from './Tournament';
import Ranking from './Ranking';
import Team from './Team';
import Profile from './Profile';
import Teams from './Teams';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Panel from './components/Panel';
import Ranked from './Ranked';
import RankedMatch from './RankedMatch';
import Boutique from './Boutique';
import PaiementVIP from './Paiement';
import Paiement from './Paiement';
import Information from './Information';

import LoginContainer from './containers/loginContainer';
import TournamentsContainer from './containers/tournamentsContainer';
import LogoutContainer from './containers/logoutContainer';


function Main() {
  const token = useSelector((state) => state.token);
  axios.defaults.headers.common = {
    'Authorization': 'Bearer ' + token
  };
  return (
    <Router>
      <Header />
      <Route exact path="/">
        <Accueil />
      </Route>
      <Route path="/Login">
        <LoginContainer />
      </Route>
      <Route path="/Logout">
        <LogoutContainer />
      </Route>
      <Route path="/Register">
        <Register />
      </Route>
      <Route path="/Information">
        <Information />
      </Route>
      <Route path="/Profile">
        <Profile />
      </Route>
      <Route path="/Tournaments">
        <TournamentsContainer />
      </Route>
      <Route path="/Team">
        <Team />
      </Route>
      <Route path="/Teams" component={Teams} />
      <Route path="/Tournament" component={Tournament} />
      <Route path="/Ranking">
        <Ranking />
      </Route>
      <Route path="/Ranked">
        <Ranked />
      </Route>
      <Route path="/Boutique">
        <Boutique />
      </Route>
      <Route path="/Paiement">
        <Paiement />
      </Route>
      <Route path="/PaiementVIP">
        <PaiementVIP />
      </Route>
      <Route path="/Match">
        <RankedMatch />
      </Route>

      <Footer />
      <Panel />
    </Router>
    );

}
//              <Association propsFac={resultIdFac => setFacInfo(resultIdFac)} />


export default Main;
