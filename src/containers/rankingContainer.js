import {connect} from "react-redux";
import {teampatch} from '../actions/Actions';
import Ranking from "../Ranking";

const mapDispatchToProps = (dispatch) => ({
    dispatchTeam: (values) => {
        dispatch(teampatch(values))
    }
});



export default connect(null, mapDispatchToProps)(Ranking);