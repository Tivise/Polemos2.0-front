import './polemos.css';
import footerText from './img/v2/copyright.png';
import footerLogo from './img/v2/logo-footer.png';
import {
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";
const Footer = () => {
  const location = useLocation();
  return (
    <footer style={location.pathname === "/Ranked" || location.pathname === "/Match" ? {display: "none"} : null}>
      <img id="logo" src={footerLogo} alt="Dragonica Polemos"></img>
      <img id="credit" src={footerText} alt="Developed by Thomas Pazder"></img>
    </footer>
  );
}

export default Footer;
