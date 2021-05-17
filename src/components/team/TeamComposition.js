    import React, { useEffect } from 'react';
    import '../../polemos.css';
    import PrintNew from './PrintNew';
    import PrintActual from './PrintActual';
    import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

    function TeamComposition(props) {
      const teamInfo = useSelector((state) => state.team);
      if(!(props.teamProps || teamInfo)){
        return (<Redirect to='/'></Redirect>)
      }
      const teamProps = props.teamProps;
      if(teamInfo){
        const teamComposition = [teamInfo.ownerid === null ? 99999999 : teamInfo.player1, teamInfo.player2 === null ? 99999999 : teamInfo.player2, teamInfo.player3 === null ? 99999999 : teamInfo.player3, teamInfo.player4 === null ? 99999999 : teamInfo.player4, teamInfo.player5 === null ? 99999999 : teamInfo.player5];
        const nbrParticipants = teamComposition.filter(id => id !== 99999999).length;
        return ([
          <table id="tableRank" cellspacing="0">
            <tr><th>Country</th><th>Class</th><th>Playername</th><th>Polemos Point</th></tr>
            <PrintActual teamProps={teamInfo}></PrintActual>
          </table>,
          nbrParticipants !== 5? <PrintNew teamProps={teamInfo}></PrintNew>:null,
    nbrParticipants < 5 ? <p id="numberPlaceStatus">You are {nbrParticipants}, you can invite {5-nbrParticipants} more player{nbrParticipants !== 4 ? "s":""}<br></br>
    <b>Warning:</b> Actually, you can only join {nbrParticipants}vs{nbrParticipants} tournaments with this team</p> : <p>Your team is full, good job !</p>
          
            ]
    );
      }
      else{
        const teamComposition = [teamProps.ownerid === null ? 99999999 : teamProps.player1, teamProps.player2 === null ? 99999999 : teamProps.player2, teamProps.player3 === null ? 99999999 : teamProps.player3, teamProps.player4 === null ? 99999999 : teamProps.player4, teamProps.player5 === null ? 99999999 : teamProps.player5];
        const nbrParticipants = teamComposition.filter(id => id !== 99999999).length
        return ([
          <table id="tableRank" cellspacing="0">
            <tr><th>Country</th><th>Class</th><th>Playername</th><th>Polemos Point</th><th></th></tr>
            <PrintActual teamProps={teamProps}></PrintActual>
          </table>,
          nbrParticipants !== 5? <PrintNew teamProps={teamProps}></PrintNew>:null,
    nbrParticipants < 5 ? <p id="numberPlaceStatus">You are {nbrParticipants}, you can invite {5-nbrParticipants} more player{nbrParticipants !== 4 ? "s":""}<br></br>
    <b>Warning:</b> Actually, you can only join {nbrParticipants}vs{nbrParticipants} tournaments with this team</p> : <p>Your team is full, good job !</p>
          
            ]
    );
      }
    }
    
    export default TeamComposition;
    