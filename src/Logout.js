import { Redirect } from 'react-router-dom';
import './polemos.css';

import { useSelector, useDispatch } from 'react-redux';

function Logout({dispatchDeconnexion}) {

  const isConnected = useSelector((state) => state.isConnected);
  if(isConnected){
    dispatchDeconnexion();
    return <Redirect to="/"/>
  }
  else{
    return <Redirect to="/"/>
  }
}

export default Logout;
