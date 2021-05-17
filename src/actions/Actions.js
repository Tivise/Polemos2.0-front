export const login = (userid,mail,username,token, points, verified) => ({
    type: "LOGIN",
    userid: userid,
    mail: mail,
    username: username,
    token: token,
    points: points,
    verified: verified
});

export const tournaments = (tournaments) => ({
    type: "TOURNAMENTS",
    tournaments: tournaments
});

export const teampatch = (team) => ({
    type: "TEAM",
    team: team
});
export const allteampatch = (team) => ({
    type: "TEAM",
    team: team
});

export const logout = () => ({
    type: "LOGOUT",
});

// export const unsubscribe = () => ({
//     type: "UNSUBSCRIBE",
// });
// export const setDeck  = (deck) => ({
//     type: "SETDECK",
//     deck: deck,
// });

// export const initDeck  = (deckId) => ({
//     type: "INITDECK",
//     deckId: deckId,
// });
// export const removeCard  = (card) => ({
//     type: "REMOVECARD",
// });

// export const inLobby  = (inLobby) => ({
//     type: "INLOBBY",
//     inLobby: inLobby,
// });