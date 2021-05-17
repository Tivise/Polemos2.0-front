import {connect} from "react-redux";
import Tournaments from "../Tournaments";
import {tournaments} from '../actions/Actions';

const mapDispatchToProps = (dispatch) => ({
    dispatchTournaments: (values) => {
        dispatch(tournaments(values.data))
    }
});



export default connect(null, mapDispatchToProps)(Tournaments);