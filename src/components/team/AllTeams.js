import { Link } from 'react-router-dom';
import { useState } from 'react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import '../../polemos.css';

function AllTeams({dispatchAllTeams}) {

  const teamInfo = useSelector((state) => state.team);

  const updateSelectTeam = (team) => {
    dispatchAllTeams(null);
    dispatchAllTeams(team);
  }
  const userid = useSelector((state) => state.userid);
  const [teams, setTeams] = useState(null);

  useEffect(() => {
    if (!teams){
      const fetch = async () => {
        const result = await axios.get("https://apipolemos.playdragonica.eu/teams/");
        setTeams(result.data);
      }
      fetch();
    }
    const interval = setInterval(() => {
      const fetch = async () => {
        const result = await axios.get("https://apipolemos.playdragonica.eu/teams/");
        setTeams(result.data);
      }
      fetch();
    }, 3000);
    return () => clearInterval(interval);
  });


  const result =  teams && teams.map((teamelt) => {
    return(
    <tr key={teamelt.teamid} className={teamInfo && teamInfo.teamid === teamelt.teamid ? "selectedTeam" : ""}>
      <td className="teamname">{teamelt.teamname}</td>
      <td><button onClick={() => updateSelectTeam(teamelt)} className="viewButton">{teamInfo && teamInfo.teamid === teamelt.teamid ? "Refresh":"View"}</button></td>
    </tr>
    )
  });

  return ([
        <Link className="buttonInsider" to="/Team">/ Manage your teams</Link>,
        <table id="tableRank" cellspacing="0">
          <tr><th>Team Name</th><th></th><th></th></tr>
          {result}
        </table>
  ]);
}

export default AllTeams;
