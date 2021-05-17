import {connect} from "react-redux";
import HomepageComponent from "../components/HomepageComponent";
import {fetchGetMatchs} from "../../service/ServiceWeb";
import {inLobby} from "../../actions/Actions";

const mapStateToProps = (state , _ownProps) => ({
   token: state.token,
   username: state.name,
   deck: state.deck,
    inLobby: state.inLobby
});
const mapDispatchToProps = (dispatch) => ({
    getMatchs: (token) => {
       return fetchGetMatchs(token);
    },
    dispatchInLobby: (lobby) => {
        dispatch(inLobby(lobby))
    }



});





export default connect(mapStateToProps,mapDispatchToProps)(HomepageComponent);