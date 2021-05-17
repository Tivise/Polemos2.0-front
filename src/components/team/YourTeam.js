import { Link } from 'react-router-dom';
import { useState } from 'react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import '../../polemos.css';

function YourTeam({dispatchTeam}) {

  const teamInfo = useSelector((state) => state.team);
  const [popup, setPopup] = useState(false);
  const[ teamDecision, setTeamDecision] = useState(null);

  const updateSelectTeam = (team) => {
    dispatchTeam(null);
    dispatchTeam(team);
  }
  const userid = useSelector((state) => state.userid);
  const [teams, setTeams] = useState(null);

  const leaveTeam = (team) => {
    setPopup(true);
    setTeamDecision(team);
  }

  const confirmLeave = () => {
    const fetch = async () => {
      await axios.post("https://apipolemos.playdragonica.eu/team/leave/",
      {"userid": userid,
      "teamid": teamDecision.teamid,
      "teamname": teamDecision.teamname,
      "owner": teamDecision.ownerid
      });
    }
    fetch();
    setPopup(false);
    setTeamDecision(null);
    dispatchTeam(null);
  }

  const denyLeave = () => {
    setPopup(false);
    setTeamDecision(null);
  }


  useEffect(() => {
    if (!teams){
      const fetch = async () => {
        const result = await axios.get("https://apipolemos.playdragonica.eu/team/" + userid);
        setTeams(result.data);
      }
      fetch();
    }
    const interval = setInterval(() => {
      const fetch = async () => {
        const result = await axios.get("https://apipolemos.playdragonica.eu/team/" + userid);
        setTeams(result.data);
      }
      fetch();
    }, 3000);
    return () => clearInterval(interval);
  });

  const Popup = () => {
    return (<section id="confirmLeaveTeam" className="centerFixed">
        <ul>
          <li><p>Are you sure you want to leave your team?</p></li>
          <li><button onClick={() => confirmLeave()}>Yes</button> <button onClick={() => denyLeave()}>No</button></li>
        </ul>
    </section>)
  }

  const result =  teams && teams.map((teamelt) => {
    return(
    <tr key={teamelt.teamid} className={teamInfo && teamInfo.teamid === teamelt.teamid ? "selectedTeam" : ""}>
      <td className="teamname">{teamelt.teamname}</td>
      <td><button onClick={() => updateSelectTeam(teamelt)} className="viewButton">{teamInfo && teamInfo.teamid === teamelt.teamid ? "Refresh":"View"}</button></td>
      <td><button className="redButton" onClick={() => leaveTeam(teamelt)}>Leave</button></td>
    </tr>
    )
  });

  return ([
    <Link className="buttonInsider" to="/Teams">/ View all teams</Link>,
        <table id="tableRank" cellspacing="0">
          <tr><th>Team Name</th><th></th><th></th></tr>
          {result}
        </table>,
        popup ? <Popup></Popup> : null
          ]
  );
}

export default YourTeam;
