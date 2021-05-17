import {connect} from "react-redux";
import {teampatch} from '../actions/Actions';
import YourTeam from "../components/team/YourTeam";

const mapDispatchToProps = (dispatch) => ({
    dispatchTeam: (values) => {
        dispatch(teampatch(values))
    }
});



export default connect(null, mapDispatchToProps)(YourTeam);