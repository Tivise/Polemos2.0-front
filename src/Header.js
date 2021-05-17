import './polemos.css';
import { Link, Redirect } from 'react-router-dom';
import iconHeader from './img/v2/logo-header.png';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";
function Header() {

  const isConnected = useSelector((state) => state.isConnected);
  const userid = useSelector((state) => state.userid);
  const username = useSelector((state) => state.username);
  const points = useSelector((state) => state.points);
  const location = useLocation();
  return (
    <header style={location.pathname === "/Ranked" || location.pathname === "/Match" ? {display: "none"} : null}>
      <article id="header-mobile">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-menu-app-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M0 1.5A1.5 1.5 0 0 1 1.5 0h2A1.5 1.5 0 0 1 5 1.5v2A1.5 1.5 0 0 1 3.5 5h-2A1.5 1.5 0 0 1 0 3.5v-2zM14 7H2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zM2 6a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H2z"/>
            <path fill-rule="evenodd" d="M15 11H1v-1h14v1zM2 12.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/>
          </svg>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Teams">Teams</Link></li>
            <li><Link to="/Tournaments">Tournaments</Link></li>
            <li><Link to="/Ranking">Ranking</Link></li>
          </ul>
      </article>
      
      <ul id="header-main">
        <li><Link to ="/"><img className="smallIcon" src={iconHeader} alt="favicon"></img></Link></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Information">What's Polemos ?</Link></li>
        {isConnected && !isConnected ?
        [
        <li><Link to="/Teams">Teams</Link></li>,
        <li><Link to="/Tournaments">Tournaments</Link></li>,
        ]
        : null
      }
        <li><Link to="/Ranking">Ranking</Link></li>
        <li><Link to="/Boutique">Shop</Link></li>
        
      </ul>
      {isConnected?
        <section>
            <Link to={{
              pathname: '/Profile',
              profileProps: {
                userid: userid
              }
            }}>{username} - {points}PP</Link>
            <Link id="logout-button" to={{
              pathname: '/Logout',
              profileProps: {
                userid: userid
              }
            }}>Logout</Link>
        </section>
        :
        <section>
        {/* <article>
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-globe2" fill="currentColor" xmlns="https://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539a8.372 8.372 0 0 1-1.198-.49 7.01 7.01 0 0 1 2.276-1.52 6.7 6.7 0 0 0-.597.932 8.854 8.854 0 0 0-.48 1.079zM3.509 7.5H1.017A6.964 6.964 0 0 1 2.38 3.825c.47.258.995.482 1.565.667A13.4 13.4 0 0 0 3.508 7.5zm1.4-2.741c.808.187 1.681.301 2.591.332V7.5H4.51c.035-.987.176-1.914.399-2.741zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5H7.5v2.409c-.91.03-1.783.145-2.591.332a12.343 12.343 0 0 1-.4-2.741zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696A12.63 12.63 0 0 1 7.5 11.91v3.014c-.67-.204-1.335-.82-1.887-1.855a7.776 7.776 0 0 1-.395-.872zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964a9.083 9.083 0 0 0-1.565.667A6.963 6.963 0 0 1 1.018 8.5h2.49a13.36 13.36 0 0 0 .437 3.008zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909c.81.03 1.577.13 2.282.287-.12.312-.252.604-.395.872-.552 1.035-1.218 1.65-1.887 1.855V11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5h-2.49a13.361 13.361 0 0 0-.437-3.008 9.123 9.123 0 0 0 1.565-.667A6.963 6.963 0 0 1 14.982 7.5zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343c-.705.157-1.473.257-2.282.287V1.077c.67.204 1.335.82 1.887 1.855.143.268.276.56.395.872z"/>
          </svg>
          <ul>
            <li>English</li>
          </ul>
        </article> */}

        <Link id="login-button" to="/Login"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-badge-fill" fill="currentColor" xmlns="https://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.245z"/>
          </svg>Login</Link>
        <Link id="register-button" to="/Register"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-vector-pen" fill="currentColor" xmlns="https://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828L10.646.646zm-1.8 2.908l-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z"/>
              <path fill-rule="evenodd" d="M2.832 13.228L8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086.086-.026z"/>
            </svg>Register</Link>
        </section>
    }
    </header>
  );
}

export default Header;
