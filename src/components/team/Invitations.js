import { Link } from 'react-router-dom';
import { useState } from 'react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import '../../polemos.css';

function Invitations() {
  const userid = useSelector((state) => state.userid);
  const username = useSelector((state) => state.username);
  const [invitations, setInvitations] = useState(null);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    if (!invitations){
      const fetch = async () => {
        const result = await axios.get("https://apipolemos.playdragonica.eu/invitation/" + userid);
        setInvitations(result.data);
      }
      fetch();
    }
    const interval = setInterval(() => {
      const fetch = async () => {
        const result = await axios.get("https://apipolemos.playdragonica.eu/invitation/" + userid);
        setInvitations(result.data);
      }
      fetch();
    }, 2000);
    return () => clearInterval(interval);
  });

  const acceptInvitation = (invitation) => {
    const fetch = async () => {
      await axios.post("https://apipolemos.playdragonica.eu/invitation/accept/",
      {"userid": userid,
      "username": username,
      "invitationid": invitation.invitationid,
      "owner": invitation.ownerid
      });
    }
    fetch();
    setPopup("Invitation acceptée");
  }
  const declineInvitation = (invitation) => {
    const fetch = async () => {
      await axios.post("https://apipolemos.playdragonica.eu/invitation/refuse/",
      {"userid": userid,
      "username": username,
      "invitationid": invitation.invitationid,
      "owner": invitation.ownerid
      });
    }
    fetch();
    setPopup("Invitation refusée");
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

  const result =  invitations && invitations.map((invitation) => {
    return(
    <tr key={invitation.invitationid}>
      <td className="teamname">{invitation.teamname}</td>
      <td className="teamname">{invitation.owner}</td>
      <td><button className="greenButton" onClick={() => acceptInvitation(invitation)}>Join</button></td>
      <td><button className="redButton" onClick={() => declineInvitation(invitation)}>Decline</button></td>
    </tr>
    )
    
  });

  return ([
        <table id="tableRank" cellspacing="0">
          <tr><th>Team name</th><th>Sender</th><th></th><th></th></tr>
          {result}
        </table>,
        popup ? <Popup></Popup> : null
          ]
  );
}

export default Invitations;
