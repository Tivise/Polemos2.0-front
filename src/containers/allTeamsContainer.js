import {connect} from "react-redux";
import {allteampatch} from '../actions/Actions';
import AllTeams from "../components/team/AllTeams";

const mapDispatchToProps = (dispatch) => ({
    dispatchAllTeams: (values) => {
        dispatch(allteampatch(values))
    }
});



export default connect(null, mapDispatchToProps)(AllTeams);