import React, { useEffect } from 'react';
import '../../polemos.css';
import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function PrintNew(props) {
  const teamSelector = useSelector((state) => state.team);
  const userid = useSelector((state) => state.userid);
  const username = useSelector((state) => state.username);
  const [invitationTeam, setInvitationTeam] = useState(null);
  const [popup, setPopup] = useState(false);
  const [oldTeamProps, setOldProps] = useState(null);
  const teamProps = teamSelector ? teamSelector : props.teamProps

  if(oldTeamProps === null){
    const fetch = async () => {

      const result = await axios.get("https://apipolemos.playdragonica.eu/team/invitations/"+teamProps.teamid);
      setInvitationTeam(result.data);
    }
    fetch();
    setOldProps(teamProps);
  }
  useEffect( () => {
    if(oldTeamProps){
      if((teamProps.teamid !== oldTeamProps.teamid) || (teamProps.player2 !== oldTeamProps.player2) || (teamProps.player3 !== oldTeamProps.player3) || (teamProps.player4 !== oldTeamProps.player4) || (teamProps.player5 !== oldTeamProps.player5)){
        const fetch = async () => {

          const result = await axios.get("https://apipolemos.playdragonica.eu/team/invitations/"+teamProps.teamid);
          setInvitationTeam(result.data);
        }
        fetch();
        setOldProps(teamProps);
      }
    }
  });

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

  const envoyer = form => {
    form.preventDefault();
    for(let i=0; i < invitationTeam.length; i++){
      if (form.target.username.value === invitationTeam[i].username){
        setPopup(form.target.username.value + " has already an invitation...");
        return;
      }
    }
    if(username === form.target.username.value){
      setPopup("Stupid hobbit, why do you want to invite yourself ?!!");
    }
    else{
      const fetch = async () => {
        const result = await axios.post("https://apipolemos.playdragonica.eu/team/invite/",
        {"ownerid": userid,
        "username": form.target.username.value,
        "teamid": teamProps.teamid,
        "teamname": teamProps.teamname,
        "order" : form.target.order.value
        });
        if (result.status === 201){
          const fetch = async () => {
            const result = await axios.get("https://apipolemos.playdragonica.eu/team/invitations/"+teamProps.teamid);
            setInvitationTeam(result.data);
          }
          fetch();
        }
        else if(result.status === 204){
          setPopup("Can't found this player...");
        }
        else if(result.status === 203){
          setPopup("Already in your team, refresh page?");
        }
      }
      fetch();
    }
  }
  const cancel = form => {
    form.preventDefault();
    const invitationidp = parseInt(form.target.invitationid.value.substring(1));
    const fetch = async () => {
      await axios.get("https://apipolemos.playdragonica.eu/team/cancel/"+ invitationidp);
      setOldProps(null);
    }
    fetch();
  }

 const PrintUsers = () => {
    const resultat = [];
    const orders = [];
    invitationTeam.map((invitation) => {
      orders.push(invitation.order);
    })
    if(teamProps.ownerid === userid){
      for(let i=(2+0); i<((1+5)); i++){
        if (i === 1 && !teamProps.player1 || i === 2 && !teamProps.player2 || i === 3 && !teamProps.player3 || i === 4 && !teamProps.player4 || i === 5 && !teamProps.player5){
          const isEqual = (element) => element === i;
          if(orders.includes(i)){
            const invitation = invitationTeam[orders.findIndex(isEqual)];
            resultat.push(
              <form className="formInviteTeam inviteInProgress" onSubmit={cancel}><input name="invitationid" id="invitationid" disabled="disabled" value={'#'+invitation.invitationid}></input><input name="order" id="order" disabled="disabled" value={invitation.order}/><input type="text" name="username" className="pseudos" id="username" disabled="disabled" value={invitation.username}/><input type="submit" className="cancelButton" value="Cancel"/></form>
            )
          }
          else{
            resultat.push(
              <form className="formInviteTeam" onSubmit={envoyer}><input name="order" id="order" disabled="disabled" value={i}/><input type="text" name="username" id="username" className="pseudos" placeholder="Enter Username"/><input type="submit" className="inviteButton" value="Invite"/></form>
            ) 
          }
        }
      }
      return resultat;
    }
    return null
 }

 if(invitationTeam ){
 return ([<PrintUsers></PrintUsers>, popup ? <Popup></Popup> : null]); 
 }
 else{
    return (<p id="numberPlaceStatus">Chargement en cours</p>);
 }
}

export default PrintNew;
