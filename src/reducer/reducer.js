const iniatialState = {
    isConnected: false,
};
const reducer =  (state = iniatialState, action) => {
    switch (action.type) {

        case "LOGIN":
            return{
                ...state,
                    userid: action.userid,
                    username: action.username,
                    token: action.token,
                    points: action.points,
                    isConnected: true,
                    verified: action.verified
                
        };

        case "TOURNAMENTS":
            return{
                ...state,
                    tournaments: action.tournaments
        };

        case "TEAM":
            return{
                ...state,
                    team: action.team
        };
        case "LOGOUT":
            return state = iniatialState;

        //  case "UNSUBSCRIBE":
        //     return state = iniatialState
            
        // case "SETDECK":
        //     return{
        //         ...state,
        //         deck: action.deck
        //     };
        // case "INITDECK":
        //     return {
        //         ...state,
        //         deckId: action.deckId,
        //     };
        // case "INLOBBY":
        //     return {
        //         ...state,
        //         inLobby: action.inLobby,
        //     };
        // case "REMOVECARD":
        //     return{
        //         ...state,
        //         deck: action.deck
        //     };

        default:
            return state
    };
};
export default reducer;